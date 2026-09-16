const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { MongoClient } = require('mongodb');
const emailService = require('./email-service');

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27018';
const MONGO_DB = process.env.MONGO_DB || 'svgdad';

const app = express();

// Mongo: orders collection (lazy singleton)
let ordersCol = null;
async function getOrdersCol() {
  if (ordersCol) return ordersCol;
  const client = new MongoClient(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
  await client.connect();
  const col = client.db(MONGO_DB).collection('orders');
  await col.createIndex({ id: 1 }, { unique: true }); // dedupe by checkout session id
  ordersCol = col;
  return col;
}
// Connect at boot; log but don't crash the storefront if Mongo hiccups
getOrdersCol().then(() => console.log('Mongo connected:', MONGO_URI, '/', MONGO_DB))
  .catch(err => console.error('Mongo connect failed (will retry on first order):', err.message));

// Stripe webhook needs the RAW body for signature verification — mount before json parser
app.use('/api/stripe-webhook', bodyParser.raw({ type: '*/*' }));

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Initialize Stripe if secret key is present
let stripe = null;
if (process.env.STRIPE_SECRET_KEY) {
  try {
    stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    console.log('Stripe SDK initialized with STRIPE_SECRET_KEY');
  } catch (err) {
    console.warn('stripe package not available:', err.message);
  }
}

// Health check endpoint
app.get('/ping', function (req, res) {
  return res.send('pong');
});

// Create Checkout Session (Stripe or Simulated fallback)
app.post('/api/create-checkout-session', async function (req, res) {
  const { items, totalAmount, successUrl, cancelUrl } = req.body || {};

  if (stripe && items && items.length > 0) {
    try {
      const line_items = items.map(item => {
        const productData = {
          name: item.title || 'Savage Dad Streetwear'
        };
        if (item.description) {
          productData.description = item.description;
        }
        if (item.imgUri && item.imgUri.startsWith('http')) {
          productData.images = [item.imgUri];
        }

        return {
          price_data: {
            currency: 'usd',
            product_data: productData,
            unit_amount: Math.round((item.price || 0) * 100)
          },
          quantity: item.quantity || 1
        };
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: (successUrl || `${req.protocol}://${req.get('host')}/products/cart?status=success`) + '&session_id={CHECKOUT_SESSION_ID}',
        cancel_url: cancelUrl || `${req.protocol}://${req.get('host')}/products/cart?status=cancelled`
      });

      return res.json({ url: session.url, id: session.id });
    } catch (err) {
      console.error('Stripe session creation failed, falling back to simulated:', err.message);
    }
  }

  // Fallback simulated order response
  const orderId = 'SD-' + Math.floor(100000 + Math.random() * 900000);
  return res.json({
    simulated: true,
    orderId,
    total: totalAmount,
    message: 'Order simulated successfully. Configure STRIPE_SECRET_KEY for live Stripe processing.'
  });
});

// Stripe webhook: record completed orders (Mongo-persisted, idempotent)
app.post('/api/stripe-webhook', async function (req, res) {
  if (!stripe) return res.status(400).json({ error: 'stripe not configured' });
  const sig = req.headers['stripe-signature'];
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;
  try {
    event = secret
      ? stripe.webhooks.constructEvent(req.body, sig, secret)
      : JSON.parse(req.body); // dev only: no verification without secret
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const order = {
      id: session.id,
      eventId: event.id,
      amount: session.amount_total,
      currency: session.currency,
      email: session.customer_details && session.customer_details.email,
      shipping: session.shipping_details || null,
      payment_status: session.payment_status,
      created: new Date().toISOString()
    };
    try {
      const col = await getOrdersCol();
      const r = await col.updateOne(
        { id: order.id },
        { $set: order, $setOnInsert: { firstSeen: order.created } },
        { upsert: true }
      );
      console.log('ORDER PERSISTED:', order.id, r.upsertedCount ? '(new)' : '(updated)');
      // Fulfillment emails — fire and forget; never block the webhook response
      if (r.upsertedCount) {
        emailService.sendOrderConfirmation(order)
          .catch(err => console.error('Fulfillment email failed:', err.message));
        emailService.sendOwnerNotification(order)
          .catch(err => console.error('Owner email failed:', err.message));
      }
    } catch (err) {
      console.error('ORDER PERSIST FAILED:', err.message);
      return res.status(500).json({ error: 'order persistence failed', received: true });
    }
  }

  res.json({ received: true });
});

// Orders API — read from Mongo, newest first
app.get('/api/orders', async function (req, res) {
  try {
    const col = await getOrdersCol();
    const orders = await col.find({}).sort({ created: -1 }).limit(200).toArray();
    return res.json({ count: orders.length, orders });
  } catch (err) {
    return res.status(500).json({ error: 'orders unavailable', message: err.message });
  }
});

// SPA wildcard fallback
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, HOST, function () {
  console.log(`Svgdad server running on http://${HOST}:${PORT}`);
});

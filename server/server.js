const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';

const app = express();

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

// Stripe webhook: record completed orders
const orders = [];  // in-memory ledger until Mongo-backed orders land
const seenEvents = new Set();  // idempotency

app.post('/api/stripe-webhook', function (req, res) {
  if (!stripe) return res.status(400).json({ error: 'stripe not configured' });
  const sig = req.headers['stripe-signature'];
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;
  try {
    event = secret
      ? stripe.webhooks.constructEvent(req.body, sig, secret)
      : JSON.parse(req.body);  // dev only: no verification without secret
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (seenEvents.has(event.id)) return res.json({ received: true, duplicate: true });
  seenEvents.add(event.id);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const order = {
      id: session.id,
      amount: session.amount_total,
      currency: session.currency,
      email: session.customer_details && session.customer_details.email,
      items: session.metadata && session.metadata.items,
      payment_status: session.payment_status,
      created: new Date().toISOString()
    };
    orders.push(order);
    console.log('ORDER RECORDED:', JSON.stringify(order));
    // TODO: Mongo persistence + fulfillment email trigger
  }

  res.json({ received: true });
});

app.get('/api/orders', function (req, res) {
  res.json({ count: orders.length, orders });
});

// SPA wildcard fallback
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, HOST, function () {
  console.log(`Svgdad server running on http://${HOST}:${PORT}`);
});
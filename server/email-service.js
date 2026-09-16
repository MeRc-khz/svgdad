/**
 * Email Service for SvgDad storefront
 * Fulfillment + notification emails. Ported from czarui email-service
 * (nodemailer + Gmail SMTP) per the Conglomerate shared email stack.
 */

const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT || '587', 10),
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    /**
     * Send order confirmation to the buyer
     * @param {object} order - persisted order doc from webhook
     */
    async sendOrderConfirmation(order) {
        if (!order.email) {
            console.warn('sendOrderConfirmation skipped: buyer email missing');
            return null;
        }
        const subject = 'Thanks for your order — SvgDad';
        const html = this.getOrderTemplate(order);
        try {
            const info = await this.transporter.sendMail({
                from: `"SvgDad" <${process.env.EMAIL_FROM}>`,
                to: order.email,
                subject,
                html
            });
            console.log('Order confirmation sent:', order.id, info.messageId);
            return info;
        } catch (error) {
            console.error('Order confirmation send error:', error.message);
            throw error;
        }
    }

    /**
     * Notify the shop owner of a new paid order
     */
    async sendOwnerNotification(order) {
        const subject = `💸 New SvgDad order — $${((order.amount || 0) / 100).toFixed(2)}`;
        const html = this.getOwnerTemplate(order);
        try {
            const info = await this.transporter.sendMail({
                from: `"SvgDad Orders" <${process.env.EMAIL_FROM}>`,
                to: process.env.OWNER_EMAIL || process.env.EMAIL_USER,
                subject,
                html
            });
            console.log('Owner notification sent:', order.id, info.messageId);
            return info;
        } catch (error) {
            console.error('Owner notification send error:', error.message);
            throw error;
        }
    }

    getOrderTemplate(order) {
        const amount = ((order.amount || 0) / 100).toFixed(2);
        const ship = order.shipping && order.shipping.address
            ? `${order.shipping.name || ''}<br>${order.shipping.address.line1 || ''}<br>${order.shipping.address.city || ''}, ${order.shipping.address.state || ''} ${order.shipping.address.postal_code || ''}`
            : 'Address pending';
        return `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;border:1px solid #eee;border-radius:8px;overflow:hidden;">
            <div style="background:#1F1B16;color:#FFB683;padding:20px;text-align:center;">
                <h1 style="margin:0;font-size:22px;letter-spacing:2px;">SVGDAD</h1>
                <p style="margin:4px 0 0;font-size:13px;opacity:0.9;">Savage Dad Streetwear</p>
            </div>
            <div style="padding:24px;color:#333;">
                <h2 style="font-size:18px;margin-top:0;">Thank you for your order!</h2>
                <p>Your payment went through. Here are your details:</p>
                <table style="width:100%;border-collapse:collapse;font-size:14px;">
                    <tr><td style="padding:6px 0;color:#777;">Order</td><td style="text-align:right;">${order.id}</td></tr>
                    <tr><td style="padding:6px 0;color:#777;">Total</td><td style="text-align:right;"><strong>$${amount} ${order.currency || 'usd'}</strong></td></tr>
                    <tr><td style="padding:6px 0;color:#777;">Ships to</td><td style="text-align:right;">${ship}</td></tr>
                </table>
                <p style="font-size:13px;color:#777;margin-top:20px;">We'll get your gear moving. Questions? Just reply to this email.</p>
            </div>
            <div style="background:#f8f8f8;padding:14px;text-align:center;font-size:12px;color:#999;">
                SvgDad &middot; svgdad.store
            </div>
        </div>`;
    }

    getOwnerTemplate(order) {
        const amount = ((order.amount || 0) / 100).toFixed(2);
        return `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;">
            <h2 style="color:#1F1B16;">New SvgDad order 💸</h2>
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
                <tr><td style="padding:5px 0;color:#777;">Order</td><td style="text-align:right;">${order.id}</td></tr>
                <tr><td style="padding:5px 0;color:#777;">Total</td><td style="text-align:right;"><strong>$${amount}</strong></td></tr>
                <tr><td style="padding:5px 0;color:#777;">Buyer</td><td style="text-align:right;">${order.email || 'n/a'}</td></tr>
                <tr><td style="padding:5px 0;color:#777;">Time</td><td style="text-align:right;">${order.created}</td></tr>
            </table>
            <p style="font-size:13px;color:#777;">Full ledger: <code>GET /api/orders</code></p>
        </div>`;
    }
}

module.exports = new EmailService();

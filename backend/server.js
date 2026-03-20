require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

const ordersFile = path.join(__dirname, 'orders.json');

// Crear archivo orders.json si no existe
if (!fs.existsSync(ordersFile)) {
  fs.writeFileSync(ordersFile, JSON.stringify([], null, 2));
}

// ==================== CREAR SESIÓN DE PAGO ====================
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { total, description, cart } = req.body;

    if (!total || total <= 0) {
      return res.status(400).json({ error: 'Total inválido' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'mxn',
          product_data: { name: description || 'Pedido de comida' },
          unit_amount: Math.round(total * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:4200/pago-exitoso?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:4200/pago-cancelado',
      metadata: {
        order_data: JSON.stringify({ cart, total, description })
      }
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// ==================== CONFIRMAR PAGO Y GUARDAR PEDIDO ====================
app.get('/confirm-order', async (req, res) => {
  const sessionId = req.query.session_id;

  // ==================== LOGS DE DEPURACIÓN ====================
  console.log('🔄 [CONFIRM-ORDER] Session ID recibido:', sessionId);

  try {
    if (!sessionId) {
      throw new Error('No se recibió session_id');
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log('✅ Sesión recuperada de Stripe | Payment Status:', session.payment_status);

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'El pago no se completó' });
    }

    const orderData = JSON.parse(session.metadata.order_data);
    const folio = uuidv4().slice(0, 8).toUpperCase();

    const newOrder = {
      folio,
      ...orderData,
      fecha: new Date().toLocaleString('es-MX'),
      estado: 'Pagado (Stripe Test)',
      sessionId
    };

    let orders = JSON.parse(fs.readFileSync(ordersFile, 'utf8'));
    orders.push(newOrder);
    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));

    console.log('📁 Pedido guardado correctamente en orders.json → Folio:', folio);

    res.json({ success: true, folio, order: newOrder });
  } catch (error) {
    console.error(' ERROR en confirm-order:', error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Backend corriendo en http://localhost:${PORT}`);
});
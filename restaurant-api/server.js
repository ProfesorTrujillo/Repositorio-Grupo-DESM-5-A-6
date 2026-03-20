require('dotenv').config(); // Carga variables de entorno desde .env
const express = require('express');
const stripe = require('stripe')('process.env.STRIPE_SECRET_KEY'); // Usa el modo Test
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/create-checkout-session', async (req, res) => {
  const { items, envio, total } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'mxn',
          product_data: { name: 'Pedido Restaurante Lomas', description: items.map(i => i.platillo.nombre).join(', ') },
          unit_amount: Math.round(total * 100), // Stripe recibe centavos
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:4200/pago-exitoso?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:4200/pago-cancelado',
    });

    // Punto 3: Guardado temporal del pedido (Simulación de BD)
    const pedido = {
      folio: Math.random().toString(36).substring(7).toUpperCase(),
      items, envio, total,
      fecha: new Date().toLocaleString(),
      estado: "Pagado (Stripe Test)"
    };
    fs.appendFileSync('pedidos.json', JSON.stringify(pedido) + '\n');

    res.json({ url: session.url, folio: pedido.folio });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('API segura en puerto 3000'));
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const Stripe = require('stripe');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post('/api/pago', async (req, res) => {

  try {

    const { items, subtotal, iva, envio, total } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',

      line_items: [
        {
          price_data: {
            currency: 'mxn',
            product_data: {
              name: 'Pedido Restaurante'
            },
            unit_amount: Math.round(total * 100),
          },
          quantity: 1,
        }
      ],

      success_url: 'http://localhost:4200/pago-exitoso',
      cancel_url: 'http://localhost:4200/pago-cancelado',
    });

    const pedido = {
      id: uuidv4(),
      items,
      subtotal,
      iva,
      envio,
      total,
      fecha: new Date(),
      estado: 'Pagado (Stripe Test)'
    };

    fs.writeFileSync(
      `pedido-${pedido.id}.json`,
      JSON.stringify(pedido, null, 2)
    );

    res.json({ url: session.url });

  } catch (err) {
    console.log('ERROR:', err.message);
    res.status(500).json({ error: err.message });
  }

});

app.listen(3000, () => {
  console.log('Servidor en puerto 3000');


});


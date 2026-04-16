import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

const PORT = 4242;

const leerPedidos = () => {
  try {
    const data = fs.readFileSync('./pedidos.json');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const guardarPedidos = (pedidos) => {
  fs.writeFileSync('./pedidos.json', JSON.stringify(pedidos, null, 2));
};

app.post('/crear-checkout-session', async (req, res) => {
  try {
    const { items, total, subtotal, iva, envio } = req.body;

    if (!items || items.length === 0 || total <= 0) {
      return res.status(400).json({ error: 'Datos inválidos' });
    }

    const line_items = items.map(item => ({
      price_data: {
        currency: 'mxn',
        product_data: {
          name: item.platillo.nombre,
        },
        unit_amount: Math.round(item.platillo.precio * 100),
      },
      quantity: item.cantidad,
    }));

    if (envio > 0) {
      line_items.push({
        price_data: {
          currency: 'mxn',
          product_data: {
            name: 'Costo de envío',
          },
          unit_amount: Math.round(envio * 100),
        },
        quantity: 1,
      });
    }

    const folio = uuidv4();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `http://localhost:4200/pago-exitoso?folio=${folio}&total=${total}`,
      cancel_url: `http://localhost:4200/pago-cancelado`,
    });

    const pedidos = leerPedidos();

    pedidos.push({
      folio,
      items,
      subtotal,
      iva,
      envio,
      total,
      fecha: new Date().toISOString(),
      estado: 'Pagado (Stripe Test)',
    });

    guardarPedidos(pedidos);

    res.json({ url: session.url });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear sesión de pago' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
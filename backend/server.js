// ============================================================
//  BACKEND SEGURO — Node.js + Express + Stripe
//  ⚠️  La llave secreta de Stripe NUNCA debe enviarse al frontend.
//      Solo se usa aquí en el servidor.
// ============================================================

require('dotenv').config(); // Carga las variables de .env

const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

// -----------------------------------------------------------
//  Inicializar Stripe con la LLAVE SECRETA (del archivo .env)
//  ⚠️  COLOCA TU LLAVE SECRETA EN EL ARCHIVO .env
//      (variable: STRIPE_SECRET_KEY=sk_test_XXXXXXXXXX)
// -----------------------------------------------------------
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:4200';

// Middleware
app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

// -----------------------------------------------------------
//  POST /crear-sesion
//  Recibe: { items, subtotal, iva, envio, total, descripcion }
//  Devuelve: { url } — URL de Stripe Checkout para redirigir
// -----------------------------------------------------------
app.post('/crear-sesion', async (req, res) => {
    try {
        const { items, subtotal, iva, envio, total, descripcion } = req.body;

        // Validación básica del monto
        if (!total || isNaN(total) || total <= 0) {
            return res.status(400).json({ error: 'Monto inválido.' });
        }

        // Construir line_items para Stripe a partir de los platillos del carrito
        const lineItems = items && items.length > 0
            ? items.map(item => ({
                price_data: {
                    currency: 'mxn',
                    product_data: { name: item.platillo.nombre },
                    unit_amount: Math.round(item.platillo.precio * 100), // centavos
                },
                quantity: item.cantidad,
            }))
            : [
                // Fallback: un solo ítem con el total
                {
                    price_data: {
                        currency: 'mxn',
                        product_data: { name: descripcion || 'Pedido de restaurante' },
                        unit_amount: Math.round(total * 100),
                    },
                    quantity: 1,
                },
            ];

        // Agrega IVA como ítem separado si se proporciona
        if (iva && iva > 0) {
            lineItems.push({
                price_data: {
                    currency: 'mxn',
                    product_data: { name: 'IVA (16%)' },
                    unit_amount: Math.round(iva * 100),
                },
                quantity: 1,
            });
        }

        // Agrega envío como ítem separado si aplica
        if (envio && envio > 0) {
            lineItems.push({
                price_data: {
                    currency: 'mxn',
                    product_data: { name: 'Costo de envío' },
                    unit_amount: Math.round(envio * 100),
                },
                quantity: 1,
            });
        }

        // Generar folio único para este pedido
        const folio = uuidv4();

        // Crear la sesión de Stripe Checkout
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${FRONTEND_URL}/pago-exitoso?folio=${folio}&total=${total}`,
            cancel_url: `${FRONTEND_URL}/pago-cancelado`,
            metadata: { folio, total: String(total) },
        });

        // Guardar el pedido en pedidos.json (temporal, como evidencia)
        guardarPedido({
            folio,
            items: items || [],
            subtotal: subtotal || 0,
            iva: iva || 0,
            envio: envio || 0,
            total,
            descripcion: descripcion || '',
            fecha: new Date().toISOString(),
            estado: 'Pendiente (Stripe Test)',
            sessionId: session.id,
        });

        res.json({ url: session.url });

    } catch (err) {
        console.error('Error Stripe:', err.message);
        res.status(500).json({ error: 'Error al crear la sesión de Stripe: ' + err.message });
    }
});

// -----------------------------------------------------------
//  Guardar pedido en archivo JSON (evidencia obligatoria)
// -----------------------------------------------------------
function guardarPedido(pedido) {
    const filePath = path.join(__dirname, 'pedidos.json');
    let pedidos = [];

    try {
        if (fs.existsSync(filePath)) {
            const raw = fs.readFileSync(filePath, 'utf-8');
            pedidos = JSON.parse(raw);
        }
    } catch {
        pedidos = [];
    }

    // Marcar como "Pagado (Stripe Test)" — se actualiza al guardar
    pedido.estado = 'Pagado (Stripe Test)';
    pedidos.push(pedido);
    fs.writeFileSync(filePath, JSON.stringify(pedidos, null, 2), 'utf-8');
}

// -----------------------------------------------------------
//  Iniciar servidor
// -----------------------------------------------------------
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    console.log(`   FRONTEND_URL: ${FRONTEND_URL}`);

    // Advertencia si la llave no está configurada
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('AQUI_VA')) {
        console.warn('⚠️  ATENCIÓN: Configura tu STRIPE_SECRET_KEY en el archivo .env');
    }
});

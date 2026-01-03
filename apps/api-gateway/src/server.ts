import fastify from "fastify";
import cors from "@fastify/cors";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-12-15.clover",
});

const server = fastify({ logger: true });

server.register(cors, {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
});

const PRODUCT_DB: Record<
  string,
  { price: number; stock: number; name: string }
> = {
  "1": { name: "Veste Performance", price: 149.0, stock: 10 },
  "2": { name: "Urban Runners", price: 189.99, stock: 5 },
  "3": { name: "Sac Weekender", price: 299.0, stock: 0 }, // Oups, rupture de stock !
  "4": { name: "Watch Series X", price: 399.0, stock: 15 },
};

interface CartItemPayload {
  id: string;
  quantity: number;
}

server.post<{ Body: { items: CartItemPayload[] } }>(
  "/api/validate-cart",
  async (request, reply) => {
    const { items } = request.body;

    if (!items || !Array.isArray(items)) {
      return reply.status(400).send({ error: "Invalid cart format." });
    }

    let serverTotal = 0;

    const errors: string[] = [];
    const validatedItems = [];

    for (const item of items) {
      const dbProduct = PRODUCT_DB[item.id];

      if (!dbProduct) {
        errors.push(`Produit avec l'ID ${item.id} non trouvé.`);
        continue;
      }

      if (dbProduct.stock < item.quantity) {
        errors.push(
          `Stock insuffisant pour ${dbProduct.name}. Disponible: ${dbProduct.stock}, demandé: ${item.quantity}.`
        );
        continue;
      }

      const lineTotal = dbProduct.price * item.quantity;
      serverTotal += lineTotal;

      validatedItems.push({
        id: item.id,
        name: dbProduct.name,
        price: dbProduct.price,
        quantity: item.quantity,
        lineTotal: lineTotal,
      });
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    const isValid = errors.length === 0;

    return {
      isValid,
      serverTotal: Number(serverTotal.toFixed(2)),
      currency: "EUR",
      errors,
    };
  }
);

server.post<{ Body: { items: any[] } }>(
  "/api/create-checkout-session",
  async (request, reply) => {
    const { items } = request.body;
    const lineItems = [];

    for (const item of items) {
      const dbProduct = PRODUCT_DB[item.id];
      if (!dbProduct) continue;

      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: dbProduct.name,
            // images: [dbProduct.thumbnail],
          },
          unit_amount: Math.round(dbProduct.price * 100),
        },
        quantity: item.quantity,
      });
    }

    if (lineItems.length === 0) {
      return reply.code(400).send({ error: "Panier vide ou invalide" });
    }

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url:
          "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:3000/?canceled=true",
      });

      return { url: session.url };
    } catch (err) {
      server.log.error(err);
      return reply.code(500).send({ error: "Erreur Stripe" });
    }
  }
);

const start = async () => {
  try {
    await server.listen({ port: 4000, host: "0.0.0.0" });
    console.log("API Gateway is running on http://localhost:4000");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();

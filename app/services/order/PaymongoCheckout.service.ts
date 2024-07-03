import { Request, Response } from "express";
import prisma from "@/../prisma";
import http from "https";

interface LineItem {
  id: string;
  name: string;
  description: string;
  images: string[];
  currency: string;
  amount: number;
  quantity: number;
}

const apiKey = Buffer.from(
  process.env.PAYMENTGATEWAY_SECRET_KEY + ":",
).toString("base64");

async function createCheckoutSession(items: LineItem[]) {
  const options = {
    method: "POST",
    hostname: "api.paymongo.com",
    port: null,
    path: "/v1/checkout_sessions",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Basic ${apiKey}`,
    },
  };

  const attributes = {
    send_email_receipt: true,
    show_description: true,
    show_line_items: true,
    description: "E Menu Checkout",
    payment_method_types: [
      "card",
      "billease",
      "dob",
      "dob_ubp",
      "brankas_bdo",
      "brankas_landbank",
      "brankas_metrobank",
      "gcash",
      "grab_pay",
      "paymaya",
    ],
    line_items: items,
    cancel_url: process.env.FRONTEND_BASE_URL,
    sucess_url: process.env.FRONTEND_BASE_URL,
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, function (res) {
      const chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        const body = Buffer.concat(chunks);
        const raw = body.toString();
        const json = JSON.parse(raw);
        const keys = Object.keys(json);

        if (keys.includes("error") || keys.includes("errors")) reject(json);
        else resolve(json);
      });

      res.on("error", function (e) {
        reject(e);
      });
    });

    req.write(
      JSON.stringify({
        data: {
          attributes,
        },
      }),
    );
    req.end();
  });
}

async function PaymongoCheckoutService(req: Request, res: Response) {
  const { session, tableNo } = req.tableSession as Request["tableSession"];

  const cartItems = await prisma.cartItem.findMany({
    where: {
      sessionId: session,
      tableNo: tableNo,
    },
    include: {
      product: true,
    },
  });

  if (cartItems.length === 0)
    return res.status(400).send({ message: "no item in cart." });

  const lineItems: LineItem[] = [];

  cartItems.forEach((item) => {
    const product = item.product;
    const productItem = lineItems.find(
      (lineItem) => lineItem.id === product.id,
    );

    if (productItem) return productItem.quantity++;

    lineItems.push({
      id: product.id,
      name: product.name,
      description: product.description.slice(0, 252) + "...",
      images: [product.image],
      currency: "PHP",
      amount: Math.round(product.price * 100), // from peso to centavo.
      quantity: item.quantity,
    });
  });

  const checkoutSession = await createCheckoutSession(lineItems);

  return res.status(200).json(checkoutSession);
}

export default PaymongoCheckoutService;

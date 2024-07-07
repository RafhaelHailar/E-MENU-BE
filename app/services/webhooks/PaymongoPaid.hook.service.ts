import prisma from "@../prisma";
import { Request, Response } from "express";
import fish from "../../utils/fish";
import crypto from "crypto";

const apiKey = Buffer.from(
  process.env.PAYMENTGATEWAY_SECRET_KEY + ":",
).toString("base64");
const fishPermitted = fish.allowFishing("Basic " + apiKey);

interface WebhookKey {
  data?: string;
  error?: string;
}

interface PaymongoSignature {
  t: string;
  te: string;
  li: string;
}

let webhookKey: WebhookKey = {};

async function createCheckoutPaidWebhook() {
  const url = "api.paymongo.com/v1/webhooks";
  let webhookId: string = "";
  try {
    const webhooks = await fishPermitted.catch(url, {
      headers: {
        accept: "application/json",
      },
    });

    const attributes = {
      url: `${process.env.BACKEND_BASE_URL}/webhook/checkout/payment_success`,
      events: ["checkout_session.payment.paid"],
    };

    const similarHook = webhooks.data.find((hook) => {
      const { url } = attributes;
      return hook.attributes.url === url;
    });

    if (similarHook) {
      webhookId = similarHook.id;
      return (webhookKey.data = similarHook.attributes.secret_key);
    }

    const createHook = await fishPermitted.withWorm(url, {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ data: { attributes } }),
    });

    webhookId = createHook.data.id;
    webhookKey.data = createHook.data.attributes.secret_key;
    console.log("Checkout Paid Web Hook is Sucessfully Added!");
  } catch (e) {
    console.log(e);
    webhookKey.error = e;
  } finally {
    fishPermitted.withWorm(`${url}/${webhookId}/enable`).catch((e: Error) => {
      console.log(e);
    });
  }
}

const CheckoutPaidService = async (req: Request, res: Response) => {
  if (webhookKey.error) return res.status(500);

  // get paymongo signature in request, to authorize visit in this api.
  const paymongoSignature: string =
    req.get("paymongo-signature") ||
    (req.headers["paymongo-signature"] as string);
  const SignaturePart: PaymongoSignature = { t: "", te: "", li: "" };

  if (!paymongoSignature)
    return res.status(400).json({ message: "invalid request!" });

  // paymongo request body sent.
  const body = req.body;

  // get the signatures and timestamp.
  paymongoSignature.split(",").forEach((signature) => {
    const [key, value] = signature.split("=");
    SignaturePart[key] = value;
  });

  // reference:  https://developers.paymongo.com/docs/creating-webhook
  // compare paymongo signature if it really comes to paymongo.
  const mySignature = crypto
    .createHmac("sha256", webhookKey.data as string)
    .update(`${SignaturePart.t}.${JSON.stringify(body)}`)
    .digest("hex");

  // te = test mode, li = live mode
  // change to 'li' if you are receiving real payment.
  if (mySignature !== SignaturePart.te)
    return res.status(401).json({ message: "signature not match" });

  // signature match and payment succeed.
  // get checkout session id
  const checkoutReference = body.data.attributes.transactionId as string;

  const orderedItems = await prisma.transactions.findMany({
    where: {
      transactionId: checkoutReference,
    },
  });

  // if no ordered items.
  if (orderedItems.length === 0)
    return res.status(404).json({ message: "no ordered item(s) found" });

  // webhook payment method type.
  const paymentMode = body.data.attributes.data.attributes.type;

  // update transactions value
  await prisma.transactions.updateMany({
    where: {
      transactionId: checkoutReference,
    },
    data: {
      paymentMode: paymentMode,
      paymentStatus: "PAID",
      updatedBy: "Paymongo",
      updatedAt: new Date(),
    },
  });

  return res
    .status(200)
    .json({ message: "ordered item transaction info updated" });
};

export { createCheckoutPaidWebhook };
export default CheckoutPaidService;

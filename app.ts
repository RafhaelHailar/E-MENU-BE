import "@utils/env.validator";
import express from "express";
import prisma from "./prisma";

const app = express();

async function connectPrisma() {
  await prisma.$connect();
}

async function disconnectPrisma() {
  await prisma.$disconnect();
}

(async function run() {
  await require("@lib/express").index(app);
  await require("@services/webhooks/PaymongoPaid.hook.service").createCheckoutPaidWebhook();

  try {
    await connectPrisma();
    console.log("Prisma Connected!");
    app.listen(process.env.APP_PORT as string, () => {
      console.log(`App is running: http://localhost:${process.env.APP_PORT}`);
    });
  } catch (e) {
    console.log("Prisma connection failed:", e);
    await disconnectPrisma();
    process.exit(1);
  }
})();

import { Request, Response } from "express";
import prisma from "@/../prisma";
import loyaltyPoints from "./LoyaltyPoints.service";

async function UpdateStatusService(req: Request, res: Response) {
  const { orderNo, status } = req.body;

  const transaction = await prisma.transactions.findUnique({
    where: {
      orderNo,
    },
  });

  if (transaction)
    return res
      .status(404)
      .json({ message: "transactions with that order no are not found" });

  if (status === "COMPLETED") {
    await loyaltyPoints(transaction);
  }

  await prisma.transactions.updateMany({
    where: {
      orderNo,
    },
    data: {
      status,
    },
  });

  const orders = await prisma.orders.findMany({
    where: {
      orderNo,
    },
    include: {
      product: true,
    },
  });

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    await prisma.inventory.update({
      where: {
        productId: order.product.id,
      },
      data: {
        quantity: { decrement: order.quantity },
      },
    });
  }

  return res.status(200).json({ message: "order status is updated" });
}

export default UpdateStatusService;

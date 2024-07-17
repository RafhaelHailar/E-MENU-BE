import { Request, Response } from "express";
import prisma from "@/../prisma";
import PaymongoCheckoutService from "./PaymongoCheckout.service";

async function GetMyLatestOrder(req: Request, res: Response) {
  const tableSession = req.tableSession.session;
  const tableNo = Number(req.tableSession.tableNo);

  const order = await prisma.orders.findFirst({
    where: {
      sessionId: tableSession,
      tableNo,
    },
    orderBy: {
      orderNo: "desc",
    },
  });

  if (!order) return res.status(404).json({ message: "no order found" });

  const orders = await prisma.orders.findMany({
    where: {
      sessionId: tableSession,
      tableNo,
      orderNo: order.orderNo,
    },
    include: {
      product: true,
    },
  });

  const transaction = await prisma.transactions.findUnique({
    where: {
      transactionId: order.transactionId,
    },
    select: {
      tableNo: true,
      sessionId: true,
      status: true,
      orderNo: true,
      transactionId: true,
      createdAt: true,
      paymentMethod: true,
      orders: {
        select: {
          id: true,
          sessionId: true,
          price: true,
          quantity: true,
          amount: true,
          createdAt: true,
          product: {
            select: {
              id: true,
              name: true,
              image: true,
              description: true,
            },
          },
        },
      },
    },
  });

  let checkoutURL = null;

  if (transaction.paymentMethod === "ONLINE") {
    const paymongoCheckout = await PaymongoCheckoutService(
      req,
      res,
      order.transactionId,
      order.orderNo,
    );
    checkoutURL = (paymongoCheckout as { data }).data.attributes.checkout_url;
  }

  return res.status(200).json({ ...transaction, checkoutURL });
}

export default GetMyLatestOrder;

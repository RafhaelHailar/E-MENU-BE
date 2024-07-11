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
  });

  let checkoutURL = null;

  if (transaction.paymentMethod === "ONLINE") {
    const paymongoCheckout = await PaymongoCheckoutService(
      req,
      res,
      order.transactionId,
    );
    checkoutURL = (paymongoCheckout as { data }).data.attributes.checkout_url;
  }

  return res.status(200).json({
    transactionId: order.transactionId,
    orders,
    orderDate: order.createdAt,
    total: order.amount,
    status: transaction.status,
    paymentMethod: transaction.paymentMethod,
    checkoutURL,
  });
}

export default GetMyLatestOrder;

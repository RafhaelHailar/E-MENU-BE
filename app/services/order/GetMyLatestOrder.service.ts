import { Request, Response } from "express";
import prisma from "@/../prisma";

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
  });

  const transaction = await prisma.transactions.findUnique({
    where: {
      transactionId: order.transactionId,
    },
  });

  return res.status(200).json({
    transactionId: order.transactionId,
    orders,
    orderDate: order.createdAt,
    total: order.amount,
    status: transaction.status,
  });
}

export default GetMyLatestOrder;

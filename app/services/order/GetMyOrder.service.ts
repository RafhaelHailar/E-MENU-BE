import { Request, Response } from "express";
import prisma from "@/../prisma";

async function GetMyOrdersService(req: Request, res: Response) {
  const tableSession = req.tableSession.session;
  const tableNo = Number(req.tableSession.tableNo);

  const orders = await prisma.orders.findMany({
    where: {
      sessionId: tableSession,
      tableNo,
    },
    include: {
      product: true,
    },
  });

  const ordersByTransactionId = [];
  const cacheTransaction = {};

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    let transaction;

    if (cacheTransaction[order.transactionId]) {
      transaction = cacheTransaction[order.transactionId];
    } else {
      transaction = await prisma.transactions.findUnique({
        where: {
          transactionId: order.transactionId,
        },
      });
      cacheTransaction[order.transactionId] = transaction;
    }

    const group = ordersByTransactionId.find(
      (orderGroup) => orderGroup.transactionId === order.transactionId,
    );

    if (group) {
      if (order.createdAt < group.orderDate) group.orderDate = order.createdAt;
      group.orders.push(order);
      group.total += order.amount;
    } else {
      ordersByTransactionId.push({
        transactionId: order.transactionId,
        orderNo: order.orderNo,
        orders: [order],
        orderDate: order.createdAt,
        total: order.amount,
        status: transaction.status,
      });
    }
  }

  return res.status(200).json(ordersByTransactionId);
}

export default GetMyOrdersService;

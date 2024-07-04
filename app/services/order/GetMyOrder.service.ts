import { Request, Response } from "express";
import prisma from "@/../prisma";

async function GetMyOrdersService(req: Request, res: Response) {
  const tableSession = req.tableSession.session;
  const tableNo = Number(req.tableSession.tableNo);

  const orders = await prisma.transactions.findMany({
    where: {
      sessionId: tableSession,
      tableNo,
    },
    select: {
      id: true,
      sessionId: true,
      tableNo: true,
      quantity: true,
      price: true,
      amount: true,
      status: true,
      product: true,
      transactionId: true,
      createdAt: true,
    },
  });

  const ordersByTransactionId = [];

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
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
        orders: [order],
        orderDate: order.createdAt,
        total: order.amount,
        status: order.status,
      });
    }
  }

  return res.status(200).json(ordersByTransactionId);
}

export default GetMyOrdersService;

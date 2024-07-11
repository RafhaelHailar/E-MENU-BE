import { Request, Response } from "express";
import prisma from "@/../prisma";

async function GetService(req: Request, res: Response) {
  const orders = await prisma.orders.findMany({
    include: {
      product: true,
    },
  });

  const ordersByOrderId = [];
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

    const group = ordersByOrderId.find(
      (orderGroup) => orderGroup.orderNo === order.orderNo,
    );
    if (group) {
      if (order.createdAt < group.orderDate) group.orderDate = order.createdAt;
      group.orders.push(order);
      group.total += order.amount;
    } else {
      ordersByOrderId.push({
        orderNo: order.orderNo,
        tableNo: order.tableNo,
        transactionId: order.transactionId,
        orders: [order],
        orderDate: order.createdAt,
        total: order.amount,
        status: transaction.status,
      });
    }
  }

  return res.status(200).json(ordersByOrderId);
}

export default GetService;

import { Request, Response } from "express";
import prisma from "@/../prisma";

async function GetService(req: Request, res: Response) {
  const orders = await prisma.transactions.findMany({
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
      orderNo: true,
      createdAt: true,
    },
  });

  const ordersByOrderId = [];

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
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
        status: order.status,
      });
    }
  }

  return res.status(200).json(ordersByOrderId);
}

export default GetService;

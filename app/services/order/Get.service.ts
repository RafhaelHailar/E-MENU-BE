import { Request, Response } from "express";
import prisma from "@/../prisma";

async function GetService(req: Request, res: Response) {
  const orders = await prisma.transactions.findMany({
    select: {
      tableNo: true,
      sessionId: true,
      status: true,
      orderNo: true,
      transactionId: true,
      createdAt: true,
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

  const orderNo = req.params.orderNo;

  if (orderNo)
    return res
      .status(200)
      .json(orders.find((order) => order.orderNo === Number(orderNo)));
  return res.status(200).json(orders);
}

export default GetService;

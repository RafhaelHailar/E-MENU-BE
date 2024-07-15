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
            },
          },
        },
      },
    },
  });

  return res.status(200).json(orders);
}

export default GetMyOrdersService;

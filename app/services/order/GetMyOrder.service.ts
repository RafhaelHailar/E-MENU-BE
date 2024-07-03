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
  });

  return res.status(200).json(orders);
}

export default GetMyOrdersService;

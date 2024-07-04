import { Request, Response } from "express";
import prisma from "@/../prisma";

async function UpdateStatusService(req: Request, res: Response) {
  const { orderNo, status } = req.body;

  const transactions = await prisma.transactions.findMany({
    where: {
      orderNo,
    },
  });

  if (transactions.length === 0)
    return res
      .status(404)
      .json({ message: "transactions with that order no are not found" });

  await prisma.transactions.updateMany({
    where: {
      orderNo,
    },
    data: {
      status,
    },
  });

  return res.status(200).json({ message: "order status is updated" });
}

export default UpdateStatusService;

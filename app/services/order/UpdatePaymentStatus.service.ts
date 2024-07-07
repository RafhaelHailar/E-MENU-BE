import { Request, Response } from "express";
import prisma from "@/../prisma";

async function UpdatePaymentStatusService(req: Request, res: Response) {
  const { transactionId, status } = req.body;

  const transactions = await prisma.transactions.findMany({
    where: {
      transactionId,
      paymentMethod: "CASH",
    },
  });

  if (transactions.length === 0)
    return res
      .status(404)
      .json({ message: "transactions with that order no are not found" });

  await prisma.transactions.updateMany({
    where: {
      transactionId,
      paymentMethod: "CASH",
    },
    data: {
      paymentStatus: status,
      updatedBy: "ADMIN NAME", // TODO: change later when all is done.
      updatedAt: new Date(),
    },
  });

  return res.status(200).json({ message: "order payment status is updated" });
}

export default UpdatePaymentStatusService;

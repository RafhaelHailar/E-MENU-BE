import { Request, Response } from "express";
import prisma from "@/../prisma";

const GetMyLoyaltiesService = async (req: Request, res: Response) => {
  const email = req.body.params;
  const loyalties = await prisma.loyalty.findMany({
    where: {
      email,
    },
  });

  if (loyalties.length === 0)
    return res
      .status(404)
      .json({
        message:
          "either no loyalty record found for the email or no such email exists",
      });

  const totalLoyalty = loyalties.filter(async (loyalty) => {
    const transaction = await prisma.transactions.findUnique({
      where: {
        transactionId: loyalty.reference,
      },
    });

    if (!transaction) return false;

    return transaction.paymentStatus === "PAID";
  });

  return res.status(200).json(totalLoyalty);
};

export default GetMyLoyaltiesService;

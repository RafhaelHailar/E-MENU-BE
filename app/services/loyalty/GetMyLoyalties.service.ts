import { Request } from "express";
import prisma from "@/../prisma";

import { Loyalty } from "@prisma/client";

const GetMyLoyaltiesService = async (req: Request): Promise<Loyalty[]> => {
  const email = req.cookies.email;
  const loyalties = await prisma.loyalty.findMany({
    where: {
      email,
    },
  });

  if (loyalties.length === 0) return [];

  const totalLoyalty = loyalties.filter(async (loyalty) => {
    const transaction = await prisma.transactions.findUnique({
      where: {
        transactionId: loyalty.reference,
      },
    });

    if (!transaction) return false;

    return transaction.paymentStatus === "PAID";
  });

  return totalLoyalty;
};

export default GetMyLoyaltiesService;

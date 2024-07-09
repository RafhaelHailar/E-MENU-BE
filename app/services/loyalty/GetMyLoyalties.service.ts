import { Request } from "express";
import prisma from "@/../prisma";
import ApiErrorHandler from "@utils/ApiErrorHandler";
import httpStatus from "http-status";

const GetMyLoyaltiesService = async (req: Request) => {
  const email = req.cookies.email;
  const loyalties = await prisma.loyalty.findMany({
    where: {
      email,
    },
  });

  if (loyalties.length === 0)
    return new ApiErrorHandler(
      httpStatus.NOT_FOUND,
      "either no loyalty record found for the email or no such email exists",
    );

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

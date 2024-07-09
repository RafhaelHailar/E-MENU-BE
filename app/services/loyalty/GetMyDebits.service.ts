import { Request } from "express";
import prisma from "@/../prisma";
import ApiErrorHandler from "@utils/ApiErrorHandler";
import httpStatus from "http-status";
import { Debit } from "@prisma/client";

const GetMyDebitsService = async (
  req: Request,
): Promise<ApiErrorHandler | Debit[]> => {
  const email = req.cookies.email;

  const debits = await prisma.debit.findMany({
    where: {
      email,
    },
  });

  if (debits.length === 0)
    return new ApiErrorHandler(
      httpStatus.NOT_FOUND,
      "either no debit record found for the email or no such email exists",
    );

  return debits;
};

export default GetMyDebitsService;

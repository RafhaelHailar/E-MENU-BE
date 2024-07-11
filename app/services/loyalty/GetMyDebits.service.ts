import { Request } from "express";
import prisma from "@/../prisma";
import { Debit } from "@prisma/client";

const GetMyDebitsService = async (req: Request): Promise<Debit[]> => {
  const email = req.cookies.email;

  const debits = await prisma.debit.findMany({
    where: {
      email,
    },
  });

  if (debits.length === 0) return [];

  return debits;
};

export default GetMyDebitsService;

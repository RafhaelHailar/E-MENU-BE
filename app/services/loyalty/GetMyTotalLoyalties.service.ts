import { GetMyDebitsService, GetMyLoyaltiesService } from ".";
import { Request } from "express";
import { Debit, Loyalty } from "@prisma/client";

async function getMyTotalLoyaltiesService(req: Request) {
  const loyaltyPoints = (await GetMyLoyaltiesService(req)) as Loyalty[];
  const debits = (await GetMyDebitsService(req)) as Debit[];

  const totalPoints = loyaltyPoints.reduce(
    (total, loyalty) => total + loyalty.amount,
    0,
  );

  const totalDebits = debits.reduce((total, debit) => total + debit.amount, 0);

  return totalPoints - totalDebits;
}

export default getMyTotalLoyaltiesService;

import { Request, Response } from "express";
import asyncHandler from "@utils/asyncHandler";
import {
  GetService,
  GetMyLoyaltiesService,
  GetMyDebitsService,
} from "@services/loyalty";
import { Debit, Loyalty } from "@prisma/client";

const LoyaltyController = {
  get: asyncHandler(async (req: Request, res: Response) => {
    await GetService(req, res);
  }),

  getMyLoyalties: asyncHandler(async (req: Request, res: Response) => {
    try {
      const loyaltyPoints = await GetMyLoyaltiesService(req);
      return res.status(200).json(loyaltyPoints);
    } catch (e) {
      return res.status(e.statusCode).json({ message: e.message });
    }
  }),

  getMyDebits: asyncHandler(async (req: Request, res: Response) => {
    try {
      const debits = await GetMyDebitsService(req);
      return res.status(200).json(debits);
    } catch (e) {
      return res.status(e.statusCode).json({ message: e.message });
    }
  }),

  getMyTotalLoyalties: asyncHandler(async (req: Request, res: Response) => {
    try {
      const loyaltyPoints = (await GetMyLoyaltiesService(req)) as Loyalty[];
      const debits = (await GetMyDebitsService(req)) as Debit[];

      const totalPoints = loyaltyPoints.reduce(
        (total, loyalty) => total + loyalty.amount,
        0,
      );
      const totalDebits = debits.reduce(
        (total, debit) => total + debit.amount,
        0,
      );
      return res.status(200).json(totalPoints - totalDebits);
    } catch (e) {
      return res.status(e.statusCode).json({ message: e.message });
    }
  }),
};

export default LoyaltyController;

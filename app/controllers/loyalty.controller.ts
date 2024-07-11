import { Request, Response } from "express";
import asyncHandler from "@utils/asyncHandler";
import {
  GetService,
  GetMyLoyaltiesService,
  GetMyDebitsService,
  getMyTotalLoyaltiesService,
} from "@services/loyalty";

const LoyaltyController = {
  get: asyncHandler(async (req: Request, res: Response) => {
    await GetService(req, res);
  }),

  getMyLoyalties: asyncHandler(async (req: Request, res: Response) => {
    const loyaltyPoints = await GetMyLoyaltiesService(req);
    return res.status(200).json(loyaltyPoints);
  }),

  getMyDebits: asyncHandler(async (req: Request, res: Response) => {
    const debits = await GetMyDebitsService(req);
    return res.status(200).json(debits);
  }),

  getMyTotalLoyalties: asyncHandler(async (req: Request, res: Response) => {
    const points = await getMyTotalLoyaltiesService(req);

    return res.status(200).json({ points });
  }),
};

export default LoyaltyController;

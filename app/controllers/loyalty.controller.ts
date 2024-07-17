import { Request, Response } from "express";
import asyncHandler from "@utils/asyncHandler";
import {
  GetService,
  GetMyLoyaltiesService,
  GetMyDebitsService,
  GetMyTotalLoyaltiesService,
  RedeemService,
  CreateRewardService,
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
    const points = await GetMyTotalLoyaltiesService(req);

    return res.status(200).json({ points });
  }),

  redeem: asyncHandler(async (req: Request, res: Response) => {
    await RedeemService(req, res);
  }),

  createReward: asyncHandler(async (req: Request, res: Response) => {
    await CreateRewardService(req, res);
  }),
};

export default LoyaltyController;

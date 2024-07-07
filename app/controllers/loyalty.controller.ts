import { Request, Response } from "express";
import asyncHandler from "@utils/asyncHandler";
import { GetService } from "@services/loyalty";

const LoyaltyController = {
  get: asyncHandler(async (req: Request, res: Response) => {
    await GetService(req, res);
  }),
};

export default LoyaltyController;

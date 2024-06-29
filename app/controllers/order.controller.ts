import { Request, Response } from "express";
import asyncHandler from "@utils/asyncHandler";
import { GetCartService, UpdateCartService } from "@services/order";

const OrderController = {
  updateCart: asyncHandler(async (req: Request, res: Response) => {
    await UpdateCartService(req, res);
  }),

  getCart: asyncHandler(async (req: Request, res: Response) => {
    await GetCartService(req, res);
  }),
};

export default OrderController;

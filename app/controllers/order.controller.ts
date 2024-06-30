import { Request, Response } from "express";
import asyncHandler from "@utils/asyncHandler";
import {
  CheckoutService,
  GetCartService,
  UpdateCartService,
} from "@services/order";

const OrderController = {
  updateCart: asyncHandler(async (req: Request, res: Response) => {
    await UpdateCartService(req, res);
  }),

  getCart: asyncHandler(async (req: Request, res: Response) => {
    await GetCartService(req, res);
  }),

  checkout: asyncHandler(async (req: Request, res: Response) => {
    await CheckoutService(req, res);
  }),
};

export default OrderController;

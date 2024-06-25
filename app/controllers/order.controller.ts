import { Request, Response } from "express";
import asyncHandler from "@utils/asyncHandler";
import UpdateCartService from "@services/order/UpdateCart.service";

const OrderController = {
  updateCart: asyncHandler(async (req: Request, res: Response) => {
    await UpdateCartService(req, res);
  }),
};

export default OrderController;

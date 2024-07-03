import { Request, Response } from "express";
import asyncHandler from "@utils/asyncHandler";
import {
  GetCartService,
  UpdateCartService,
  AddCartService,
  SubCartService,
  OrderService,
} from "@services/order";

const OrderController = {
  updateCart: asyncHandler(async (req: Request, res: Response) => {
    await UpdateCartService(req, res);
  }),

  addCart: asyncHandler(async (req: Request, res: Response) => {
    await AddCartService(req, res);
  }),

  subCart: asyncHandler(async (req: Request, res: Response) => {
    await SubCartService(req, res);
  }),

  getCart: asyncHandler(async (req: Request, res: Response) => {
    await GetCartService(req, res);
  }),

  order: asyncHandler(async (req: Request, res: Response) => {
    await OrderService(req, res);
  }),
};

export default OrderController;

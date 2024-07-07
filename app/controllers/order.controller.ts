import { Request, Response } from "express";
import asyncHandler from "@utils/asyncHandler";
import {
  GetCartService,
  UpdateCartService,
  AddCartService,
  SubCartService,
  OrderService,
  GetMyOrdersService,
  GetService,
  UpdateStatusService,
} from "@services/order";

import CheckoutPaidService from "@services/webhooks/PaymongoPaid.hook.service";

const OrderController = {
  get: asyncHandler(async (req: Request, res: Response) => {
    await GetService(req, res);
  }),

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

  getMyOrder: asyncHandler(async (req: Request, res: Response) => {
    await GetMyOrdersService(req, res);
  }),

  updateStatus: asyncHandler(async (req: Request, res: Response) => {
    await UpdateStatusService(req, res);
  }),

  paymongoPaidHook: asyncHandler(async (req: Request, res: Response) => {
    await CheckoutPaidService(req, res);
  }),
};

export default OrderController;

import { Request, Response } from "express";
import asyncHandler from "@utils/asyncHandler";
import { GetProductService, AddProductService } from "@services/product";

const ProductController = {
  get: asyncHandler(async (req: Request, res: Response) => {
    await GetProductService(req, res);
  }),

  add: asyncHandler(async (req: Request, res: Response) => {
    await AddProductService(req, res);
  }),
};

export default ProductController;

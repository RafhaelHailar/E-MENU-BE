import { Request, Response } from "express";
import asyncHandler from "@utils/asyncHandler";
import { GetProductService } from "@services/product";

const ProductController = {
  get: asyncHandler(async (req: Request, res: Response) => {
    await GetProductService(req, res);
  }),
};

export default ProductController;

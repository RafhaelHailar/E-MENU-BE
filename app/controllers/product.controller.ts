import { Request, Response } from "express";
import asyncHandler from "@utils/asyncHandler";
import {
  GetProductService,
  AddProductService,
  AddProductCategoryService,
} from "@services/product";

const ProductController = {
  get: asyncHandler(async (req: Request, res: Response) => {
    await GetProductService(req, res);
  }),

  add: asyncHandler(async (req: Request, res: Response) => {
    await AddProductService(req, res);
  }),

  addProductCategory: asyncHandler(async (req: Request, res: Response) => {
    await AddProductCategoryService(req, res);
  }),
};

export default ProductController;

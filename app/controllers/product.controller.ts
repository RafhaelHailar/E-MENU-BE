import { Request, Response } from "express";
import asyncHandler from "@utils/asyncHandler";
import {
  GetProductService,
  AddProductService,
  AddProductCategoryService,
  CategorizeProductService,
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

  categorizeProduct: asyncHandler(async (req: Request, res: Response) => {
    await CategorizeProductService(req, res);
  }),
};

export default ProductController;

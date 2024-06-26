import { Request, Response } from "express";
import asyncHandler from "@utils/asyncHandler";
import {
  GetProductService,
  AddProductService,
  AddProductCategoryService,
  CategorizeProductService,
  AddPromotionService,
  CategorizePromotionService,
  GetPromotionService,
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

  getPromotion: asyncHandler(async (req: Request, res: Response) => {
    await GetPromotionService(req, res);
  }),

  addPromotion: asyncHandler(async (req: Request, res: Response) => {
    await AddPromotionService(req, res);
  }),

  categorizePromotion: asyncHandler(async (req: Request, res: Response) => {
    await CategorizePromotionService(req, res);
  }),
};

export default ProductController;

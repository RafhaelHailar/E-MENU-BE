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
  DeCategorizeProductService,
  GetCategoriesService,
  UpdateService,
} from "@services/product";

const ProductController = {
  get: asyncHandler(async (req: Request, res: Response) => {
    await GetProductService(req, res);
  }),

  add: asyncHandler(async (req: Request, res: Response) => {
    await AddProductService(req, res);
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    await UpdateService(req, res);
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

  deCategorizeProduct: asyncHandler(async (req: Request, res: Response) => {
    await DeCategorizeProductService(req, res);
  }),

  getCategories: asyncHandler(async (req: Request, res: Response) => {
    const allCategory = await GetCategoriesService();

    res.status(200).json(allCategory);
  }),
};

export default ProductController;

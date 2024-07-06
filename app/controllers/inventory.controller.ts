import { Request, Response } from "express";
import asyncHandler from "@utils/asyncHandler";
import {
  GetItemsService,
  AddItemService,
  UpdateItemService,
  DeleteItemService,
} from "@services/inventory";

const InventoryController = {
  getItems: asyncHandler(async (req: Request, res: Response) => {
    await GetItemsService(req, res);
  }),

  addItem: asyncHandler(async (req: Request, res: Response) => {
    await AddItemService(req, res);
  }),

  updateItem: asyncHandler(async (req: Request, res: Response) => {
    await UpdateItemService(req, res);
  }),

  deleteItem: asyncHandler(async (req: Request, res: Response) => {
    await DeleteItemService(req, res);
  }),
};

export default InventoryController;

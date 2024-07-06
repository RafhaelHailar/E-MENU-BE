import { Request, Response } from "express";
import asyncHandler from "@utils/asyncHandler";
import { GetItemsService, AddItemService } from "@services/inventory";

const InventoryController = {
  getItems: asyncHandler(async (req: Request, res: Response) => {
    await GetItemsService(req, res);
  }),

  addItem: asyncHandler(async (req: Request, res: Response) => {
    await AddItemService(req, res);
  }),
};

export default InventoryController;

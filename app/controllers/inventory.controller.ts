import { Request, Response } from "express";
import asyncHandler from "@utils/asyncHandler";
import { GetItemsService } from "@services/inventory";

const InventoryController = {
  getItems: asyncHandler(async (req: Request, res: Response) => {
    await GetItemsService(req, res);
  }),
};

export default InventoryController;

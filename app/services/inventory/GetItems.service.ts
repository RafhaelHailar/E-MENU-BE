import { Request, Response } from "express";
import prisma from "@/../prisma";

const GetItemsService = async (req: Request, res: Response) => {
  /*   const items = await prisma.inventoryItem.findMany();
  return res.status(200).json(items); */
};

export default GetItemsService;

import { Request, Response } from "express";
import prisma from "@/../prisma";

const UpdateItemService = async (req: Request, res: Response) => {
  const { id, name, category } = req.body;
  const quantity = req.body.quantity || 0;

  /*  const item = await prisma.inventoryItem.findUnique({
    where: {
      id,
    },
  });

  if (!item)
    return res
      .status(404)
      .json({ message: "inventory item with given id is not found" });

  await prisma.inventoryItem.update({
    where: {
      id,
    },
    data: {
      name,
      category,
      quantity,
      updatedAt: new Date(),
    },
  }); */

  return res.status(200).json({ message: "inventory item is updated" });
};

export default UpdateItemService;

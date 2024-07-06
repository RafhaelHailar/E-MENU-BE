import { Request, Response } from "express";
import prisma from "@/../prisma";

const AddItemService = async (req: Request, res: Response) => {
  const { name, category } = req.body;
  const quantity = req.body.quantity || 0;

  await prisma.inventoryItem.create({
    data: {
      name,
      category,
      quantity,
    },
  });

  return res.status(201).json({ message: "inventory item added" });
};

export default AddItemService;

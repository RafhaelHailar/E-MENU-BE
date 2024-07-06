import { Request, Response } from "express";
import prisma from "@/../prisma";

const DeleteItemService = async (req: Request, res: Response) => {
  const id = req.params.id;

  await prisma.inventoryItem.delete({
    where: {
      id,
    },
  });

  return res.status(200).json({ message: "inventory item is deleted" });
};

export default DeleteItemService;

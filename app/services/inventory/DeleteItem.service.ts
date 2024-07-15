import { Request, Response } from "express";
import prisma from "@/../prisma";

const DeleteItemService = async (req: Request, res: Response) => {
  const id = req.params.itemId;

  if (!id)
    return res.status(400).json({ message: "no inventory item id is given" });
  /* 
  const item = await prisma.inventoryItem.findUnique({
    where: {
      id,
    },
  });

  if (!item)
    return res
      .status(404)
      .json({ message: "inventory item with given id is not found" });

  await prisma.inventoryItem.delete({
    where: {
      id,
    },
  });
 */
  return res.status(200).json({ message: "inventory item is deleted" });
};

export default DeleteItemService;

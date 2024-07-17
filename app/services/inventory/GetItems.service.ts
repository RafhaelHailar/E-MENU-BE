import { Request, Response } from "express";
import prisma from "@/../prisma";

const GetItemsService = async (req: Request, res: Response) => {
  const items = await prisma.product.findMany({
    select: {
      id: true,
      inventory: {
        select: {
          quantity: true,
        },
      },
    },
  });

  const mappedItems = items.map(({ id, inventory }) => ({
    id,
    quantity: inventory.quantity,
  }));

  return res.status(200).json(mappedItems);
};

export default GetItemsService;

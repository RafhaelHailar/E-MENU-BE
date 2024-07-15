import { Request, Response } from "express";
import prisma from "@/../prisma";

async function UpdateService(req: Request, res: Response) {
  const {
    id,
    name,
    description,
    image,
    price,
    estimatedCookingTimeMin,
    quantity,
  } = req.body;

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product)
    return res
      .status(404)
      .json({ message: "product with given id is not found" });

  await prisma.product.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      image,
      price,
      estimatedCookingTimeMin,
      inventory: {
        update: {
          quantity,
          updatedAt: new Date(),
        },
      },
    },
  });

  return res.status(200).json({ message: "product is sucessfully updated" });
}

export default UpdateService;

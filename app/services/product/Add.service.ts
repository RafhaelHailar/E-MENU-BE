import { Request, Response } from "express";
import prisma from "@/../prisma";

async function AddService(req: Request, res: Response) {
  const { name, image, description, price, estimatedCookingTimeMin, quantity } =
    req.body;

  const product = await prisma.product.create({
    data: {
      name,
      image,
      description,
      price,
      estimatedCookingTimeMin,
      inventory: {
        create: {
          quantity,
        },
      },
    },
  });

  return res.status(201).json({
    message: "Product Created",
    id: product.id,
  });
}

export default AddService;

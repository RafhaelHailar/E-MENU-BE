import { Request, Response } from "express";
import prisma from "@/../prisma";

async function AddService(req: Request, res: Response) {
  const {
    name,
    image,
    description,
    price,
    estimatedCookingTimeMin,
    quantity,
    categories,
  } = req.body;

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

  for (let i = 0; i < categories.length; i++) {
    await prisma.productCategorize.create({
      data: {
        categoryId: categories[i],
        productId: product.id,
      },
    });
  }

  return res.status(201).json({
    message: "Product Created",
    id: product.id,
  });
}

export default AddService;

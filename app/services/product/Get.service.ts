import { Request, Response } from "express";
import prisma from "@/../prisma";

async function GetService(req: Request, res: Response) {
  const { productId } = req.params;

  if (productId) {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        productCategorize: {
          include: {
            category: true,
          },
        },
        productReview: true,
      },
    });

    return res.status(200).json(product);
  }

  const products = await prisma.product.findMany({
    include: {
      productCategorize: {
        include: {
          category: true,
        },
      },
      productReview: true,
    },
  });

  return res.status(200).json(products);
}

export default GetService;

import { Request, Response } from "express";
import prisma from "@/../prisma";

async function GetService(req: Request, res: Response) {
  const { productId } = req.params;

  if (productId) {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    return res.status(200).json(product);
  }

  const products = await prisma.product.findMany();

  return res.status(200).json(products);
}

export default GetService;

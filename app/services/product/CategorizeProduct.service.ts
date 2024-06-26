import { Request, Response } from "express";
import prisma from "@/../prisma";

async function CategorizeProductService(req: Request, res: Response) {
  const { categoryId, productId } = req.body;

  await prisma.productCategorize.create({
    data: {
      categoryId,
      productId,
    },
  });

  return res.status(200).json({
    message: "Product Successfully Categorize",
  });
}

export default CategorizeProductService;

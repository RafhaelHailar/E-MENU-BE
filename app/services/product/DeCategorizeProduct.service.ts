import { Request, Response } from "express";
import prisma from "@/../prisma";

async function DeCategorizeProductService(req: Request, res: Response) {
  const { categoryId, productId } = req.params;

  const category = await prisma.productCategory.findUnique({
    where: {
      id: categoryId,
    },
  });

  if (!category)
    return res
      .status(404)
      .json({ message: "category with given category id is not found!" });

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product)
    return res
      .status(404)
      .json({ message: "product with given product id is not found!" });

  await prisma.productCategorize.delete({
    where: {
      categoryId_productId: {
        categoryId,
        productId,
      },
    },
  });

  return res.status(200).json({
    message: "Product Successfully De Categorize",
  });
}

export default DeCategorizeProductService;

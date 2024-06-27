import { Request, Response } from "express";
import prisma from "@/../prisma";
import type { ProductWithCategory } from "@./types/prismaExtended";

function transformProduct(product: ProductWithCategory) {
  const categories = product.productCategorize.map((categorize) => {
    return categorize.category.name;
  });

  const transformedProduct = {
    ...product,
    categories,
    ratings: 5,
  };

  return transformedProduct;
}

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

    const transformedProduct = transformProduct(product as ProductWithCategory);

    return res.status(200).json(transformedProduct);
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

  const transformedProducts = [];

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const transformedProduct = transformProduct(product as ProductWithCategory);
    transformedProducts.push(transformedProduct);
  }

  return res.status(200).json(transformedProducts);
}

export default GetService;

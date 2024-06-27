import { Request, Response } from "express";
import prisma from "@/../prisma";
import type {
  ProductWithCategory,
  CategoryWithPromotionCategorize,
} from "@./types/prismaExtended";

function transformProduct(product: ProductWithCategory, allCategory: string[]) {
  const categories = product.productCategorize.map((categorize) => {
    const categoryName = categorize.category.name;
    if (
      (categorize.category as CategoryWithPromotionCategorize)
        .promotionCategorize &&
      !allCategory.includes(categoryName)
    )
      allCategory.push(categoryName);
    return categoryName;
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

    const transformedProduct = transformProduct(
      product as ProductWithCategory,
      [],
    );

    return res.status(200).json(transformedProduct);
  }

  const transformedProducts = [];
  const allCategory = [];

  const products = await prisma.product.findMany({
    include: {
      productCategorize: {
        include: {
          category: {
            include: {
              promotionCategorize: {
                include: {
                  promotion: true,
                },
              },
            },
          },
        },
      },
      productReview: true,
    },
  });

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const transformedProduct = transformProduct(
      product as ProductWithCategory,
      allCategory,
    );
    transformedProducts.push(transformedProduct);
  }

  return res.status(200).json({
    categories: allCategory,
    items: transformedProducts,
  });
}

export default GetService;

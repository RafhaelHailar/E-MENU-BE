import { Request, Response } from "express";
import prisma from "@/../prisma";
import type { ProductWithCategory } from "@./types/prismaExtended";

function transformProduct(product: ProductWithCategory) {
  const categories = product.productCategorize.map((categorize) => {
    const categoryName = categorize.category.name;
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
  const page = Number(req.query.page || 1);
  const getAll = req.query.total === null || req.query.total === undefined;
  const total = Number(req.query.total || 0);

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

  const transformedProducts = [];

  // cursor base pagination: https://www.prisma.io/docs/orm/prisma-client/queries/pagination
  const firstQueryResults = await prisma.product.findMany({
    take: (page - 1) * total + 1,
  });

  if (firstQueryResults.length === 0) return res.status(200).json([]);

  const lastPointInResults = firstQueryResults[firstQueryResults.length - 1];
  const myCursor = lastPointInResults.id;

  if ((page - 1) * total + 1 > firstQueryResults.length)
    return res.status(200).json([]);

  const getOption = {
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
  };

  const pageOption = {
    take: total,
    skip: 0,
    cursor: {
      id: myCursor,
    },
  };

  const takeOption = getAll ? getOption : Object.assign(getOption, pageOption);

  const products = await prisma.product.findMany(takeOption);

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const transformedProduct = transformProduct(product as ProductWithCategory);
    transformedProducts.push(transformedProduct);
  }

  return res.status(200).json(transformedProducts);
}

export default GetService;

import { Request, Response } from "express";
import prisma from "@/../prisma";

async function AddProductCategoryService(req: Request, res: Response) {
  const { name } = req.body;

  const category = await prisma.productCategory.create({
    data: {
      name,
    },
  });

  return res.status(201).json({
    message: "Product Category Created",
    id: category.id,
  });
}

export default AddProductCategoryService;

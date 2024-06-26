import { Request, Response } from "express";
import prisma from "@/../prisma";

async function CategorizePromotionService(req: Request, res: Response) {
  const { promotionId } = req.params;
  const { categoryId } = req.body;

  await prisma.promotionCategorize.create({
    data: {
      categoryId,
      promotionId,
    },
  });

  return res.status(200).json({
    message: "Promotion Successfully Categorize",
  });
}

export default CategorizePromotionService;

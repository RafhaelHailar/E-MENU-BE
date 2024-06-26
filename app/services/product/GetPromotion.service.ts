import { Request, Response } from "express";
import prisma from "@/../prisma";

async function GetPromotionService(req: Request, res: Response) {
  const { promotionId } = req.params;

  if (promotionId) {
    const promotion = await prisma.promotion.findUnique({
      where: {
        id: promotionId,
      },
    });

    return res.status(200).json(promotion);
  }

  const promotions = await prisma.promotion.findMany();

  return res.status(200).json(promotions);
}

export default GetPromotionService;

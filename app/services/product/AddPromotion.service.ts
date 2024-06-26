import { Request, Response } from "express";
import prisma from "@/../prisma";

async function AddPromotionService(req: Request, res: Response) {
  const { name, description, discountRate, startDate, endDate } = req.body;

  const promotion = await prisma.promotion.create({
    data: {
      name,
      description,
      discountRate,
      startDate,
      endDate,
    },
  });

  return res.status(201).json({
    message: "Promotion Successfully Added",
    id: promotion.id,
  });
}

export default AddPromotionService;

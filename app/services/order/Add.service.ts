/* import { Request, Response } from "express";
import prisma from "@/../prisma";

const AddService = async (req: Request, res: Response) => {
  const { orderNo, reviews } = req.body;

  await prisma.reviews.create({
    data: {
        orderNo,
        reviews
    }
  });

  return res.status(201).json({message: "ratings added"});
};

export default AddService; */

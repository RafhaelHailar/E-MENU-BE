import { Request, Response } from "express";
import prisma from "@/../prisma";

const CreateRewardService = async (req: Request, res: Response) => {
  const { name, points, image, description } = req.body;

  await prisma.reward.create({
    data: {
      name,
      points,
      image,
      description,
    },
  });

  return res.status(201).json({ message: "reward created!" });
};

export default CreateRewardService;

import { Request, Response } from "express";
import prisma from "@/../prisma";

const UpdateRewardService = async (req: Request, res: Response) => {
  const { rewardId, name, points, image, description } = req.body;

  const reward = await prisma.reward.findUnique({
    where: {
      rewardId,
    },
  });

  if (!reward)
    return res
      .status(404)
      .json({ message: "reward with given reward id is not found" });

  await prisma.reward.update({
    where: {
      rewardId,
    },
    data: {
      name,
      points,
      image,
      description,
    },
  });

  return res.status(200).json({ message: "reward successfully updated!" });
};

export default UpdateRewardService;

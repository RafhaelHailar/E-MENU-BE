import { Request, Response } from "express";
import prisma from "@/../prisma";

const DeleteRewardService = async (req: Request, res: Response) => {
  const rewardId = req.params.rewardId;

  await prisma.reward.delete({
    where: {
      rewardId,
    },
  });

  return res.status(201).json({ message: "reward deleted!" });
};

export default DeleteRewardService;

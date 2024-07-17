import { Request, Response } from "express";
import prisma from "@/../prisma";

const GetRewardsService = async (req: Request, res: Response) => {
  const rewards = await prisma.reward.findMany();

  return res.status(201).json(rewards);
};

export default GetRewardsService;

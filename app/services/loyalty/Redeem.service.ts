import { Request, Response } from "express";
import prisma from "@/../prisma";
import getMyTotalLoyaltiesService from "./GetMyTotalLoyalties.service";

const RedeemService = async (req: Request, res: Response) => {
  const email = req.cookies.email;
  const rewardId = req.body.rewardId as number;

  const reward = await prisma.reward.findUnique({
    where: {
      id: rewardId,
    },
  });

  if (!reward)
    return res
      .status(404)
      .json({ message: "reward with given id is not found" });

  const points = await getMyTotalLoyaltiesService(req);

  if (points < reward.points)
    return res.status(400).json({ message: "not enough points" });

  await prisma.debit.create({
    data: {
      email,
      amount: reward.points,
      rewardId,
    },
  });

  return res.status(200).json({ message: "reward successfully redeemed" });
};

export default RedeemService;

import { Request, Response } from "express";
import prisma from "@/../prisma";

const GetService = async (req: Request, res: Response) => {
  const loyalties = await prisma.loyalty.findMany();
  return res.status(200).json(loyalties);
};

export default GetService;

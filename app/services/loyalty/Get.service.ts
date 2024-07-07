import { Request, Response } from "express";
import prisma from "@/../prisma";

const GetService = async (req: Request, res: Response) => {
  const items = await prisma.loyalty.findMany();
  return res.status(200).json(items);
};

export default GetService;

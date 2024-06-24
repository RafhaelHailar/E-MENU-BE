import { Request, Response } from "express";
import prisma from "@../prisma";

async function GetService(req: Request, res: Response) {
  const products = await prisma.product.findMany();

  return res.status(200).json(products);
}

export default GetService;

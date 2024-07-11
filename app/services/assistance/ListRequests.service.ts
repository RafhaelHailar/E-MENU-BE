import { Request, Response } from "express";
import prisma from "@/../prisma";

async function ListRequestsService(req: Request, res: Response) {
  const assistanceRequests = await prisma.assistance.findMany();

  return res.status(200).json(assistanceRequests);
}

export default ListRequestsService;

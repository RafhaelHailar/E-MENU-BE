import { Request, Response } from "express";
import prisma from "@/../prisma";

async function ApproveRequestService(req: Request, res: Response) {
  const { sessionId } = req.body;

  const tableRequest = await prisma.table.findUnique({
    where: {
      session: sessionId,
    },
  });

  if (!tableRequest)
    res
      .status(404)
      .json({ message: "table request with that session id is not found" });

  await prisma.table.update({
    where: {
      session: sessionId,
    },
    data: {
      status: true,
    },
  });

  return res.status(200).json({ message: "table request is approved" });
}

export default ApproveRequestService;

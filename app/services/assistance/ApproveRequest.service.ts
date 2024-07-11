import { Request, Response } from "express";
import prisma from "@/../prisma";

async function ApproveRequestService(req: Request, res: Response) {
  const { sessionId } = req.body;

  const assistanceRequest = await prisma.assistance.findUnique({
    where: {
      requested: sessionId,
    },
  });

  if (!assistanceRequest)
    return res
      .status(404)
      .json({
        message: "assistance request with that session id is not found",
      });

  await prisma.assistance.update({
    where: {
      requested: sessionId,
    },
    data: {
      assist: true,
      approvedBy: "ADMIN", // to change later
    },
  });

  return res
    .status(200)
    .json({ message: "assistance request is being approved" });
}

export default ApproveRequestService;

import { Request, Response } from "express";
import prisma from "@/../prisma";

async function DeclineRequestService(req: Request, res: Response) {
  const sessionId = req.params._session_id;

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

  await prisma.assistance.delete({
    where: {
      requested: sessionId,
    },
  });

  return res
    .status(200)
    .json({ message: "assistance request is being declined" });
}

export default DeclineRequestService;

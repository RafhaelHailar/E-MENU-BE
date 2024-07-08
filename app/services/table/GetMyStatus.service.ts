import { Request, Response } from "express";
import prisma from "@/../prisma";

async function GetMyStatusService(req: Request, res: Response) {
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

  return res.status(200).json(tableRequest);
}

export default GetMyStatusService;

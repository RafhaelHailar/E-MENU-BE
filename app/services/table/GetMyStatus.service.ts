import { Request, Response } from "express";
import prisma from "@/../prisma";

async function GetMyStatusService(req: Request, res: Response) {
  const session = req.cookies._session_id;

  const tableRequest = await prisma.table.findUnique({
    where: {
      session,
    },
  });

  if (!tableRequest)
    res
      .status(404)
      .json({ message: "table request with that session id is not found" });

  return res.status(200).json(tableRequest);
}

export default GetMyStatusService;

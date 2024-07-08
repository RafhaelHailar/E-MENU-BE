import { Request, Response } from "express";
import prisma from "@/../prisma";

async function GetMyStatusService(req: Request, res: Response) {
  const session = req.cookies._table_session;

  if (!session) return res.status(400).json({ message: "no session id found" });

  const tableRequest = await prisma.table.findUnique({
    where: {
      session,
    },
  });

  if (!tableRequest)
    return res
      .status(404)
      .json({ message: "table request with that session id is not found" });

  return res.status(200).json(tableRequest);
}

export default GetMyStatusService;

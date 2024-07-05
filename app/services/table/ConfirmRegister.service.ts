import { Request, Response } from "express";
import prisma from "@/../prisma";

async function ConfirmRegisterService(req: Request, res: Response) {
  const tableId = Number(req.query.tableId);
  const sessionId = req.query.sessionId;

  const table = await prisma.table.findUnique({
    where: {
      tableNo: tableId,
      session: sessionId as string,
    },
  });

  if (!table) return res.status(404).json({ message: "session not found!" });

  res.cookie("_table_session", sessionId, {
    httpOnly: false,
    secure: true,
    sameSite: "none",
    path: "/",
  });
  res.cookie("_table_no", tableId, {
    httpOnly: false,
    secure: true,
    sameSite: "none",
    path: "/",
  });

  return res.status(200).json({ message: "register confirm!" });
}

export default ConfirmRegisterService;

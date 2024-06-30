import { Request, Response } from "express";
import prisma from "@/../prisma";
import crypto from "crypto";

async function RegisterService(req: Request, res: Response) {
  const tableId = Number(req.params.tableId);

  const sessionId = crypto.randomBytes(32).toString("hex");

  res.cookie("_table_session", sessionId);
  res.cookie("_table_no", tableId);

  await prisma.table.create({
    data: {
      session: sessionId,
      tableNo: tableId,
    },
  });

  return res.redirect(process.env.FRONTEND_BASE_URL);
}

export default RegisterService;

import { Request, Response } from "express";
import prisma from "@/../prisma";
import crypto from "crypto";

async function RegisterService(req: Request, res: Response) {
  const { tableId } = req.params;

  const table = await prisma.table.findUnique({
    where: {
      id: Number(tableId),
    },
  });

  const isInSession = table.session || table.session != "";

  if (isInSession)
    return res.status(403).json({ message: "there is another session open" });

  const newSession = crypto.randomBytes(64).toString("hex");

  res.cookie("_table_session", newSession + "." + tableId);

  res.status(200).json({ table_session: newSession });
}

export default RegisterService;

import { Request, Response } from "express";
import prisma from "@/../prisma";
import crypto from "crypto";

async function RegisterService(req: Request, res: Response) {
  const tableId = Number(req.params.tableId);

  const sessionId = crypto.randomBytes(32).toString("hex");

  const ip =
    req.headers["cf-connecting-ip"] ||
    req.headers["x-real-ip"] ||
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    "";

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

  await prisma.table.upsert({
    where: {
      ipAddress: ip as string,
    },
    update: {
      session: sessionId,
      tableNo: tableId,
      updatedAt: new Date(),
    },
    create: {
      session: sessionId,
      tableNo: tableId,
      ipAddress: ip as string,
    },
  });

  return res.redirect(
    process.env.FRONTEND_BASE_URL +
      `?sessionId=${sessionId}&tableNo=${tableId}`,
  );
}

export default RegisterService;

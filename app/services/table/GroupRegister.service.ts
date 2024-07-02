import { Request, Response } from "express";
import prisma from "@/../prisma";

async function GroupRegisterService(req: Request, res: Response) {
  const targetSession = req.params._session_id;

  const session = await prisma.table.findUnique({
    where: {
      session: targetSession,
    },
  });

  if (!session)
    return res.status(404).json({ message: "given session id is not found" });

  res.cookie("_table_session", targetSession, {
    httpOnly: false,
    secure: true,
    sameSite: "none",
  });
  res.cookie("_table_no", session.tableNo, {
    httpOnly: false,
    secure: true,
    sameSite: "none",
  });

  return res.redirect(process.env.FRONTEND_BASE_URL);
}

export default GroupRegisterService;

import { Request, Response, NextFunction } from "express";
import prisma from "@/../prisma";

async function auth(req: Request, res: Response, next: NextFunction) {
  const tableSession = req.cookies._table_session;

  if (!tableSession) res.status(401).json({ message: "please authenticate" });

  const table = await prisma.table.findUnique({
    where: {
      session: tableSession,
    },
  });

  if (!table)
    res.status(401).json({ message: "table with that session is not found!" });

  const sessionData = { id: table.id };
  req.tableSession = sessionData;
  next();
}

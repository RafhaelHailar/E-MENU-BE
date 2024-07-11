import { Request, Response, NextFunction } from "express";
import prisma from "prisma";

const isApproved = async (req: Request, res: Response, next: NextFunction) => {
  const tableSession = req.cookies._table_session;

  if (!tableSession)
    return res.status(401).json({ message: "please authenticate" });

  const session = await prisma.table.findUnique({
    where: {
      session: tableSession,
    },
  });

  if (!session) return res.status(404).json({ message: "session not found" });

  if (!session.status)
    return res.status(401).json({ message: "session not approved" });

  req.tableSession = session;
  next();
};

export default isApproved;

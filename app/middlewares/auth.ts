import { Request, Response, NextFunction } from "express";
import prisma from "@/../prisma";

async function auth(req: Request, res: Response, next: NextFunction) {
  const tableSession = req.cookies._table_session;

  if (!tableSession) res.status(401).json({ message: "please authenticate" });

  const [customerId, tableId] = tableSession.split(".");

  const customer = await prisma.customer.findUnique({
    where: {
      id: customerId,
    },
  });

  if (!customer)
    res.status(401).json({ message: "table with that session is not found!" });

  const sessionData = { customerId, tableId: Number(tableId) };
  req.tableSession = sessionData;
  next();
}

export default auth;

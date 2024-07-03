import { Request, Response } from "express";
import prisma from "@/../prisma";

async function GetCartService(req: Request, res: Response) {
  const tableSession = req.cookies._table_session;

  if (!tableSession) return res.status(200).json([]);

  const cartItems = await prisma.cartItem.findMany({
    where: {
      sessionId: tableSession,
    },
  });

  return res.status(200).json(cartItems);
}

export default GetCartService;

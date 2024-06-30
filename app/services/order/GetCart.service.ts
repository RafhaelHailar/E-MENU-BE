import { Request, Response } from "express";
import prisma from "@/../prisma";

async function GetCartService(req: Request, res: Response) {
  const tableSession = req.cookies._table_session;
  const tableNo = req.cookies._table_no;

  if (!tableSession || !tableNo)
    return res.status(400).json({ message: "please authenticate" });

  const cartItems = await prisma.cartItem.findMany({
    where: {
      sessionId: tableSession,
    },
  });

  return res.status(200).json(cartItems);
}

export default GetCartService;

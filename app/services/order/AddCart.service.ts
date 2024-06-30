import { Request, Response } from "express";
import prisma from "@/../prisma";

async function AddCartService(req: Request, res: Response) {
  const tableSession = req.tableSession;

  const data = req.body;

  const cartItem = await prisma.cartItem.upsert({
    where: {
      id: data.id,
      tableNo: Number(tableSession.tableNo),
      sessionId: tableSession.session,
    },
    update: {
      quantity: { increment: 1 },
    },
    create: {
      productId: data.id,
      sessionId: tableSession.session,
      tableNo: Number(tableSession.tableNo),
      quantity: 1,
    },
  });

  return res.status(200).json({ message: "items added in cart" });
}

export default AddCartService;

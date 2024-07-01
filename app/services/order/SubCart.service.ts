import { Request, Response } from "express";
import prisma from "@/../prisma";

async function SubCartService(req: Request, res: Response) {
  const tableSession = req.tableSession;

  const data = req.body;

  const subtractedItem = await prisma.cartItem.update({
    where: {
      sessionId_tableNo_productId: {
        productId: data.id,
        tableNo: Number(tableSession.tableNo),
        sessionId: tableSession.session,
      },
    },
    data: {
      quantity: { decrement: 1 },
    },
  });

  if (subtractedItem.quantity === 0) {
    await prisma.cartItem.delete({
      where: {
        sessionId_tableNo_productId: {
          productId: data.id,
          tableNo: Number(tableSession.tableNo),
          sessionId: tableSession.session,
        },
      },
    });
    return res.status(200).json({ message: "item removed in cart" });
  }

  return res.status(200).json({ message: "item subtracted in cart" });
}

export default SubCartService;

import { Request, Response } from "express";
import prisma from "@/../prisma";

async function AddCartService(req: Request, res: Response) {
  const tableSession = req.tableSession;

  const data = req.body;

  const product = prisma.product.findUnique({
    where: {
      id: data.id,
    },
  });

  if (!product)
    return res
      .status(404)
      .json({ message: "product with given id is not found!" });

  await prisma.cartItem.upsert({
    where: {
      sessionId_tableNo_productId: {
        tableNo: Number(tableSession.tableNo),
        sessionId: tableSession.session,
        productId: data.id,
      },
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

  return res.status(200).json({ message: "item added in cart" });
}

export default AddCartService;

import { Request, Response } from "express";
import prisma from "@/../prisma";

async function UpdateCartService(req: Request, res: Response) {
  const tableSession = req.tableSession;

  const data = req.body;
  const cartItems = data.cartItems;

  for (let i = 0; i < cartItems.length; i++) {
    const { id, quantity } = cartItems[i];

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product)
      return res
        .status(404)
        .json({ message: "product with the given product id is not found!" });

    await prisma.cartItem.create({
      data: {
        productId: id,
        sessionId: tableSession.session,
        tableNo: Number(tableSession.tableNo),
        quantity,
      },
    });
  }

  return res.status(200).json({ message: "items updated in cart" });
}

export default UpdateCartService;

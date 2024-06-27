import { Request, Response } from "express";
import prisma from "@/../prisma";

async function UpdateCartService(req: Request, res: Response) {
  const { customerId, tableId } = req.tableSession as Request["tableSession"];

  const customer = await prisma.customer.findUnique({
    where: {
      id: customerId,
    },
    include: {
      cart: true,
    },
  });

  if (customer)
    return res
      .status(401)
      .json({ message: "customer with the given id not found" });
  if (customer.tableId !== tableId)
    return res.status(409).json({ message: "table id desrepancy." });

  const cart = await prisma.cart.findUnique({
    where: {
      customerId,
    },
  });

  // clear cart
  await prisma.cart.deleteMany({
    where: {
      id: cart.id,
    },
  });

  const data = req.body;

  for (let i = 0; i < data.length; i++) {
    const [id, quantity] = data[i];

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
        cartId: cart.id,
        quantity,
      },
    });
  }

  return res.status(200).json({ message: "items added in cart" });
}

export default UpdateCartService;

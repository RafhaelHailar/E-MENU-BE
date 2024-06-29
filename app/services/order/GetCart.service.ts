import { Request, Response } from "express";
import prisma from "@/../prisma";

async function GetCartService(req: Request, res: Response) {
  const { customerId, tableId } = req.tableSession as Request["tableSession"];

  const customer = await prisma.customer.findUnique({
    where: {
      id: customerId,
    },
    include: {
      cart: true,
    },
  });

  if (!customer)
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

  const cartItems = await prisma.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
  });

  return res.status(200).json(cartItems);
}

export default GetCartService;

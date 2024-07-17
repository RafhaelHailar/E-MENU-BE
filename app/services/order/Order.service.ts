import { Request, Response } from "express";
import prisma from "@/../prisma";
import crypto from "crypto";

async function OrderService(req: Request, res: Response) {
  const tableNo = Number(req.tableSession.tableNo);
  const sessionId = req.tableSession.session;

  let { loyalty, name, email, contactNo, paymentMethod, items } = req.body;

  const productIds = items.map((item) => item.id);
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
    select: {
      id: true,
      price: true,
      productCategorize: {
        select: {
          category: {
            select: {
              promotionCategorize: {
                select: {
                  promotion: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (products.length === 0)
    return res.status(400).send({ message: "no item in cart." });

  const cartItems = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const productId = item.id;
    const product = products.find((product) => product.id === productId);

    if (!product)
      return res
        .status(404)
        .json({ message: "product with given id is not found!" });

    cartItems.push({ ...product, quantity: item.quantity });
  }

  const lastOrderedItem = await prisma.orders.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  const lastOrderedNo = lastOrderedItem ? lastOrderedItem.orderNo : 0;
  const transactionId = crypto.randomBytes(12).toString("hex");

  const orderNo = lastOrderedNo + 1;
  let totalAmount = 0;

  await prisma.transactions.create({
    data: {
      tableNo,
      sessionId,
      transactionId,
      loyalty,
      email,
      name,
      contactNo,
      paymentMethod,
      orderNo,
    },
  });

  // move to orders
  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];

    await prisma.orders.create({
      data: {
        tableNo,
        sessionId,
        productId: item.id,
        price: item.price,
        quantity: item.quantity,
        amount: item.price * item.quantity,
        transactionId,
        orderNo,
      },
    });

    const disount = item.productCategorize.reduce(
      (discountAmount, categorize) => {
        const discountRate = categorize.category.promotionCategorize.reduce(
          (promotionAmount, promotionCategorize) => {
            return promotionAmount + promotionCategorize.promotion.discountRate;
          },
          0,
        );

        return discountAmount + discountRate;
      },
      0,
    );

    let amount = (item.price - item.price * disount) * item.quantity;
    totalAmount += amount;
  }

  await prisma.transactions.update({
    where: {
      transactionId,
    },
    data: {
      amount: totalAmount,
    },
  });

  return res.status(200).json({ message: "cart successfully ordered" });
}

export default OrderService;

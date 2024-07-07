import { Request, Response } from "express";
import prisma from "@/../prisma";
import crypto from "crypto";
import PaymongoCheckoutService from "./PaymongoCheckout.service";

async function OrderService(req: Request, res: Response) {
  const tableNo = Number(req.tableSession.tableNo);
  const sessionId = req.tableSession.session;

  let { loyalty, name, email, contactNo, paymentMethod } = req.body;

  paymentMethod = paymentMethod || "ONLINE";

  const cartItems = await prisma.cartItem.findMany({
    where: {
      tableNo,
      sessionId,
    },
    include: {
      product: {
        include: {
          productCategorize: {
            include: {
              category: {
                include: {
                  promotionCategorize: {
                    include: {
                      promotion: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (cartItems.length === 0)
    return res.status(400).send({ message: "no item in cart." });

  // check if product really exists.
  for (let i = 0; i < cartItems.length; i++) {
    const product = cartItems[i].product;

    if (!product)
      return res
        .status(404)
        .json({ message: "product with given id is not found!" });
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
  let totalLoyalty = 0;

  // move to orders
  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    const product = item.product;

    await prisma.orders.create({
      data: {
        tableNo,
        sessionId,
        productId: product.id,
        price: product.price,
        quantity: item.quantity,
        amount: product.price * item.quantity,
        transactionId,
        orderNo,
      },
    });

    const disount = product.productCategorize.reduce(
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

    let amount = (product.price - product.price * disount) * item.quantity;
    totalAmount += amount;
    totalLoyalty += amount * 0.02; // total loyalty is 2% of the amount they bought.
  }

  await prisma.transactions.create({
    data: {
      tableNo,
      sessionId,
      amount: totalAmount,
      transactionId,
      loyalty,
      email,
      name,
      contactNo,
      paymentMethod,
      orderNo,
    },
  });

  if (loyalty) {
    await prisma.loyalty.create({
      data: {
        email,
        contactNo,
        amount: totalLoyalty,
        reference: transactionId,
      },
    });
  }

  if (paymentMethod === "ONLINE") {
    return await PaymongoCheckoutService(req, res, transactionId);
  }

  // clear cart
  await prisma.cartItem.deleteMany({
    where: {
      tableNo,
      sessionId,
    },
  });

  return res.status(200).json({ message: "cart successfully ordered" });
}

export default OrderService;

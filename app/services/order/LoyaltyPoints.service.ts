import { Transactions } from "@prisma/client";
import prisma from "prisma";

async function loyaltyPoints(transaction: Transactions) {
  if (!transaction.loyalty) return;

  await prisma.loyalty.create({
    data: {
      email: transaction.email,
      contactNo: transaction.contactNo,
      amount: transaction.amount * 0.01,
      reference: transaction.transactionId,
    },
  });
}

export default loyaltyPoints;

import Joi from "joi";
import { Transactions_paymentStatus } from "@prisma/client";

const updatePaymentStatus = {
  body: Joi.object().keys({
    transactionId: Joi.string().required(),
    status: Joi.string().valid(...Object.values(Transactions_paymentStatus)),
  }),
};

const orderValidators = {
  updatePaymentStatus,
};

export default orderValidators;

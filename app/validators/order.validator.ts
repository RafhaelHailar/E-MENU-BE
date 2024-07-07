import Joi from "joi";
import { Transactions_paymentStatus } from "@prisma/client";

const addSubCart = {
  body: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const updatePaymentStatus = {
  body: Joi.object().keys({
    transactionId: Joi.string().required(),
    status: Joi.string().valid(...Object.values(Transactions_paymentStatus)),
  }),
};

const orderValidators = {
  addSubCart,
  updatePaymentStatus,
};

export default orderValidators;

import Joi from "joi";
import { Transactions_paymentStatus } from "@prisma/client";

const addCart = {
  body: Joi.array().items(
    Joi.object()
      .keys({
        id: Joi.string().required(),
      })
      .required(),
  ),
};

const updatePaymentStatus = {
  body: Joi.object().keys({
    transactionId: Joi.string().required(),
    status: Joi.string().valid(...Object.values(Transactions_paymentStatus)),
  }),
};

const orderValidators = {
  addCart,
  updatePaymentStatus,
};

export default orderValidators;

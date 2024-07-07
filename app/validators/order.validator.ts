import Joi from "joi";
import {
  Transactions_paymentMethod,
  Transactions_paymentStatus,
} from "@prisma/client";

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

const order = {
  body: Joi.object().keys({
    loyalty: Joi.boolean(),
    name: Joi.string(),
    email: Joi.string().email(),
    contactNo: Joi.string(),
    paymentMethod: Joi.string().valid(
      ...Object.values(Transactions_paymentMethod),
    ),
  }),
};

const orderValidators = {
  addSubCart,
  updatePaymentStatus,
  order,
};

export default orderValidators;

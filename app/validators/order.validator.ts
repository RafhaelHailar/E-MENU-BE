import Joi from "joi";
import {
  Transactions_paymentMethod,
  Transactions_paymentStatus,
  Transactions_status,
} from "@prisma/client";

const addSubCart = {
  body: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const updatePaymentStatus = {
  body: Joi.object().keys({
    transactionId: Joi.string().required(),
    status: Joi.string()
      .valid(...Object.values(Transactions_paymentStatus))
      .required(),
  }),
};

const updateStatus = {
  body: Joi.object().keys({
    orderNo: Joi.number().required(),
    status: Joi.string()
      .valid(...Object.values(Transactions_status))
      .required(),
  }),
};

const order = {
  body: Joi.object().keys({
    loyalty: Joi.boolean(),
    name: Joi.string(),
    email: Joi.string().email(),
    contactNo: Joi.string(),
    paymentMethod: Joi.string()
      .valid(...Object.values(Transactions_paymentMethod))
      .required(),
  }),
};

const orderValidators = {
  addSubCart,
  updatePaymentStatus,
  updateStatus,
  order,
};

export default orderValidators;

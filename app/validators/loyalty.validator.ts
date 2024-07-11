import Joi from "joi";

const customerLogin = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const verifyCode = {
  body: Joi.object().keys({
    code: Joi.number().required(),
  }),
};

const redeem = {
  body: Joi.object().keys({
    rewardId: Joi.number().required(),
  }),
};

const loyaltyValidators = {
  customerLogin,
  verifyCode,
};

export default loyaltyValidators;

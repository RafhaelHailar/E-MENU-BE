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

const createReward = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    points: Joi.string().required(),
    image: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

const loyaltyValidators = {
  customerLogin,
  verifyCode,
  redeem,
  createReward,
};

export default loyaltyValidators;

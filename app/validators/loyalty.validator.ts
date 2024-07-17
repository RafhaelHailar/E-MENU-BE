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

const UpdateReward = {
  body: Joi.object().keys({
    rewardId: Joi.string().required(),
    name: Joi.string(),
    points: Joi.string(),
    image: Joi.string(),
    description: Joi.string(),
  }),
};

const loyaltyValidators = {
  customerLogin,
  verifyCode,
  redeem,
  createReward,
  UpdateReward,
};

export default loyaltyValidators;

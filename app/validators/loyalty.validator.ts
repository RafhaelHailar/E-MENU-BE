import Joi from "joi";

const customerLogin = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const loyaltyValidators = {
  customerLogin,
};

export default loyaltyValidators;

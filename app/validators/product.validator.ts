import Joi from "joi";

const add = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    image: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    cookingTimeInSec: Joi.number().required(),
  }),
};

const productValidators = {
  add,
};

export default productValidators;

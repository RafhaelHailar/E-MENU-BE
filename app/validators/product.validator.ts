import Joi from "joi";

const add = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    image: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    estimatedCookingTimeMin: Joi.number().required(),
  }),
};

const update = {
  body: Joi.object().keys({
    id: Joi.string().required(),
    name: Joi.string(),
    image: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    estimatedCookingTimeMin: Joi.number(),
  }),
};

const productValidators = {
  add,
  update,
};

export default productValidators;

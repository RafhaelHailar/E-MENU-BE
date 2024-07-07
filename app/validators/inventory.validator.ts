import Joi from "joi";

const add = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    category: Joi.string().required(),
  }),
};

const inventoryValidators = {
  add,
};

export default inventoryValidators;

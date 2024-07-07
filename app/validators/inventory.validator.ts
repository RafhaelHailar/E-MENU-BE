import Joi from "joi";

const addItem = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    category: Joi.string().required(),
  }),
};

const updateItem = {
  body: Joi.object().keys({
    id: Joi.string().required(),
    name: Joi.string().required(),
    category: Joi.string().required(),
  }),
};

const inventoryValidators = {
  addItem,
  updateItem,
};

export default inventoryValidators;

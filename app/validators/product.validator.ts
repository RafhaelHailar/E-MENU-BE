import Joi from "joi";

const add = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    image: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    estimatedCookingTimeMin: Joi.number().required(),
    categories: Joi.array().items(Joi.string()).required(),
    quantity: Joi.number().required(),
  }),
};

const addProductCategory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const addPromotion = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    discountRate: Joi.number().required(),
    startDate: Joi.date().iso(),
    endDate: Joi.date().iso(),
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
    quantity: Joi.number(),
  }),
};

const categorizeProduct = {
  body: Joi.object().keys({
    categoryId: Joi.string().required(),
  }),
};

const categorizePromotion = {
  body: Joi.object().keys({
    categoryId: Joi.string().required(),
  }),
};

const productValidators = {
  add,
  addProductCategory,
  addPromotion,
  update,
  categorizeProduct,
  categorizePromotion,
};

export default productValidators;

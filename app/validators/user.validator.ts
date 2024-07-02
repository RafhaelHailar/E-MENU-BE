import { roles } from "@config/roles";
import Joi from "joi";
import { password } from "./password.validator";

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    contact: Joi.string().required(),
    password: Joi.string().custom(password),
    role: Joi.string().valid(...roles),
  }),
};

const userValidators = {
  create,
};

export default userValidators;

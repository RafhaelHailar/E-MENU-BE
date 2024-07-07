import Joi from "joi";

const approve = {
  body: Joi.object().keys({
    sessionId: Joi.string().required(),
  }),
};

const tableValidators = {
  approve,
};

export default tableValidators;

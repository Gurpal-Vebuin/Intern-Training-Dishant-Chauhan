import Joi from "joi";

const joiParamsSchema = Joi.object({
  id: Joi.number().required().messages({
    "number.base": "The requested id should be a valid number.",
  }),
});

export default joiParamsSchema;

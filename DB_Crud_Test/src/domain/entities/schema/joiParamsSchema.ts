import Joi from "joi";

const joiParamsSchema = Joi.object({
  id: Joi.string()
    .regex(/^[0-9]+$/)
    .min(1)
    .required()
    .messages({
      "string.pattern.base": "The requested id should be a valid integer.",
      "any.required": "ID is required.",
      "string.min": "ID cannot be empty.",
    }),
});

export default joiParamsSchema;

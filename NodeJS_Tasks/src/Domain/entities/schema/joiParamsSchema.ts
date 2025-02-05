import Joi from "joi";

const joiParamsSchema = Joi.object({
  id: Joi.string()
    .regex(/^[0-9]+$/) // Ensures only positive integers (no decimals)
    .min(1) // Ensures the string is not empty
    .required() // Ensures the field is provided
    .messages({
      "string.pattern.base": "The requested id should be a valid integer.",
      "any.required": "ID is required.",
      "string.min": "ID cannot be empty.",
    }),
});

export default joiParamsSchema;

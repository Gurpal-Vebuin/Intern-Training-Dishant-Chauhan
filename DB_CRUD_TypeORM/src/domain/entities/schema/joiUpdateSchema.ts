import Joi from "joi";

const joiUpdateSchema = Joi.object({
  id: Joi.number().required().messages({
    "number.base": "The requested id should be a valid number.",
  }),
  name: Joi.string()
    .min(3)
    .regex(/^[a-zA-Z\s]+$/)
    .max(30)
    .messages({
      "string.base": "Name should be a string.",
      "string.empty": "Name cannot be empty.",
      "string.min": "Name should have a minimum length of 3 characters.",
      "string.max": "Name should have a maximum length of 30 characters.",
    }),
  phone: Joi.number().min(1000000000).max(9999999999).messages({
    "number.base": "Phone should be a valid number.",
    "number.min": "Phone number should be 10 digits.",
    "number.max": "Phone number should be 10 digits.",
  }),
  password: Joi.string().min(6).messages({
    "string.base": "Password should be a string.",
    "string.empty": "Password cannot be empty.",
    "string.min": "Password should have a minimum length of 6 characters.",
  }),
}).min(1);

export default joiUpdateSchema;

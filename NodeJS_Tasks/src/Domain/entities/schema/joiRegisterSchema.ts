import Joi from "joi";

const joiRegisterSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .regex(/^[a-zA-Z\s]+$/)
    .max(30)
    .required()
    .messages({
      "string.base": "Name should be a string.",
      "string.empty": "Name cannot be empty.",
      "string.min": "Name should have a minimum length of 3 characters.",
      "string.max": "Name should have a maximum length of 30 characters.",
      "any.required": "Name is required.",
    }),
  email: Joi.string().email().required().messages({
    "string.base": "Email should be a string.",
    "string.empty": "Email cannot be empty.",
    "string.email": "Email must be a valid email address.",
    "any.required": "Email is required.",
  }),
  phone: Joi.number().min(1000000000).max(9999999999).required().messages({
    "number.base": "Phone should be a valid number.",
    "number.min": "Phone number should be 10 digits.",
    "number.max": "Phone number should be 10 digits.",
    "any.required": "Phone is required.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "Password should be a string.",
    "string.empty": "Password cannot be empty.",
    "string.min": "Password should have a minimum length of 6 characters.",
    "any.required": "Password is required.",
  }),
  roles: Joi.string().required(),
});

export default joiRegisterSchema;
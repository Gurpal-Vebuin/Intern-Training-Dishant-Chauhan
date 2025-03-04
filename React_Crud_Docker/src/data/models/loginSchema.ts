import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "any.required": "Email required. | メールが必要。 | ईमेल आवश्यक।",
      "string.email": "Invalid email. | 無効なメール。 | अमान्य ईमेल।",
      "string.base":
        "Must be a string. | 文字列である必要。 | स्ट्रिंग होनी चाहिए।",
    }),
  password: Joi.string().min(8).required().messages({
    "any.required": "Password required. | パスワードが必要。 | पासवर्ड आवश्यक।",
    "string.base":
      "Must be a string. | 文字列である必要。 | स्ट्रिंग होनी चाहिए।",
  }),
});

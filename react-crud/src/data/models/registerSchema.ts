import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-z\s\u0900-\u097F\u3040-\u30FF]+$/)
    .required()
    .messages({
      "any.required": "Name is required. | 名前が必要です。 | नाम आवश्यक है।",
      "string.base":
        "Must be a string. | 文字列である必要があります。 | स्ट्रिंग होनी चाहिए।",
      "string.pattern.base":
        "Only letters allowed. | 文字のみ可。 | केवल अक्षर।",
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "any.required": "Email required. | メールが必要。 | ईमेल आवश्यक।",
      "string.email": "Invalid email. | 無効なメール。 | अमान्य ईमेल।",
      "string.base":
        "Must be a string. | 文字列である必要。 | स्ट्रिंग होनी चाहिए।",
    }),
  phone: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      "any.required": "Phone required. | 電話が必要。 | फोन आवश्यक।",
      "string.pattern.base": "10 digits only. | 10桁のみ。 | केवल 10 अंक।",
    }),
  password: Joi.string().min(8).required().messages({
    "any.required": "Password required. | パスワードが必要。 | पासवर्ड आवश्यक।",
    "string.min": "Min 8 chars. | 最低8文字。 | कम से कम 8 अक्षर।",
    "string.base":
      "Must be a string. | 文字列である必要。 | स्ट्रिंग होनी चाहिए।",
  }),
  roles: Joi.string().valid("user", "admin").required().messages({
    "any.required": "Role required. | 役割が必要。 | भूमिका आवश्यक।",
    "any.only":
      "'User' or 'Admin'. | 「ユーザー」または「管理者」。 | 'यूजर' या 'एडमिन'।",
  }),
});

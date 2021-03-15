const Joi = require("joi");
const { HttpCode } = require("../../../helpers/constants");

const schemaRegister = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  subscription: Joi.string(),
  password: Joi.string().required(),
  token: Joi.string().allow(null, ""),
});
const schemaLogin = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().required(),
});
const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    console.log(error.details[0].path);
    return next({
      status: HttpCode.BAD_REQUEST,
      message: `missing required ${error.details[0].path} field`,
    });
  }
  next();
};

module.exports.create = (req, res, next) => {
  return validate(schemaRegister, req.body, next);
};
module.exports.login = (req, res, next) => {
  return validate(schemaLogin, req.body, next);
};
module.exports.uploadAvatar = (req, res, next) => {
  if (!req.file) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      data: "Bad request",
      message: "Field of avatar with file not found",
    });
  }
  next();
};

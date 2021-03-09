const Joi = require("joi");

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
      status: 400,
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

const Joi = require("joi");
const BaseMiddleware = require("./base");

class UserMiddleware extends BaseMiddleware {
  validateLogin(ctx, next) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required().messages({
        "string.base": "Your Email Must Be Simple Text",
        "string.email": "Invalid Format For Email Address",
        "any.required": "Complete Your Email Address",
      }),
      password: Joi.string().min(8).required().messages({
        "string.base": "Your Password Must Be Simple Text",
        "string.min": "Your Password Must Contain At Least 8 Character",
        "any.required": "Complete Your Password",
      }),
    });
    const schemaValidation = UserMiddleware.checkError(
      schema,
      ctx.request.body
    );
    if (schemaValidation.hasError) {
      ctx.status = 400;
      ctx.body = {
        message: "BadRequestException",
        errors: schemaValidation.messages,
      };
      return ctx;
    }
    return next();
  }

  validateSignup(ctx, next) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required().messages({
        "string.base": "Your Email Must Be Simple Text",
        "string.email": "Invalid Format For Email Address",
        "any.required": "Complete Your Email Address",
      }),
      password: Joi.string().min(8).required().messages({
        "string.base": "Your Password Must Be Simple Text",
        "string.min": "Your Password Must Contain At Least 8 Character",
        "any.required": "Complete Your Password",
      }),
      username: Joi.string().min(3).required().messages({
        "string.base": "Your Username Must Be Text",
        "string.min": "Your Username Must Contain At Least 8 Character",
        "any.required": "You Must Complete Your Username",
      }),
    });
  }
}

module.exports = UserMiddleware;

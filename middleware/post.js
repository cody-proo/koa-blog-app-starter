const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

class PostMiddleware {
  async checkObjectId(ctx, next) {
    const errors = Joi.object()
      .keys({
        id: Joi.objectId()
          .required()
          .messages({ "string.pattern.name": "Invalid Posts Entered" }),
      })
      .validate(ctx.request.params)?.error;
    if (errors?.details?.length > 0) {
      const errorMessages = errors.details.map((detail) => ({
        message: detail.message,
      }));
      ctx.status = 400;
      ctx.body = { errors: errorMessages };
      return ctx;
    }
    return next();
  }
}

module.exports = PostMiddleware;

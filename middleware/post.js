const Joi = require("joi");
const BaseMiddleware = require("./base");
Joi.objectId = require("joi-objectid")(Joi);

class PostMiddleware extends BaseMiddleware {
  checkObjectId(ctx, next) {
    const schema = Joi.object().keys({
      id: Joi.objectId()
        .required()
        .messages({ "string.pattern.name": "Invalid Posts Entered" }),
    });

    const errors = PostMiddleware.checkError(schema, ctx.request.params);

    if (errors.hasError) {
      ctx.status = 400;
      ctx.body = { message: "BadRequestException", errors: errors.messages };
      return ctx;
    }
    return next();
  }

  validateCreatePost(ctx, next) {
    const schema = Joi.object().keys({
      title: Joi.string().min(3).required().messages({
        "string.required": "Complete Your Title",
        "string.base": "Title Must Be Text",
        "string.min": "Your Title Must Contain AtLeast 3 Character",
        "any.required": "You Must Complete Your Title",
      }),
      description: Joi.string().min(3).required().messages({
        "string.required": "Complete Your Description",
        "string.base": "Description Must Be Text",
        "string.min": "Your Description Must Contain AtLeast 3 Character",
        "any.required": "You Must Complete Your Description",
      }),
    });

    const createPostValidateErr = PostMiddleware.checkError(
      schema,
      ctx.request.body
    );

    if (createPostValidateErr.hasError) {
      ctx.status = 400;
      ctx.body = {
        message: "BadRequestException",
        errors: createPostValidateErr.messages,
      };
      return ctx;
    }

    return next();
  }
}

module.exports = PostMiddleware;

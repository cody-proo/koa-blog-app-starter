class BaseMiddleware {
  static checkError(schema, body) {
    const errors = schema.validate(body, { abortEarly: false })?.error;
    if (errors?.details?.length > 0) {
      const errorMessages = errors.details.map((detail) => ({
        message: detail.message,
      }));
      return { hasError: true, messages: errorMessages };
    }

    return { hasError: false };
  }
}

module.exports = BaseMiddleware;

const jwt = require("jsonwebtoken");

class AuthMiddleware {
  checkAuth(ctx, next) {
    const tokenHeader = ctx.request.get("authorization");
    const token = tokenHeader.split("Bearer ").at(-1);
    const decodedToken = jwt.decode(token);
    if (!tokenHeader || !token || decodedToken.exp * 1000 < Date.now()) {
      ctx.status = 401;
      ctx.body = { message: "UnAuthorization" };
      return ctx;
    }
    ctx.request.user = decodedToken.id;
    return next();
  }
}

module.exports = AuthMiddleware;

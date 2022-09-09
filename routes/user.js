const UserController = require("../controllers/user");
const UserMiddleware = require("../middleware/user");

class UserRouter {
  constructor(app) {
    this.app = app;
    this.controller = new UserController();
    this.middleware = new UserMiddleware();
  }

  configs() {
    this.app.post("/users/signup", this.controller.signup);
    this.app.post(
      "/users/login",
      this.middleware.validateLogin,
      this.controller.login
    );
  }
}

module.exports = UserRouter;

const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  async login(ctx) {
    const { email, password } = ctx.request.body;
    const user = await UserModel.findOne({ email }).select("email").lean();
    if (!user) {
      ctx.status = 404;
      ctx.body = { message: "User Not Found" };
      return ctx;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      ctx.status = 404;
      ctx.body = { message: "User Not Found" };
      return ctx;
    }
    const token = jwt.sign({ id: user._id }, "supersecretkey", {
      expiresIn: "24h",
    });
    ctx.status = 200;
    ctx.body = { token };
    return ctx;
  }

  async signup(ctx) {
    const { username, email, password } = ctx.request.body;
    const usernameOrEmailTaken = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (usernameOrEmailTaken) {
      ctx.status = 400;
      ctx.body = { message: "This Email Or Username is Already Taken" };
      return ctx;
    }
    const hashPassword = await bcrypt.hash(password, 8);
    const user = new UserModel({ email, username, password: hashPassword });
    await user.save();
    const token = jwt.sign({ id: user._id }, "supersecretkey", {
      expiresIn: "24h",
    });
    ctx.status = 201;
    ctx.body = { token };
    return ctx;
  }
}

module.exports = UserController;

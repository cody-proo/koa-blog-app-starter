const PostController = require("../controllers/post");
const PostMiddleware = require("../middleware/post");
// const Joi = require("joi");
// Joi.objectId = require("joi-objectid")(Joi);

class PostRouter {
  constructor(app) {
    this.app = app;
    this.controller = new PostController();
    this.middleware = new PostMiddleware();
  }

  async configs() {
    // ALL POSTS
    this.app.get("/posts", this.controller.getAllPosts);

    // SINGLE POST
    this.app.get(
      "/posts/:id",
      this.middleware.checkObjectId,
      this.controller.getSinglePost
    );
  }
}

module.exports = PostRouter;

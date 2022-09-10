const PostController = require("../controllers/post");
const AuthMiddleware = require("../middleware/auth");
const PostMiddleware = require("../middleware/post");

class PostRouter {
  constructor(app) {
    this.app = app;
    this.controller = new PostController();
    this.middleware = new PostMiddleware();
    this.authMiddleware = new AuthMiddleware();
  }

  configs() {
    // ALL POSTS
    this.app.get("/posts", this.controller.getAllPosts);

    // SINGLE POST
    this.app.get(
      "/posts/:id",
      this.middleware.checkObjectId,
      this.controller.getSinglePost
    );

    // CREATE POST
    this.app.post(
      "/posts",
      this.authMiddleware.checkAuth,
      this.middleware.validateCreatePost,
      this.controller.createPost
    );
  }
}

module.exports = PostRouter;

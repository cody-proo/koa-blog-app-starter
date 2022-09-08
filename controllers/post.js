const PostModel = require("../models/post");

class PostController {
  async getAllPosts(ctx) {
    const posts = await PostModel.find({})
      .select("_id title description author")
      .lean();
    ctx.status = 200;
    return (ctx.body = { posts });
  }

  async getSinglePost(ctx) {
    const postId = ctx.params.id;
    const post = await PostModel.findById(postId)
      .select("_id title description author")
      .lean();
    if (!post) {
      ctx.status = 404;
      return (ctx.body = { message: "Invalid Post ID" });
    }
    ctx.status = 200;
    return (ctx.body = { message: "Single Post Retreive Serves" });
  }
}

module.exports = PostController;

const PostModel = require("../models/post");
const UserModel = require("../models/user");

class PostController {
  async getAllPosts(ctx) {
    const posts = await PostModel.find({})
      .populate({
        path: "author",
        model: "user",
        populate: { path: "posts", model: "post" },
      })
      .select("_id title description author")
      .lean();
    ctx.status = 200;
    return (ctx.body = { posts });
  }

  async getSinglePost(ctx) {
    const postId = ctx.params.id;
    const post = await PostModel.findById(postId)
      .populate({
        path: "author",
        model: "user",
        populate: { path: "posts", model: "post" },
      })
      .select("_id title description author")
      .lean();
    if (!post) {
      ctx.status = 404;
      return (ctx.body = { message: "Invalid Post ID" });
    }
    ctx.status = 200;
    return (ctx.body = { post });
  }

  async createPost(ctx) {
    const authorId = ctx.request.user;
    const { title, description } = ctx.request.body;
    const isTitleTaken = await PostModel.findOne({ title })
      .select("_id")
      .lean();
    if (isTitleTaken) {
      ctx.status = 400;
      ctx.body = { message: "This Title is already Taken" };
      return ctx;
    }
    const newPost = new PostModel({
      title,
      description,
      author: authorId,
    });
    await newPost.save();
    await UserModel.findByIdAndUpdate(authorId, {
      $push: {
        posts: newPost._id,
      },
    });
    ctx.status = 201;
    ctx.body = { message: "Post Create Successfully", post: newPost };
    return ctx;
  }
}

module.exports = PostController;

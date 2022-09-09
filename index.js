const Koa = require("koa");
const KoaRouter = require("koa-router");
require("dotenv").config();
const mongoose = require("mongoose");
const koaJSON = require("koa-json");
const PostsRouter = require("./routes/post");
const koaBodyParser = require("koa-bodyparser");

const app = new Koa();
const router = new KoaRouter({ prefix: "/api", sensitive: true });

app.use(koaJSON());
app.use(koaBodyParser());

new PostsRouter(router).configs();

app.use(router.routes()).use(router.allowedMethods());

mongoose.connect(process.env.DB_URL);
mongoose.connection.on("open", () => {
  console.log("The Database Running ...");
});

app.listen(process.env.PORT, () => {
  console.log(`The Server is Running At ${process.env.PORT}`);
});

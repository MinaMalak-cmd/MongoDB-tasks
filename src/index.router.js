import connectDB from "../DB/connection.js";
import userRouter from "./modules/user/user.router.js";
import postRouter from "./modules/post/post.router.js";

const bootstrap = async (app, express) => {
  console.log("🚀 ~ file: index.router.js:6 ~ bootstrap ~ app:", app)
  app.use(express.json()); // convert buffer data

  // Database connection and seeding
  await connectDB();

  //Setup App Routing
  app.use("/user", userRouter);
  app.use("/post", postRouter);
  app.use("*", (req, res, next) => {
    return res.json({ message: "In-valid Routing" });
  });
};

export default bootstrap;

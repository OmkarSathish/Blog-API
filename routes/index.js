import { Router } from "express";
import blogRouter from "./blogRouter.js";
import userRouter from "./user.js";
const router = Router();

router.get("/", (req, res) => {
  return res
    .status(200)
    .json({
      message: "access user/browser routes by appending /user or /blog",
    });
});

router.use("/user", userRouter);
router.use("/blog", blogRouter);

export default router;

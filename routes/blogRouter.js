import { Router } from "express";
import verifyCookie from "../middlewares/verifyCookie.js";
import {
  zodValidateNewBlog,
  ZodValidateUpdateBlogInfo,
} from "../middlewares/validations/blog.js";
import {
  disposeBlog,
  getAllBlogs,
  getSpecificBlogs,
  handleNewBlog,
  updateBlog,
} from "../controllers/blog.js";

const router = Router();

router.post("/new", verifyCookie, zodValidateNewBlog, handleNewBlog);

router.get("/all", verifyCookie, getAllBlogs);

router.get("/all/:authorId", verifyCookie, getSpecificBlogs);

router.put(
  "/edit/:blogId",
  verifyCookie,
  ZodValidateUpdateBlogInfo,
  updateBlog
);

router.delete("/dispose/:blogId", verifyCookie, disposeBlog);

export default router;

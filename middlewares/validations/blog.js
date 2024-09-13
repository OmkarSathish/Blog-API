import { z } from "zod";

const blogSchema = z.object({
  title: z.string().min(4).max(512),
  content: z.string().min(4),
});

export const zodValidateNewBlog = (req, res, next) => {
  try {
    const { error } = blogSchema.safeParse(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateBlogSchema = z.object({
  title: z.string().min(4).max(512).optional(),
  content: z.string().min(4).optional(),
});

export const ZodValidateUpdateBlogInfo = (req, res, next) => {
  try {
    const { error } = updateBlogSchema.safeParse(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

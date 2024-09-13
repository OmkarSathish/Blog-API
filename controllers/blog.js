import Blog from "../models/blog.js";

export const handleNewBlog = async (req, res) => {
  try {
    const { userId } = req;

    const { title, content } = req.body;

    const blog = new Blog({ title, content, authorId: userId });
    await blog.save();

    return res.status(201).json({ message: blog._id });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});

    return res.status(200).json({ blogs });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSpecificBlogs = async (req, res) => {
  try {
    const { authorId } = req.params;

    const blogs = await Blog.find({ authorId });

    return res.status(200).json({ message: blogs });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { userId } = req;
    const { blogId } = req.params;
    const { title = undefined, content = undefined } = req.body;

    const updatedBlogInfo = {};

    if (title) {
      updatedBlogInfo["title"] = title;
    }

    if (content) {
      updatedBlogInfo["content"] = content;
    }

    let blog = await Blog.findById(blogId);
    if (String(blog.authorId) !== userId) {
      return res.status(403).json({ message: "Unauthorized Action" });
    }

    blog = await Blog.findByIdAndUpdate(blogId, updatedBlogInfo, {
      new: true,
    });

    return res.status(200).json({ message: blog });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const disposeBlog = async (req, res) => {
  try {
    const { userId } = req;
    const { blogId } = req.params;

    let blog = await Blog.findById(blogId);
    if (String(blog.authorId) !== userId) {
      return res.status(403).json({ message: "Unauthorized Action" });
    }

    blog = await Blog.findByIdAndDelete(blogId);

    return res.status(200).json({ message: "Blog deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

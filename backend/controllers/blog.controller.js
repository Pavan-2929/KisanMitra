import mongoose from "mongoose";
import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";
import deleteCloudinaryFile from "../utils/deleteCloudinaryFile.js";

//Adding New Blog
export const addNewBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.headers.userid;

    if (!title || !description || !userId) {
      return res
        .status(400)
        .json({ message: "Please provide all required field!" });
    }

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    const imageUrl = req.files.map((file) => file.path);

    const newBlog = new Blog({
      title,
      description,
      image: imageUrl,
      author: userId,
    });

    await newBlog.save();

    existingUser.blogs.push(newBlog._id);
    await existingUser.save();

    return res.status(200).json({ message: "Your blog created successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Blog details retrieve by blogId.
export const getBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ message: "Invalid blog Id!" });
    }

    const blog = await Blog.findById(blogId)
      .populate({
        path: "comments.user",
        select: "fullName",
      })
      .populate({
        path: "author",
        select: "fullName",
      });

    if (!blog) {
      return res.status(404).json({ message: "Blog not exist!" });
    }

    return res
      .status(200)
      .json({ message: "Blog retrieved successfully!", blog });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//All Blogs details retrieved.
export const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find({})
      .populate({
        path: "author",
        select: "-password",
      })
      .sort({ createdAt: -1 });

    return res
      .status(200)
      .json({ message: "All Blogs retrieved successfully!", allBlogs });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Blog Remove from databse by it's id
export const removeBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ message: "Invalid Blog Id!" });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found!" });
    }

    await User.findByIdAndUpdate(blog.author, {
      $pull: { blogs: blog._id },
    });

    if (blog?.image && blog.image.length > 0) {
      await Promise.all(
        blog.image.map((imgUrl) => deleteCloudinaryFile(imgUrl))
      );
    }

    await Blog.findByIdAndDelete(blogId);

    return res.status(200).json({ message: "Blog deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Blog details updated
export const updateBlog = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const { blogId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ message: "Invalid blog Id!" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { $set: { title, description, image } },
      { new: true }
    ).populate({
      path: "author",
      select: "-password",
    });

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found!" });
    }

    return res
      .status(200)
      .json({ message: "Blog updated successfully!", blog: updateBlog });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Toggle blog like or unlike
export const toggleBlogLike = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { userId } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(blogId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(400).json({ message: "Invalid blogId or userId!" });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found!" });
    }

    const hasLiked = blog.likes.includes(userId);

    if (hasLiked) {
      blog.likes = blog.likes.filter((id) => id.toString() !== userId);
    } else {
      blog.likes.push(userId);
    }

    await blog.save();

    return res.status(200).json({
      message: hasLiked ? "Blog unliked!" : "Blog liked!",
      likes: blog.likes, // <-- send the array, not just the count
    });
  } catch (error) {
    return res.status(500).json({ message: "Interval server error!" });
  }
};

//Add Comment on blog
export const commentToBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { userId, text } = req.body;
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ message: "Invalid blog Id!" });
    }
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found!" });
    }
    console.log("Adding comment to blog:", blogId, userId, text);

    blog.comments.push({ user: userId, text });
    await blog.save();

    return res.status(200).json({
      message: "Comment added successfully!",
      comments: blog.comments,
    });
  } catch (error) {
    return res.status(500).json({ message: "Interval server error!" });
  }
};

//Remove comment from blog
export const removeComment = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { commentId } = req.body;

    if (!blogId || !commentId) {
      return res
        .status(400)
        .json({ message: "BlogId or commentId are required!" });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found!" });
    }

    const updatedComments = blog.comments.filter(
      (comment) => comment._id.toString() !== commentId
    );

    if (updatedComments.length == blog.comments.length) {
      return res.status(404).json({ message: "Comment not found!" });
    }

    blog.comments = updatedComments;
    await blog.save();
    return res.status(200).json({
      message: "Comment deleted successfully!",
      comments: blog.comments,
    });
  } catch (error) {
    return res.status(500).json({ message: "Interval server error!" });
  }
};

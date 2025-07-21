import express from "express";
import {
  addNewBlog,
  commentToBlog,
  getAllBlogs,
  getBlog,
  toggleBlogLike,
  removeBlog,
  removeComment,
  updateBlog,
} from "../controllers/blog.controller.js";
import upload from "../config/multerConfig.js";

const router = express.Router();

router.route("/add-new-blog").post(upload.array("files", 5), addNewBlog);
router.route("/get-blog/:blogId").get(getBlog);
router.route("/get-all-blogs").get(getAllBlogs);
router.route("/remove-blog/:blogId").delete(removeBlog);
router.route("/update-blog/:blogId").post(updateBlog);
router.route("/:blogId/togglelike").post(toggleBlogLike);
router.route("/:blogId/add-comment").post(commentToBlog);
router.route("/:blogId/remove-comment").delete(removeComment);

export default router;

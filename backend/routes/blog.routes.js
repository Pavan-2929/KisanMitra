import express from "express";
import {
  addNewBlog,
  commentToBlog,
  getAllBlogs,
  getBlog,
  likeBlog,
  removeBlog,
  removeComment,
  unlikeBlog,
  updateBlog,
} from "../controllers/blog.controller.js";

const router = express.Router();

router.route("/add-new-blog").post(addNewBlog);
router.route("/get-blog/:id").get(getBlog);
router.route("/get-all-blogs").get(getAllBlogs);
router.route("/remove-blog/:id").delete(removeBlog);
router.route("/update-blog/:id").put(updateBlog);
router.route("/:id/like").put(likeBlog);
router.route("/:id/unlike").put(unlikeBlog);
router.route("/:id/add-comment").put(commentToBlog);
router.route("/:id/remove-comment").put(removeComment);

export default router;

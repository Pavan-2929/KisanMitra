import express from "express";
import {
  addReview,
  getReview,
  updateReview,
} from "../controllers/review.controller.js";
const router = express.Router();

router.route("/add-review").post(addReview);
router.route("/get-review/:cropId").get(getReview);
router.route("/update-review/:reviewId").get(updateReview);

export default router;

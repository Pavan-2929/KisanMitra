import mongoose from "mongoose";
import Review from "../models/review.model.js";

export const addReview = async (req, res) => {
  try {
    const { userId, rating, comment } = req.body;
    const { cropId } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(cropId)
    ) {
      return res.status(400).json({ message: "Invalid userId or cropId!" });
    }

    if (!rating) {
      return res
        .status(200)
        .json({ message: "Please provide required field!" });
    }

    const newReview = new Review({
      user: userId,
      crop: cropId,
      rating,
      comment,
    });
    await newReview.save();

    return res.status(200).json({ message: "Review added successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const getReview = async (req, res) => {
  try {
    const { cropId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(cropId)) {
      return res.status(400).json({ message: "Invalid cropId!" });
    }

    const reviews = await Review.find({ crop: cropId }).populate(
      "user",
      "fullName profile categories"
    );

    if (reviews.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No reviews found for this crop." });
    }

    return res
      .status(200)
      .json({ message: "Reviews retreived successfully!", reviews });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { userId, rating, comment } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(reviewId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(400).json({ message: "Invalid reviewId or userId!" });
    }

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found!" });
    }

    if (review.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this review!" });
    }

    if (rating && (rating < 1 || rating > 5)) {
      return res
        .status(400)
        .json({ success: false, message: "Rating must be between 1 and 5!" });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    review.save();

    return res
      .status(200)
      .json({ message: "Review updated successfully!", review });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

import express from "express";
import {
  addNewCrop,
  getCrop,
  getCrops,
  removeCrop,
  updateCrop
} from "../controllers/crop.controller.js";
import { uploadCropImages } from "../middlewares/cloudinary.js";

const router = express.Router();

router.post("/add-new-crop",
  //  isLoggedIn, isFarmer, uploadCropImages, 
  addNewCrop);
router.route("/get-crop/:id").get(getCrop);
router.route("/update-crop/:id").put(updateCrop);
router.route("/get-all-crops/:id").get(getCrops);
router.route("/remove-crop/:id").delete(removeCrop);

export default router;

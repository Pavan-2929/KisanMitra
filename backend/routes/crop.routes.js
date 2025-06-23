import express from "express";
import {
  addNewCrop,
  getCrop,
  getCrops,
  removeCrop,
  updateCrop,
} from "../controllers/crop.controller.js";
import upload from "../config/multerConfig.js";

const router = express.Router();

router.route("/add-new-crop").post(upload.array("files", 5), addNewCrop);
router.route("/get-crop/:id").get(getCrop);
router.route("/update-crop/:id").put(upload.array("files", 5), updateCrop);
router.route("/get-all-crops").get(getCrops);
router.route("/remove-crop/:id").delete(removeCrop);

export default router;

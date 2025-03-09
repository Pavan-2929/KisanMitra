import express from "express";
import {
  addNewCrop,
  getCrop,
  getCrops,
  removeCrop,
  updateCrop,
} from "../controllers/crop.controller.js";

const router = express.Router();

router.route("/add-new-crop").post(addNewCrop);
router.route("/get-crop/:id").get(getCrop);
router.route("/update-crop/:id").put(updateCrop);
router.route("/get-all-crops").get(getCrops);
router.route("/remove-crop/:id").delete(removeCrop);

export default router;

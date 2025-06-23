import express from "express";
import {
  addQuery,
  getAllQuery,
  getQuery,
  queryAnswered,
  removeQuery,
} from "../controllers/query.controller.js";
const router = express.Router();

router.route("/ask-query").post(addQuery);
router.route("/answer-query/:queryId").post(queryAnswered);
router.route("/get-all-query").get(getAllQuery);
router.route("/get-query").get(getQuery);
router.route("/remove-query/:queryId").delete(removeQuery);

export default router;

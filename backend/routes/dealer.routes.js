import express from "express";

import { createProposal, getNearByCrops, createDeal, getDetailsOfInterestedDealers } from "../controllers/dealer.controller.js";
const router = express.Router();


// **************************** Dealer Routes **************************

router.post("/deal/create-proposal", createProposal);
router.post('/get-nearby-crops', getNearByCrops);
router.post("/get-interested-dealers", getDetailsOfInterestedDealers);
router.post('/deal/create-deal', createDeal)

export default router;
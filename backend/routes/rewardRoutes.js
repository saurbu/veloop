import express from "express";
import {
  convertReward,
  claimReward,
  getRewards
} from "../controllers/rewardController.js";

const router = express.Router();

router.get("/", getRewards);
router.post("/convert", convertReward);
router.post("/claim", claimReward);

export default router;
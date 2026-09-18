import express from "express";
import {
  getBalance,
  addGems,
  addVEs,
  getTransactions
} from "../controllers/balanceController.js";

const router = express.Router();

router.get("/", getBalance);
router.get("/transactions", getTransactions);
router.post("/gems", addGems);
router.post("/ves", addVEs);

export default router;
import express from "express";
import {
  convertGemsToVEs,
  convertVEsToGems
} from "../controllers/conversionController.js";

const router = express.Router();

router.post("/gems-to-ves", convertGemsToVEs);
router.post("/ves-to-gems", convertVEsToGems);

export default router;
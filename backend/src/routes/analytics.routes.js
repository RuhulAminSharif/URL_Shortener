import express from "express";
import {
  getUrlsAnalytics,
  getUrlDetails,
} from "../controller/analytics.controller.js";

const router = express.Router();

router.get("/urls", getUrlsAnalytics );
router.get("/url/:shortId", getUrlDetails );


export default router;

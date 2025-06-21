import express from "express";
import generatePodcastScript from "../controllers/podcast.controller.js";
import upload from "../middlewares/multer.middleware.js";
import parsePdf from "../middlewares/pdfParse.middleware.js";
import { quiz } from "../controllers/quiz.controller.js";

const router = express.Router();

// router.get("/prompt", promptController);
router.post("/podcast", generatePodcastScript);

router.post("/quiz", upload.single("file"), parsePdf, quiz);

//router.post("/quiz", quiz);

export default router;

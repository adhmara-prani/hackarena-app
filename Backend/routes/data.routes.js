import express from "express";
import upload from "../middlewares/multer.middleware.js";
import parsePdf from "../middlewares/pdfParse.middleware.js";
import { quiz } from "../controllers/quiz.controller.js";
import textToSpeech from "../controllers/summarized.controller.js";
import generatePodcastDialog from "../controllers/podcast.controller.js";

const router = express.Router();

// router.get("/prompt", promptController);

// router.get("/prompt", promptController);
router.post("/textToSpeech", textToSpeech);
router.post("/podcast",upload.single("file"), parsePdf, generatePodcastDialog);

router.post("/quiz", upload.single("file"), parsePdf, quiz);

export default router;

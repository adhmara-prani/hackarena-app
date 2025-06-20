import express from "express";
import textToSpeech from "../controllers/summarized.controller.js";
import generatePodcastDialog from "../controllers/podcast.controller.js";

const router = express.Router();

 // router.get("/prompt", promptController);
router.post("/textToSpeech",textToSpeech );
router.post("/podcast" ,generatePodcastDialog)

  //router.post("/quiz", quiz);

export default router;

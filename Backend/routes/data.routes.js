import express from "express";
import generatePodcastScript from "../controllers/podcast.controller.js";

const router = express.Router();

 // router.get("/prompt", promptController);
router.post("/podcast",generatePodcastScript );
  //router.post("/quiz", quiz);

export default router;

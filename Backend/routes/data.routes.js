import express from "express";

const router = express.Router();

router.get("/prompt", promptController);
router.post("/podcast", podcast);
router.post("/quiz", quiz);

export default router;

import { GoogleGenerativeAI } from "@google/generative-ai";

export const quiz = (req, res) => {
  console.log("Hurray, pdfFile uploaded!");
  if (!req.file.path || !req.file)
    return res.status(400).json({ message: "No file found to generate quiz!" });

  res.json(req.file);
};

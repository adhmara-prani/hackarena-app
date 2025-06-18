import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generatePodcastScript = async (req, res, next) => {
  const { prompt, pdfData } = req.body;

  if (!prompt || !pdfData) {
    return res.status(400).json({ error: "Prompt and PDF Content are required" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(
      `You're writing a podcast script for two friendly hosts named Alex and Sam.

Topic: ${prompt}

Structure:
- Introduction (both greet and introduce the topic)
- Main Body (they explain it together through a natural back-and-forth conversation)
- Conclusion (they wrap up positively)

Respond with only an array of objects like this:
[
  { "speaker": "Alex", "text": "Hey everyone, welcome to the podcast!" },
  { "speaker": "Sam", "text": "Today we’re talking about..." }
]

Make it friendly, fun, and informative. Avoid technical jargon. No headings or extra explanation.`
    );

    const response = await result.response;
    const text = response.text();

    // Try parsing the text directly as JSON
    let scriptArray;
    try {
      scriptArray = JSON.parse(text);
    } catch (jsonError) {
      console.error("Failed to parse Gemini output as JSON:", jsonError);
      return res.status(500).json({ error: "Gemini output was not valid JSON." });
    }

    res.json({ script: scriptArray });

  } catch (error) {
    console.log("Gemini error:", error);
    res.status(500).json({ error: "Failed to generate a podcast script" });
  }
};

export default generatePodcastScript;

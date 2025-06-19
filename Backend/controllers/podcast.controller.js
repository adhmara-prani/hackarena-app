import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generatePodcastScript = async (req, res, next) => {
  const { prompt, pdfData } = req.body;

  if (!prompt || !pdfData) {
    return res.status(400).json({ error: "Prompt and PDF Content are required" });
  }

  try {
    // Step 1: Get script from Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(
      `You're writing a podcast script. Write it so that a person with dyslexia or adhd can pay attention without getting overwhelmed

Topic: ${prompt}

Structure:
- Introduction (greet and introduce the topic)
- Main Body (explain it through a natural conversation)
- Conclusion (wrap up positively)

Make it friendly, fun, and informative. Avoid technical jargon. No headings or extra explanation.this script will be fed to a tts service, hence, return in a text only format without any effects like[drumroll]`
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
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate podcast audio." });
  }
};

export default generatePodcastScript;

  

// //  return res.json({
//         script:scriptArray,
//          audioUrl: voiceResponse.data.audioFile

//       })



//  const fullScript = scriptArray.map(line => `${line.speaker}: ${line.text}`).join(" ");
//     const voiceResponse = await axios.post(
//   'https://api.murf.ai/v1/speech/generate',
//   {
//     text: fullScript,
//      style: "Angry",
//      voiceId: "en-US-ken", // ✅ Valid voice_id from Murf's actual voice list
//   },
//   {
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       "api-key": process.env.MURF_API_KEY,
//     },
//   }
// );

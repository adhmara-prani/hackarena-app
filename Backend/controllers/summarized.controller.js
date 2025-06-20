import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Replace this with your actual Murf TTS API endpoint and key
const MURF_API_URL = "https://api.murf.ai/v1/speech/generate"; // Example


const  textToSpeech = async (req, res, next) => {
  const { prompt, pdfData } = req.body;

  if (!prompt &&  !pdfData) {
    return res.status(400).json({ error: "Prompt and PDF Content are required" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    let contentToSummarize = "";

    if (prompt && pdfData) {
      contentToSummarize = `Topic: ${prompt}\n\nContent:\n${pdfData}`;
    } else if (prompt) {
      contentToSummarize = `Topic to summarize:\n${prompt}`;
    } else {
      contentToSummarize = `Content:\n${pdfData}`;
    }


      const result = await model.generateContent(`
You are an AI assistant that summarizes academic or informational text.

Please summarize the following content into a clear and concise explanation. Break the content into short, easy-to-understand paragraphs. Each paragraph should be complete and self-contained.

Avoid complex jargon and use a friendly tone. Don't include titles, lists, or markdown formatting.

${contentToSummarize}

Output format: Plain text only. Separate paragraphs with double newlines.
    `);

    const response = await result.response;
    const text = response.text();

    // Split paragraphs based on double newlines
    const paragraphs = text.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);

    const audioResults = [];

    // Generate TTS audio for each paragraph
   for (const paragraph of paragraphs) {
  try {
    const ttsResponse = await axios.post(
      MURF_API_URL,
      {
        text: paragraph,
        voiceId: "en-US-natalie", // Replace with valid Murf voice ID
        
      },
      {
        headers: {
          "api-key":process.env.murf_api_key ,
          "Content-Type": "application/json",
        },
      }
    );
   
    const { audioFile } = ttsResponse.data;

    audioResults.push({
      paragraph,
      audioFile,
    });

  } catch (ttsErr) {
    console.error("Murf TTS error:", ttsErr.response?.data || ttsErr.message);

    audioResults.push({
      paragraph,
      audioUrl: null,
      error: "TTS failed",
    });
  }
}

    res.json({ scriptAudio: audioResults });

  } catch (error) {
    console.error("Gemini or TTS Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate podcast script." });
  }
};

export default textToSpeech;

  

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

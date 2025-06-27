import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MURF_API_URL = "https://api.murf.ai/v1/speech/generate";

//text to speech function
const textToSpeech = async (paragraph) => {
  try {
    const ttsResponse = await axios.post(
      MURF_API_URL,
      {
        text: paragraph,
        voiceId: "en-US-natalie", // Replace with valid Murf voice ID
      },
      {
        headers: {
          "api-key": process.env.murf_api_key,
          "Content-Type": "application/json",
        },
      }
    );

    const { audioFile } = ttsResponse.data;

    return { paragraph, audioFile };
  } catch (error) {
    console.error("Murf TTS error:", error.response?.data || error.message);
  }
};

export const Summarize = async (req, res) => {
  const prompt = req.body.prompt;
  const pdfData = req.body.pdfData;

  if (!prompt && !pdfData) {
    return res
      .status(400)
      .json({ error: "Prompt and/or PDF content is required." });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const contentToSummarize =
      prompt && pdfData
        ? `Topic: ${prompt}\n\nContent:\n${pdfData}`
        : prompt
        ? `Topic to summarize:\n${prompt}`
        : `Content:\n${pdfData}`;

    const result = await model.generateContent(`
You are an AI assistant that summarizes academic or informational text.

Please summarize the following content into a clear and concise explanation. Break the content into short, easy-to-understand paragraphs. Each paragraph should be complete and self-contained.

Avoid complex jargon and use a friendly tone. Don't include titles, lists, or markdown formatting.

${contentToSummarize}

Output format: Plain text only. Separate paragraphs with double newlines.
    `);

    const response = await result.response;
    const text = response.text();

    // Split into individual paragraphs
    const paragraphArray = text
      .split(/\n\s*\n/) // double newlines = paragraph breaks
      .map((p) => p.trim()) // clean up whitespace
      .filter(Boolean); // remove empty strings

    //text to speech function call
    const textWithAudioArray = await Promise.all(
      paragraphArray.map(async (paragraph) => {
        return await textToSpeech(paragraph);
      })
    );

    return res.status(200).json({
      paragraphs: textWithAudioArray,
    });
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    return res.status(500).json({ error: "Failed to generate summary." });
  }
};

// try {
//     const ttsResponse = await axios.post(
//       MURF_API_URL,
//       {
//         text: paragraph,
//         voiceId: "en-US-natalie", // Replace with valid Murf voice ID

//       },
//       {
//         headers: {
//           "api-key":process.env.murf_api_key ,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const { audioFile } = ttsResponse.data;

//     audioResults.push({
//       paragraph,
//       audioFile,
//     });

//   } catch (ttsErr) {
//     console.error("Murf TTS error:", ttsErr.response?.data || ttsErr.message);

//     audioResults.push({
//       paragraph,
//       audioUrl: null,
//       error: "TTS failed",
//     });
//   }

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

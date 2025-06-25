import dotenv from "dotenv"
import express from "express"
import axios from "axios";
dotenv.config();
 const MURF_API_URL="https://api.murf.ai/v1/speech/generate"
const textToSpeech= async(req,res,next)=>{
       const {paragraph}=req.body;
       
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

     return res.status(200).json({
     
      audioUrl: audioFile
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
export default textToSpeech
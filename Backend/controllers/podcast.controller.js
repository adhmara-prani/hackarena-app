import express from "express"
import { GoogleGenerativeAI } from "@google/generative-ai"
import dotenv from 'dotenv'
dotenv.config();

const genAI= new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
 const generatePodcastScript= async(req,res,next)=>{
      const {prompt ,pdfData}= req.body;
      if(!prompt || !pdfData)
      {
           return   res.status(400).json({error:"Prompt and PDF Content are required"});
      }
      try {
          const model= genAI.getGenerativeModel({model:"gemini-1.5-flash"});
          const result = await model.generateContent(
  `Analyze the following input and generate a podcast script in plain English. The podcast should be informative, simple, and engaging for students, especially those with ADHD or Dyslexia.

Use the structure below:
- A brief and friendly introduction
- Main body explaining the topic clearly (use examples or storytelling if helpful)
- A short conclusion or closing note

Only respond with the podcast script as plain text. Do not include headings or metadata.

Input:
{
  "prompt": "${prompt}",
  "pdfData": "${pdfData}"
}`
);
    const response= await result.response;
    const text= response.text();
    res.json({script:test});
        
      } catch (error) {
        console.log('Gemini error:' ,err);
        res.status(500).json({error:'Failed to generate a podcast script'})
        
      }
    }
export default generatePodcastScript 

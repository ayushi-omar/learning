// const apiKey = ;
// 'AIzaSyCgbdDzk5iBJDMk-dcNvyM7k9wsAihZctc'; 

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: 'AIzaSyAg_hmwEoAP8esrmRTMCBtd16SRfHDrtMM',

});

async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt || "What is the capital of France?",
  });
  console.log(response.text);
  return response.text;
}

export default main;
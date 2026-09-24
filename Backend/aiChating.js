const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

async function main(promptmessage) {
  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: promptmessage,
  });

  return response.text;
}

module.exports = main;
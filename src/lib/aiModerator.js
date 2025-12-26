import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export const moderateFeedback = async (comment) => {
  try {
    // FIX: This is the ONLY string that works consistently for v1beta right now
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are a moderator for "Delight Bakehouse". 
      Text: "${comment}"
      If it's spam, links, or rude to Khushi, return: {"status": "REJECTED", "reason": "Policy"}
      Otherwise return: {"status": "APPROVED", "reason": "Genuine"}
      Return ONLY raw JSON.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json|```/g, "").trim();
    
    return JSON.parse(text);
  } catch (error) {
    console.error("AI CRASHED:", error.message);
    // If the API is busy or offline, we block by default to keep the site clean
    return { status: "REJECTED", reason: "Moderation system offline" };
  }
};
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export const moderateFeedback = async (comment) => {
  try {
    // UPDATED: Standard model ID for Dec 2025
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are a strict security moderator for "Delight Bakehouse". 
      If the text contains links, competitor names, or insults to Khushi, return REJECTED.
      If it is a nice review, return APPROVED.
      Return ONLY raw JSON: {"status": "REJECTED", "reason": "why"} OR {"status": "APPROVED", "reason": "Genuine"}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json|```/g, "").trim();
    
    return JSON.parse(text);
  } catch (error) {
    console.error("AI MODERATION FAILED:", error.message);
    // Safety Wall: Reject if AI is offline
    return { status: "REJECTED", reason: "Moderation system offline" };
  }
};
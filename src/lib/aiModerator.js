import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const moderateFeedback = async (comment) => {
  try {
    // UPDATED FOR 2025: Using Gemini 2.5 Flash
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are a strict security moderator for a bakery. 
      Analyze this text: "${comment}"
      
      RULES:
      1. If it contains links (http, .com), crypto spam, or gibberish, return: {"status": "REJECTED", "reason": "Spam/Links detected"}
      2. If it is a normal customer review, return: {"status": "APPROVED", "reason": "Clear"}
      
      Return ONLY raw JSON.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json|```/g, "").trim();
    
    return JSON.parse(text);
  } catch (error) {
    console.error("AI CRASHED:", error);
    // EMERGENCY STOP: If AI fails (like that 404), we reject by default to protect the site
    return { status: "REJECTED", reason: "Moderation system offline" };
  }
};
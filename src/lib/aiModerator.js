import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const moderateFeedback = async (comment) => {
  const prompt = `
    You are a strict moderator for "Delight Bakehouse". 
    Analyze this review: "${comment}"
    
    CRITICAL RULES:
    1. If it contains any URL (http, .com, .net), links, or is obvious spam, you MUST return: {"status": "REJECTED", "reason": "Spam links are not allowed"}
    2. If it contains profanity or hate speech, return: {"status": "REJECTED", "reason": "Policy violation"}
    3. If it is a real customer review, return: {"status": "APPROVED", "reason": "Genuine"}
    4. If it is too short (less than 3 words) or vague, return: {"status": "PENDING", "reason": "Too short"}

    Return ONLY a raw JSON object. Do not include markdown formatting.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().replace(/```json|```/g, "").trim();
    
    const parsed = JSON.parse(text);
    console.log("AI Moderation Result:", parsed); // This helps you see what AI decided in the console
    return parsed;
  } catch (error) {
    console.error("AI Moderation Error:", error);
    return { status: "PENDING", reason: "AI check failed" };
  }
};
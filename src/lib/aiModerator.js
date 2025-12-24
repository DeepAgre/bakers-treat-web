import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const moderateFeedback = async (comment) => {
  const prompt = `
    You are a moderator for "Bakers Treat", a home bakery in Thane run by Khushi Manjrekar.
    Analyze this customer review: "${comment}"
    
    Rules:
    1. If it contains profanity, hate speech, or obvious spam links, return: {"status": "REJECTED", "reason": "Policy violation"}
    2. If it is a very short, vague negative review (e.g., "bad" or "no"), return: {"status": "PENDING", "reason": "Vague feedback"}
    3. If it is a genuine review (positive or negative) with specific details, return: {"status": "APPROVED", "reason": "Genuine"}

    Return ONLY a JSON object.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error("AI Moderation Error:", error);
    return { status: "PENDING", reason: "AI check failed" };
  }
};
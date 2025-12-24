import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const moderateFeedback = async (comment) => {
  try {
    // Ensuring we use the correct model name
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are a strict moderator for "Delight Bakehouse". 
      Analyze this review: "${comment}"
      
      RULES:
      1. If it contains URLs, links (http, .com), or obvious spam, return: {"status": "REJECTED", "reason": "Spam links detected"}
      2. If it is a real customer review, return: {"status": "APPROVED", "reason": "Genuine"}
      
      Return ONLY a raw JSON object.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json|```/g, "").trim();
    
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Moderation Error:", error);
    // FALLBACK: If AI crashes, we REJECT to prevent spam from leaking through
    return { status: "REJECTED", reason: "Moderation service temporarily unavailable" };
  }
};
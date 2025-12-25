import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const moderateFeedback = async (comment) => {
  try {
    // UPDATED FOR 2025: Using Gemini 2.5 Flash
    // Change this line in your moderateFeedback function:
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const prompt = `
      You are a high-security automated moderator for "Delight Bakehouse". 
      Your job is to protect the brand from competition, insults, and spam.
      
      CRITICAL REJECTION RULES (Return "REJECTED" if):
      1. Mention of other bakeries, shops, or Mumbai/competitor locations.
      2. Any negative, rude, or aggressive language toward the owner (Khushi) or the brand.
      3. Any links (http, .com, .in, .net).
      4. Any gibberish or random letters/numbers.
      5. Any promotional "Buy this" or "Go there" tone.

      APPROVAL RULES (Return "APPROVED" only if):
      1. It is a genuine review about the food, taste, or service of Delight Bakehouse.
      
      Return ONLY a raw JSON object like this:
      {"status": "REJECTED", "reason": "Detailed reason here"} 
      OR 
      {"status": "APPROVED", "reason": "Genuine"}
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
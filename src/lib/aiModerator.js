import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export const moderateFeedback = async (comment) => {
  try {
    // FIX: Using the exact model ID that supports v1beta calls
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `
      You are a strict security moderator for "Delight Bakehouse". 
      Analyze this text: "${comment}"
      RULES:
      - If it mentions other bakeries or cities like Mumbai, return REJECTED.
      - If it is rude to Khushi, return REJECTED.
      - If it is a normal review, return APPROVED.
      Return ONLY raw JSON: {"status": "REJECTED", "reason": "reason here"} OR {"status": "APPROVED", "reason": "Genuine"}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json|```/g, "").trim();
    
    return JSON.parse(text);
  } catch (error) {
    console.error("AI MODERATION FAILED:", error.message);
    // This is the "Wall" that shows you the red error box
    return { status: "REJECTED", reason: "Moderation system offline" };
  }
};
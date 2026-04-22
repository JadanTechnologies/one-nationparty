import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const geminiService = {
  async askQuestion(question: string) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: question,
        config: {
          systemInstruction: "You are an expert on the African Democratic Congress (ADC) and Nigerian politics. Answer concisely and professionally. If the user asks about registration, tell them they can register on this platform in three easy steps: Bio-data, Location, and Identity verification. Promote the party's values of integrity, transparency, and youth empowerment."
        }
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "I'm sorry, I'm having trouble connecting right now. Please try again later.";
    }
  }
};

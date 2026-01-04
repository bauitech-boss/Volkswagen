
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIResponse = async (prompt: string, context: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        You are V-Bot, a professional Volkswagen Parts and Sales Assistant.
        You have access to the current system state:
        Parts: ${JSON.stringify(context.parts)}
        Cars: ${JSON.stringify(context.cars)}
        Maintenance: ${JSON.stringify(context.maintenance)}
        
        User Query: ${prompt}
        
        Rules:
        1. Be professional, efficient, and precise.
        2. Help users find parts, suggest maintenance intervals, or identify matching cars.
        3. If you can't find a direct match, offer related VW expertise.
        4. Keep answers concise.
      `,
    });
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to AI service. Please check your connection.";
  }
};

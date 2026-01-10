import { GoogleGenAI, Type } from "@google/genai";

export interface GradeResult {
  correct: boolean;
  feedback: string;
}

export const gradeUserAnswer = async (
  apiKey: string,
  question: string,
  userAnswer: string,
  targetAnswer: string
): Promise<GradeResult> => {
  const ai = new GoogleGenAI({ apiKey });

  // Using gemini-3-pro-preview as requested for higher quality reasoning than Flash
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview', 
    contents: `
      You are a Finnish language teacher.
      Question: Translate "${question}" to Finnish.
      Target Answer: "${targetAnswer}"
      Student Answer: "${userAnswer}"
      
      Evaluate the student's answer.
      1. It is correct if it matches the target OR is a valid alternative (e.g. synonym, dialect).
      2. Provide helpful feedback. If wrong, explain why (grammar, case usage, spelling).
      3. Keep feedback concise (under 20 words).
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          correct: { type: Type.BOOLEAN },
          feedback: { type: Type.STRING }
        }
      }
    }
  });

  const text = response.text;
  if (!text) return { correct: false, feedback: "Could not grade answer." };
  return JSON.parse(text);
};
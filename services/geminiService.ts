import { GoogleGenAI, Type } from "@google/genai";
import type { IdentifiedItem } from '../types';
import { GEMINI_API_KEY } from '@/lib/env';

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const prompt = `
You are "Wardrobe AI," a sophisticated fashion expert. Your task is to analyze the user-provided image and identify the distinct clothing items and accessories being worn.

For each item identified, you must:
1.  Provide a concise, descriptive name (e.g., "Black Leather Biker Jacket," "High-Waisted Light-Wash Jeans"). This name will be used as a search query.
2.  Categorize the item (e.g., "Outerwear," "Pants," "Footwear," "Accessory").
3.  Write a brief, appealing description of the item.

Respond ONLY with a valid JSON object that adheres to the provided schema. Do not include any markdown formatting like \`\`\`json.
`;

const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        itemName: { type: Type.STRING, description: "Descriptive name of the clothing item to be used as a search query." },
        category: { type: Type.STRING, description: "Category of the item (e.g., Outerwear, Footwear)." },
        description: { type: Type.STRING, description: "A brief description of the item." },
      },
      required: ["itemName", "category", "description"],
    },
};


export const analyzeOutfit = async (base64Image: string, mimeType: string): Promise<IdentifiedItem[]> => {
  const imagePart = {
    inlineData: {
      data: base64Image,
      mimeType: mimeType,
    },
  };

  const textPart = {
    text: prompt,
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result as IdentifiedItem[];
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to analyze outfit with Gemini API.");
  }
};

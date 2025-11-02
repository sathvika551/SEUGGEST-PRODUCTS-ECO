
import { GoogleGenAI, Type } from "@google/genai";
import type { SustainableProduct } from '../types';

if (!process.env.API_KEY) {
    // In a real app, you might want to handle this more gracefully.
    // For this example, we assume the key is set in the environment.
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    name: {
      type: Type.STRING,
      description: 'The common name of the sustainable product alternative.',
    },
    description: {
      type: Type.STRING,
      description: 'A brief, engaging, one-paragraph description of the sustainable product and why it\'s a better alternative.',
    },
    sustainability_features: {
      type: Type.ARRAY,
      description: 'A list of 2-4 key bullet points on its sustainability benefits (e.g., "Biodegradable", "Made from recycled materials", "Reduces plastic waste").',
      items: { type: Type.STRING },
    },
    original_product_category: {
        type: Type.STRING,
        description: 'A single, general category for the original product, like "Personal Care", "Kitchen Supplies", "Cleaning", "Office", or "Clothing".'
    }
  },
  required: ['name', 'description', 'sustainability_features', 'original_product_category'],
};


export const getSustainableAlternative = async (productName: string): Promise<SustainableProduct> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `I'm looking for a sustainable, eco-friendly alternative to the following product: "${productName}". Please recommend a specific type of product.`,
      config: {
        systemInstruction: "You are an AI assistant passionate about sustainability. Your goal is to help users find eco-friendly alternatives to everyday products. Be concise, positive, and informative. Provide your response in the requested JSON format.",
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
        throw new Error("Received an empty response from the API.");
    }

    const parsedData = JSON.parse(jsonText) as SustainableProduct;
    
    // Basic validation to ensure the parsed data matches our expected type
    if (!parsedData.name || !parsedData.description || !Array.isArray(parsedData.sustainability_features)) {
        throw new Error("API response is missing required fields.");
    }

    return parsedData;

  } catch (error) {
    console.error("Error fetching sustainable alternative from Gemini API:", error);
    // Re-throw a more user-friendly error
    throw new Error("Failed to get a recommendation from the AI service.");
  }
};

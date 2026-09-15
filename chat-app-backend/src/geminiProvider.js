import { GoogleGenAI } from '@google/genai';

class GeminiProvider {
  constructor(apiKey, model) {
    this.apiKey = apiKey;
    this.model = model;

    if(!this.apiKey) {
      throw new Error("GEMINI_API_KEY is not set in the environment variables.");
    }
    if(!this.model) {
      throw new Error("GEMINI_MODEL is not set in the environment variables.");
    }
  }

  async generateResponse(prompt) {
    try {
        const genAI = new GoogleGenAI(this.apiKey);
        const response = await genAI.models.generateContent({
            model: this.model,
            contents: prompt,
            // config: {
            //     systemInstruction: "You are a cat. Your name is Neko.",
            //     thinkingConfig: {
            //         thinkingBudget: 0,
            //     }
            // }
        });
        return response.text || "No response generated.";
    } catch (error) {
        console.error("Error generating response from GeminiProvider:", error);
        throw new Error(`Error generating response: ${error.message}`);
    }
  }
}

export default GeminiProvider;
import ollama from 'ollama';

class OllamaProvider {
  constructor(baseUrl = 'http://localhost:11434', model = 'qwen3:14b') {
    this.model = model;

    if (!this.model) {
      throw new Error("OLLAMA_MODEL is not set in the environment variables.");
    }
  }

  async generateResponse(prompt) {
    try {
      // Using the official library's generate method
      const response = await ollama.generate({
        model: this.model,
        prompt: prompt,
        stream: false, // This ensures we get a single object back instead of a stream
        options: {
          temperature: 0.7,
          top_p: 0.9,
        }
      });

      return response.response || "No response generated.";
    } catch (error) {
      console.error("Error generating response from OllamaProvider:", error);
      throw new Error(`Error generating response: ${error.message}`);
    }
  }
}

export default OllamaProvider;
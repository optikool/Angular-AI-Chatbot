import express from 'express';

import OllamaProvider from './ollamaProivder.js';
import GeminiProvider from './geminiProvider.js';

const router = express.Router();

router.post('/gemini/chat', async (req, res) => {
  const { message } = req.body;

  if(!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  console.log(`Received message: ${message}`);

  try {
    const gemini = new GeminiProvider(
        process.env.GEMINI_API_KEY, 
        process.env.GEMINI_MODEL
    );

    const response = await gemini.generateResponse(message);

    res.json({ reply: response });
  } catch (error) {
    console.error('Error processing chat message:', error);
    res.status(500).json({ error: 'Failed to get response from AI model' });
  }
});

router.post('/ollama/chat', async (req, res) => {
  try {
    const messages = req.body.messages;
    const prompt  = messages[0].content;
    // Explicitly use OllamaProvider for this route
    const provider = new OllamaProvider(
      process.env.OLLAMA_BASE_URL || 'http://localhost:11434', 
      process.env.OLLAMA_MODEL || req.body.model || 'qwen3:14b'
    );

    const response = await provider.generateResponse(prompt);
    res.json({ reply: response });
  } catch (error) {
    console.error("Ollama Route Error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
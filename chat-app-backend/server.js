import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import chatRouter from './src/chatRouter.js';

const app = express();

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Define a simple route for testing
app.get('/', (req, res) => {
  res.send('Hello from the chat app backend!');
});

app.use('/api', chatRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


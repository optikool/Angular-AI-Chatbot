# Angular AI Chatbot

A full-stack AI Chatbot application built with Angular and Node.js. This project features a modern, responsive UI and a modular backend capable of connecting to multiple Large Language Models (LLMs), including Google Gemini and local models via Ollama.

## 🚀 Features
- **Multi-Provider Support**: Switch between Google Gemini (Cloud) and Ollama (Local).
- **Real-time Interaction**: Responsive chat interface built with Angular Signals for efficient state management.
- **Modern UI/UX**: Styled with Tailwind CSS, featuring a sleek, dark-themed "chat" experience.
- **Responsive Design**: Optimized for both desktop and mobile screens.
- **Modular Architecture**: Clean separation between frontend components and backend provider logic.

## 🛠️ Tech Stack
**Frontend:**
- Angular (Latest)
- Tailwind CSS
- Angular Signals (State Management)

**Backend:**
- Node.js & Express
- Google Generative AI SDK (Gemini)
- Ollama JavaScript Library
- Dotenv (Environment Configuration)

## 📋 Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [Angular CLI](https://angular.io/cli)
- [Ollama](https://ollama.com/) (Optional, for local AI)
- A Google Gemini API Key (Optional)

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/optikool/Angular-AI-Chatbot.git
cd Angular-AI-Chatbot
```

### 2. Backend Setup
```bash
cd chat-app-backend
npm install
```
Create a `.env` file in the `chat-app-backend` directory and add your credentials:
```env
PORT=3000
# Gemini Configuration
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-flash

# Ollama Configuration (Optional)
USE_OLLAMA=true
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3
```
Start the backend:
```bash
node server.js
```

### 3. Frontend Setup
```bash
cd angular-chat-app
npm install
```
Start the Angular development server:
```bash
ng serve
```
Open your browser to `http://localhost:4200`.

## 🔌 API Endpoints
- `POST /chat`: Send a prompt to the default configured provider (Gemini).
- `POST /ollama/chat`: Send a prompt specifically to the local Ollama instance.

## 📸 Screenshots


## 🤝 Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## 📄 License
This project is licensed under the MIT License.
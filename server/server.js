require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const resumeData = require('./resumeData');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // Construct the prompt with system instruction and user question
    const prompt = `
SYSTEM INSTRUCTION:
${resumeData}

USER QUESTION:
${message}

Answer based ONLY on the profile data provided above. Stay in character as JARVIS. If the answer isn't in the data, say "I'm afraid I don't have that specific record in my database."
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      reply: "My systems are currently experiencing technical difficulties. Please try again momentarily." 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'JARVIS systems operational' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🤖 JARVIS Backend Server running on port ${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/chat`);
});

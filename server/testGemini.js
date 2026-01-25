require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
  console.log('🧪 Testing Gemini API...');
  console.log('API Key:', process.env.GEMINI_API_KEY ? '✓ Found' : '✗ Missing');
  
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    console.log('📡 Sending test request...');
    const result = await model.generateContent("Hello JARVIS, are you online?");
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ SUCCESS! Gemini API is working.');
    console.log('📝 Response:', text);
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    if (error.message.includes('API_KEY_INVALID')) {
      console.error('⚠️  Your API key is invalid. Please get a new one from: https://makersuite.google.com/app/apikey');
    }
  }
}

testGemini();

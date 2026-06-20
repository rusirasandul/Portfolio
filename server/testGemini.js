require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
  console.log('🤖 Starting JARVIS Gemini API Test...');
  
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('❌ Error: GEMINI_API_KEY is not defined in server/.env');
    process.exit(1);
  }
  
  console.log(`📡 Using API Key: ${apiKey.substring(0, 8)}...${apiKey.substring(apiKey.length - 4)}`);
  
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    console.log('⏳ Sending test prompt to gemini-2.5-flash...');
    const result = await model.generateContent("Respond with 'System Online' if you can read this.");
    const response = await result.response;
    const text = response.text();
    
    console.log(`\n✅ Gemini Response: ${text.trim()}`);
    console.log('\n🎉 Connection test successful! Your API key is valid and working.');
  } catch (error) {
    console.error('\n❌ Connection test failed!');
    console.error('Error Details:', error.message);
    console.error('\nPlease double check that your API key is correct and has access to gemini-2.5-flash.');
    process.exit(1);
  }
}

testGemini();

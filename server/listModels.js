require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
  console.log('📋 Fetching available Gemini models...\n');
  
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Try to list models using the SDK
    const models = await genAI.listModels();
    
    console.log('✅ Available models:');
    models.forEach(model => {
      console.log(`  - ${model.name}`);
      console.log(`    Display Name: ${model.displayName}`);
      console.log(`    Description: ${model.description}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    console.log('\n💡 Your API key might be invalid or expired.');
    console.log('Get a new one from: https://aistudio.google.com/apikey');
  }
}

listModels();

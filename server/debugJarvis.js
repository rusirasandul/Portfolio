const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

// List of models to attempt
const MODELS_TO_TRY = [
  "gemini-1.5-flash",
  "gemini-1.5-pro",
  "gemini-pro",
  "gemini-1.0-pro"
];

async function testConnection() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  console.log("🔍 DEBUG LOG:");
  console.log("-----------------------------------");
  console.log(`🔑 API Key Loaded: ${apiKey ? "YES (Starts with " + apiKey.substring(0, 4) + "...)" : "NO"}`);

  if (!apiKey) {
    console.error("❌ CRITICAL: No API Key found in .env file.");
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  for (const modelName of MODELS_TO_TRY) {
    console.log(`\nTesting model: "${modelName}"...`);
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Hello, are you online?");
      const response = await result.response;
      console.log(`✅ SUCCESS! Model "${modelName}" works!`);
      console.log(`📝 Reply: ${response.text()}`);
      
      // If we find a working one, stop.
      console.log("\n>>> RECOMMENDATION: Update your server.js to use: " + modelName);
      return; 
    } catch (error) {
      console.log(`❌ Failed (${modelName}): ${error.message.split('[')[0].trim()}`); // Clean error log
    }
  }

  console.log("\n-----------------------------------");
  console.log("❌ ALL ATTEMPTS FAILED.");
  console.log("Troubleshooting steps:");
  console.log("1. Go to https://aistudio.google.com/app/apikey");
  console.log("2. Create a BRAND NEW key.");
  console.log("3. Ensure you copy it without spaces.");
  console.log("4. Paste it into your .env file.");
}

testConnection();

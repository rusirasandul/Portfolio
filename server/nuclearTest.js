const { GoogleGenerativeAI } = require("@google/generative-ai");

// ⚠️ PASTE YOUR NEW KEY DIRECTLY HERE (Do not use process.env)
const API_KEY = "AIzaSyCccSXzj7hTEMFL1-OzpUTWYDqtp9XLEGs";

async function run() {
  console.log("🚀 Starting Nuclear Test...");
  console.log(`🔑 Key being used ends with: ...${API_KEY.slice(-4)}`);

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    const result = await model.generateContent("Are you working?");
    const response = await result.response;
    console.log("✅ SUCCESS! The key is valid.");
    console.log("🤖 Reply:", response.text());
  } catch (error) {
    console.error("❌ FAILED:");
    console.error(error.message);
  }
}

run();

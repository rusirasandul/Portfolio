// listModelsRaw.js
const API_KEY = "AIzaSyCccSXzj7hTEMFL1-OzpUTWYDqtp9XLEGs"; // <--- Your API Key

async function listModels() {
  console.log("📡 Connecting to Google API directly...");
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("\n✅ AVAILABLE MODELS FOR THIS KEY:");
    console.log("---------------------------------");
    
    if (!data.models) {
        console.log("⚠️ No models returned. Your account might be restricted.");
        return;
    }

    data.models.forEach(m => {
      // We only care about models that support 'generateContent'
      if (m.supportedGenerationMethods.includes("generateContent")) {
        console.log(`Model Name: ${m.name.replace('models/', '')}`);
      }
    });

  } catch (error) {
    console.error("❌ CONNECTION FAILED:", error.message);
  }
}

listModels();

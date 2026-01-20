# JARVIS AI Backend

Real AI-powered backend for the JARVIS chatbot using Google's Gemini API.

## 🚀 Setup Instructions

### 1. Install Dependencies

Navigate to the server directory and install packages:

```bash
cd server
npm install
```

### 2. Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 3. Configure Environment Variables

Create a `.env` file in the `server` directory:

```bash
cp .env.example .env
```

Then edit `.env` and add your API key:

```
GEMINI_API_KEY=your_actual_api_key_here
PORT=5000
```

### 4. Start the Backend Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

You should see:
```
🤖 JARVIS Backend Server running on port 5000
📡 API endpoint: http://localhost:5000/api/chat
```

### 5. Start Your Frontend

In a separate terminal, go back to the main project directory and start Vite:

```bash
cd ..
npm run dev
```

## 📝 How It Works

1. **Frontend** (React): User types a message in JARVIS chatbot
2. **API Call**: Frontend sends POST request to `http://localhost:5000/api/chat`
3. **Backend** (Express): Receives message and sends it to Gemini API with your resume data as context
4. **AI Response**: Gemini generates a personalized response as JARVIS
5. **Display**: Response is sent back to frontend and displayed

## 🔧 Customization

### Update Your Information

Edit `server/resumeData.js` to update:
- Your skills
- Your projects
- Your contact information
- JARVIS's tone and personality

### Change AI Model

In `server.js`, you can switch models:

```javascript
// Faster, cheaper (recommended for portfolio)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// More powerful
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
```

## 🐛 Troubleshooting

### "JARVIS API Error" or "connectivity issues"

1. Make sure the backend server is running (`npm start` in server directory)
2. Check that port 5000 is not in use
3. Verify your `.env` file has a valid API key

### CORS Errors

The backend is configured to allow all origins for development. For production, update the CORS settings in `server.js`.

## 📊 API Endpoints

- `POST /api/chat` - Send a message, get AI response
- `GET /api/health` - Check if server is running

## 🎯 Free Tier Limits

Gemini API free tier includes:
- 60 requests per minute
- 1,500 requests per day
- More than enough for a portfolio website!

## 🔒 Security Notes

- Never commit your `.env` file (it's in `.gitignore`)
- For production deployment, use environment variables
- Consider rate limiting for public deployments

## 📦 Production Deployment

For production:
1. Deploy backend to a service like Render, Railway, or Heroku
2. Update the API URL in `JarvisBot.tsx` to your production URL
3. Add your Gemini API key as an environment variable in your hosting service

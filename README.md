# Rusira Sandul - Portfolio Website

A minimalist, high-performance portfolio website built with React, Vite, and Tailwind CSS, featuring an AI-powered JARVIS chatbot assistant.

## 🚀 Features

- **Minimalist Design**: Clean black & white navigation with dark mode
- **AI-Powered Assistant**: JARVIS chatbot with Iron Man aesthetic powered by Gemini AI
- **Interactive Robot Background**: SVG robot that follows mouse movement in hero section
- **Dynamic Hero Section**: Rotating focus areas showcasing multiple specializations
- **High Performance**: Optimized for Lighthouse score > 90
- **Responsive**: Mobile-first design that works on all devices
- **Smooth Animations**: Framer Motion animations with GPU optimization
- **Modern Tech Stack**: React 19, Vite, Tailwind CSS, TypeScript, Express, Gemini AI

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 3.4.3
- **Animations**: Framer Motion 11.0.0
- **Routing**: React Router DOM 6.22.0
- **Icons**: Lucide React

### Backend
- **Server**: Express 4.19.2
- **AI**: Google Generative AI (Gemini) 0.21.0
- **CORS**: Enabled for local development
- **Environment**: Dotenv 16.4.5

## 📦 Installation

1. Clone the repository
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```
4. Configure environment variables:
   ```bash
   cd server
   cp .env.example .env
   ```
   Edit `.env` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   PORT=5000
   ```

## 🎯 Development

### Frontend
Start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Backend (Required for JARVIS chatbot)
In a separate terminal, start the backend server:

```bash
cd server
node server.js
```

The API will be available at `http://localhost:5000`

> **Note**: Both frontend and backend servers must be running for full functionality, especially the JARVIS chatbot.

## 🏗️ Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 📂 Project Structure

```
Portfolio/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx              # Black/white compact navigation
│   │   ├── Hero.tsx                # Hero with rotating focus areas
│   │   ├── HeroRoboBackground.tsx  # Interactive SVG robot
│   │   ├── About.tsx               # About section with background
│   │   ├── Projects.tsx            # Projects showcase grid
│   │   ├── ProjectCard.tsx         # Individual project card
│   │   ├── Skills.tsx              # Categorized skills display
│   │   ├── Contact.tsx             # Contact form and social links
│   │   ├── Footer.tsx              # Footer with copyright
│   │   └── JarvisBot.tsx           # AI-powered chatbot
│   ├── App.tsx                     # Main app component
│   ├── main.tsx                    # App entry point
│   └── index.css                   # Global styles
├── server/
│   ├── server.js                   # Express backend with Gemini AI
│   ├── resumeData.js               # Portfolio data for AI context
│   ├── .env                        # Environment variables (not in git)
│   ├── .env.example                # Environment template
│   ├── package.json                # Backend dependencies
│   └── README.md                   # Backend documentation
└── public/
    └── Rusira_Sandul_CV.pdf        # CV file for download button
```

## 🎨 Design System

### Colors
- **Background**: Slate-900 (#0F172A)
- **Text**: Slate-200 (#E2E8F0)
- **Accent**: Cyan-400 (#22D3EE) - JARVIS theme
- **Border**: Slate-700 (#334155)
- **Navbar**: Black background with white text

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

## 🤖 JARVIS Chatbot

The portfolio features an AI-powered chatbot named JARVIS with an Iron Man-inspired design:

### Features
- **AI Integration**: Powered by Google Gemini API
- **Contextual Responses**: Knows about all portfolio content, projects, and skills
- **Iron Man Aesthetic**: Arc reactor animation and JARVIS personality
- **Real-time Communication**: Instant responses via Express backend

### Usage
1. Click the floating JARVIS button in the bottom-right corner
2. Ask questions about:
   - Projects and experience
   - Technical skills and expertise
   - Background and education
   - Contact information

### Example Questions
- "What projects has Rusira worked on?"
- "Tell me about his skills in cybersecurity"
- "What's his educational background?"
- "How can I contact him?"

## 📝 Content Sections

1. **Hero**: Introduction with rotating focus areas (7 specializations) and Download CV button
2. **About**: Background, education at University of Sri Jayewardenepura, and leadership roles
3. **Projects**: 6 featured projects including AI Chatbot, Network Security Tool, and more
4. **Skills**: Categorized technical skills (Languages, Web Dev, AI/ML, Security, etc.)
5. **Contact**: Contact form and social media links
6. **Footer**: Copyright and quick links
7. **JARVIS**: AI assistant floating button

## 🔧 Customization

To customize the content:

1. **Personal Info**: Update content in each component file
2. **Projects**: Edit the `projects` array in [Projects.tsx](src/components/Projects.tsx)
3. **Skills**: Modify `skillCategories` in [Skills.tsx](src/components/Skills.tsx)
4. **Colors**: Adjust Tailwind config in `tailwind.config.js`
5. **Social Links**: Update links in [Contact.tsx](src/components/Contact.tsx) and [Footer.tsx](src/components/Footer.tsx)
6. **JARVIS Data**: Edit portfolio information in [server/resumeData.js](server/resumeData.js)
7. **Focus Areas**: Modify rotation text in [Hero.tsx](src/components/Hero.tsx)
8. **CV File**: Replace `public/Rusira_Sandul_CV.pdf` with your resume

## 📊 Performance Optimizations

- Code splitting with dynamic imports
- Optimized bundle with Vite
- GPU-accelerated animations with Framer Motion
- Lazy loading of images and components
- Minimal dependencies
- CSS purging with Tailwind
- Mouse tracking optimized with `useMotionValue` for robot background

## 🚀 Deployment

### Frontend
Deploy to Vercel, Netlify, or any static hosting:

```bash
npm run build
```

### Backend
Deploy to Render, Railway, or Heroku:

1. Set environment variable `GEMINI_API_KEY`
2. Update API URL in [JarvisBot.tsx](src/components/JarvisBot.tsx) from `localhost:5000` to production URL
3. Deploy the `server/` directory

## 🔐 Environment Variables

Create a `.env` file in the `server/` directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## 📄 License

© 2026 Rusira Sandul. All rights reserved.

## 👤 About Me

Software Engineer & BSc Physical Science Undergraduate at University of Sri Jayewardenepura

**Specializations** (rotating in hero section):
- AI Engineer
- Cyber Security Specialist
- MERN Stack Developer
- Network Engineer
- Full Stack Developer
- Machine Learning Engineer
- Cloud Security Expert

**Core Skills**:
- MERN Stack Development
- AI/Machine Learning
- Cyber Security
- Network Engineering
- Cloud Technologies

**Contact**:
- Email: rusirasandulhw@gmail.com
- GitHub: [github.com/rusirasandul](https://github.com/rusirasandul)
- LinkedIn: [linkedin.com/in/rusira-sandul-b6bb87292](https://www.linkedin.com/in/rusira-sandul-b6bb87292)

## 🎯 Key Features Explained

### Interactive Robot Background
- SVG robot in hero section follows mouse movement
- GPU-optimized animations using Framer Motion's `useMotionValue`
- Parallax effect: head moves ±30px, eyes move ±40px
- Pulsing arc reactor animation

### Rotating Focus Areas
- 7 different specialization titles in hero section
- Rotates every 2 seconds with smooth fade transitions
- Uses `AnimatePresence` for entry/exit animations

### JARVIS AI Integration
- Backend Express server with Gemini AI
- System prompting for JARVIS personality
- Complete portfolio context for accurate responses
- Error handling and loading states

## 🐛 Troubleshooting

### JARVIS not responding
1. Ensure backend server is running: `cd server && node server.js`
2. Check if port 5000 is available
3. Verify `.env` file exists with valid `GEMINI_API_KEY`

### Port 5000 already in use
```bash
# Windows
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force
```

### Frontend not loading
1. Check if dependencies are installed: `npm install`
2. Clear Vite cache: `rm -rf node_modules/.vite`
3. Restart dev server: `npm run dev`

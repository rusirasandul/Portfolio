# Rusira Sandul - Portfolio Website

A minimalist, high-performance portfolio website built with React, Vite, and Tailwind CSS.

## 🚀 Features

- **Minimalist Design**: Clean, typographic-focused layout with dark mode
- **High Performance**: Optimized for Lighthouse score > 90
- **Responsive**: Mobile-first design that works on all devices
- **Smooth Animations**: Subtle Framer Motion animations on scroll
- **Modern Tech Stack**: React 19, Vite, Tailwind CSS, TypeScript

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM

## 📦 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## 🎯 Development

Start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

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
src/
├── components/
│   ├── Navbar.tsx       # Navigation bar with smooth scroll
│   ├── Hero.tsx         # Hero section with introduction
│   ├── About.tsx        # About section with background
│   ├── Projects.tsx     # Projects showcase grid
│   ├── ProjectCard.tsx  # Individual project card component
│   ├── Skills.tsx       # Skills categorized by type
│   ├── Contact.tsx      # Contact form and social links
│   └── Footer.tsx       # Footer with copyright and links
├── App.tsx              # Main app component
├── main.tsx             # App entry point
└── index.css            # Global styles and Tailwind config
```

## 🎨 Design System

### Colors
- **Background**: Slate-900 (#0F172A)
- **Text**: Slate-200 (#E2E8F0)
- **Accent**: Electric Blue (#60A5FA)
- **Border**: Slate-700 (#334155)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

## 📝 Content Sections

1. **Hero**: Introduction with name, tagline, and CTAs
2. **About**: Background, education, and leadership roles
3. **Projects**: Featured projects with tech stacks and links
4. **Skills**: Categorized technical skills
5. **Contact**: Contact form and social media links
6. **Footer**: Copyright and quick links

## 🔧 Customization

To customize the content:

1. **Personal Info**: Update content in each component file
2. **Projects**: Edit the `projects` array in `Projects.tsx`
3. **Skills**: Modify `skillCategories` in `Skills.tsx`
4. **Colors**: Adjust Tailwind config in `tailwind.config.js`
5. **Social Links**: Update links in `Contact.tsx` and `Footer.tsx`

## 📊 Performance Optimizations

- Code splitting with dynamic imports
- Optimized bundle with Vite
- Lazy loading of images and components
- Minimal dependencies
- CSS purging with Tailwind

## 📄 License

© 2026 Rusira Sandul. All rights reserved.

## 👤 About Me

Software Engineer & Computer Science Undergraduate at University of Sri Jayewardenepura

**Specializations**:
- MERN Stack Development
- AI/Machine Learning
- Cyber Security
- Network Engineering

**Contact**:
- Email: rusira@example.com
- GitHub: [github.com/rusirasandul](https://github.com/rusirasandul)
- LinkedIn: [linkedin.com/in/rusirasandul](https://linkedin.com/in/rusirasandul)

# Abhishek Gupta - Personal Portfolio

A modern, responsive portfolio website built with React.js and TailwindCSS, showcasing my skills as a front-end developer. Features smooth animations with Framer Motion, responsive design, and a clean, professional layout.

## 🌐 Live Demo

Visit my portfolio: [https://abhishek-gupta.tech/](https://abhishek-gupta.tech/)

## 🚀 Features

- **Responsive Design** - Optimized for all device sizes
- **Smooth Animations** - Powered by Framer Motion
- **Modern UI/UX** - Clean and professional design with TailwindCSS
- **Interactive Components** - Typewriter effect, smooth scrolling, and hover animations
- **SEO Optimized** - Meta tags and structured data for better search visibility
- **Fast Loading** - Optimized assets and lazy loading
- **Contact Form** - Functional contact form with validation
- **Project Showcase** - Detailed project cards with live demos and source code links

## 🛠️ Tech Stack

- **Frontend**: React.js 18
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Forms**: React Hook Form
- **Analytics**: Google Analytics 4
- **Deployment**: GitHub Pages

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/framer-portfolio.git
   cd framer-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🚀 Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages with a custom domain.

### Prerequisites
- GitHub repository
- Custom domain (optional)
- `gh-pages` package (already included)

### Deployment Steps

1. **Configure your domain** (if using custom domain)
   - Create a `CNAME` file in the `public` folder with your domain:
   ```
   www.yourdomain.com
   ```

2. **Update package.json homepage** (if using custom domain)
   ```json
   {
     "homepage": "https://yourdomain.com/"
   }
   ```

3. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

   This command will:
   - Build the production version (`npm run build`)
   - Deploy to the `gh-pages` branch
   - Make your site live on GitHub Pages

### GitHub Pages Configuration

1. Go to your repository **Settings**
2. Navigate to **Pages** section
3. Set source to **Deploy from a branch**
4. Select **gh-pages** branch and **/ (root)** folder
5. If using custom domain, enter it in the **Custom domain** field
6. Enable **Enforce HTTPS** (recommended)

### DNS Configuration (Custom Domain)

For `www.abhishek-gupta.tech`, configure your DNS:
- **CNAME Record**: `www` → `yourusername.github.io`
- **A Record**: `@` → GitHub Pages IPs:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Alert.jsx
│   ├── BackToTop.jsx
│   ├── InitialLoading.jsx
│   ├── LineGradient.jsx
│   ├── Loading.jsx
│   ├── Project.jsx
│   ├── ScrollProgress.jsx
│   ├── SocialMediaIcons.jsx
│   ├── Tech.jsx
│   └── Typewriter.jsx
├── hooks/              # Custom React hooks
│   ├── useGoogleAnalytics.jsx
│   └── useMediaQuery.jsx
├── scenes/             # Main page sections
│   ├── AboutMe.jsx
│   ├── Contact.jsx
│   ├── DotGroup.jsx
│   ├── Footer.jsx
│   ├── Landing.jsx
│   ├── Navbar.jsx
│   ├── Projects.jsx
│   └── Skills.jsx
├── utils/              # Utility files and data
│   ├── projects.js
│   ├── projectsImg.js
│   ├── tech.js
│   └── texts.js
├── assets/             # Images and static assets
└── App.js              # Main application component
```

## 🎨 Customization

### Adding New Projects
1. Add project image to `src/assets/projects/`
2. Update `src/utils/projects.js` with project details
3. Update `src/utils/projectsImg.js` with image imports

### Modifying Content
- Update personal information in `src/utils/texts.js`
- Modify skills in `src/utils/tech.js`
- Update contact information in Contact component

### Styling
- Global styles: `src/index.css`
- Component styles: TailwindCSS classes
- Theme configuration: `tailwind.config.js`

## 📝 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run deploy` - Build and deploy to GitHub Pages
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (not recommended)

## 🔧 Troubleshooting

### Build Warnings
The build process may show ESLint warnings for unused variables. These don't affect functionality but can be cleaned up by removing unused imports.

### Deployment Issues
- Ensure `gh-pages` package is installed: `npm install --save-dev gh-pages`
- Check GitHub Pages settings in repository settings
- Verify custom domain DNS configuration
- Wait 5-10 minutes for changes to propagate

### Domain Issues
- Ensure CNAME file is in the `public` folder
- Check DNS propagation: `nslookup yourdomain.com`
- Verify GitHub Pages recognizes your custom domain

## 📞 Contact

- **Portfolio**: [https://abhishek-gupta.tech/](https://abhishek-gupta.tech/)
- **LinkedIn**: [https://www.linkedin.com/in/gup-abhi/](https://www.linkedin.com/in/gup-abhi/)
- **Email**: Contact me through the portfolio contact form

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

⭐ **Star this repository if you found it helpful!**

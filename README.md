# Kevin Lemniai's Portfolio

A blazing-fast, bilingual personal site template for developers looking to showcase their work with elegance and performance.

![Next.js](https://img.shields.io/badge/Next.js-000?style=flat&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwind-css&logoColor=white)
![Netlify](https://img.shields.io/badge/Hosted%20on-Netlify-00C7B7?style=flat&logo=netlify&logoColor=white)

## 🚀 Features

- **Next.js Static Generation** for optimal performance and SEO
- **Internationalization** support (English/French)
- **Tailwind CSS** for modern, utility-first styling
- **Image Optimization** with automatic WebP conversion and responsive images
- **Google Analytics** integration
- **Responsive Design** that works on all devices
- **Performance Optimized** with:
  - Static Site Generation
  - Image optimization
  - Font optimization
  - Code splitting
  - Lazy loading

## 🛠️ Tech Stack

- **Next.js**: Static generation + SSR for speed and SEO
- **Tailwind CSS**: Utility-first styling for fast iteration
- **i18next**: Effortless multilingual support
- **Internationalization**: i18next with LanguageContext
- **Image Processing**: Sharp
- **Analytics**: Google Analytics
- **Deployment**: Netlify

## 📦 Project Structure

```
portfolio/
├── public/              # Static files
│   └── images/         # Optimized images
├── src/
│   ├── components/    # React components
│   ├── hooks/        # Custom React hooks
│   ├── locales/      # Translation files
│   ├── pages/        # Next.js pages
│   ├── styles/       # Global styles
│   ├── i18n.js       # i18next configuration
│   └── LanguageContext.js # Language context provider
├── scripts/          # Build and optimization scripts
└── .env.example     # Environment variables template
```

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/KevinLmn/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Google Analytics ID

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🖼️ Image Optimization

The project includes a custom image optimization script that:

- Converts images to WebP format
- Creates responsive thumbnails
- Optimizes image quality
- Maintains aspect ratios

Run the optimization script:

```bash
node scripts/optimize-images.js
```

## 🌍 Internationalization

The site supports multiple languages through i18next with a LanguageContext provider. Translation files are located in `src/locales/` and configured in `src/i18n.js`. The language state is managed through `src/LanguageContext.js`.

## 🎨 Customization

1. **Colors**: Edit `tailwind.config.js` to customize the color scheme
2. **Content**: Update the content in `src/components/` and `src/locales/`
3. **Translations**: Modify files in `src/locales/`

## 🙏 Acknowledgments

- Original template by [Soumyajit4419](https://github.com/soumyajit4419/Portfolio)
- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 🤝 Contributing

Feel free to fork this repo, use it as your own portfolio base, and ⭐ it if you like the work!

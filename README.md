# IslandFruitGuide

**A comprehensive tropical fruit encyclopedia and recipe discovery platform**

IslandFruitGuide is a modern web application built with React 19, Vite, TypeScript, and Tailwind CSS 4, featuring detailed information about Caribbean and tropical fruits, recipes, health benefits, and interactive tools.

## 🌴 Features

### Core Features
- **Fruit Encyclopedia** - Comprehensive database of tropical and Caribbean fruits with detailed information
- **Recipe Database** - Collection of fruit-based recipes with step-by-step instructions
- **Blog System** - Articles about fruits, health, and wellness
- **Seasonal Guide** - Information about fruit seasons and availability
- **Medicinal Leaves** - Database of medicinal leaves and their benefits

### Interactive Tools
- **Smart AI Assistant** - AI-powered fruit recommendations and questions
- **Food AI** - Image recognition for fruits
- **Fruit Quiz** - Interactive quiz to discover new fruits
- **Fruit Match-Up** - Comparison tool for different fruits
- **Fruit Mixer** - Create custom fruit combinations
- **Wishlist** - Save favorite fruits and recipes

### E-Commerce
- **Online Store** - Digital products (eBooks, guides)
- **Checkout System** - Integrated payment processing
- **eBook Previews** - Preview digital products before purchase

### SEO & Performance
- **Multiple Sitemaps** - Comprehensive XML sitemaps for all content types
- **Dark Mode** - Full dark theme support with theme persistence
- **Responsive Design** - Mobile-first, fully responsive layout
- **Code Splitting** - Route-level lazy loading for optimal performance
- **Image Optimization** - Optimized image delivery via Supabase CDN

## 🚀 Technology Stack

- **Frontend Framework**: React 19.2.3
- **Build Tool**: Vite 7.2.4
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 4.1.17
- **Backend**: Supabase (BaaS)
- **Fonts**: Poppins (headings), Inter (body)
- **Analytics**: Ahrefs Analytics

## 📁 Project Structure

```
/app/
├── frontend/              # Main application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components (28+ pages)
│   │   ├── data/          # Static data (fruits, recipes, etc.)
│   │   ├── lib/           # Supabase client
│   │   ├── utils/         # Utility functions
│   │   ├── App.tsx        # Main app component with routing
│   │   ├── main.tsx       # Entry point
│   │   └── index.css      # Global styles & theme
│   ├── public/            # Static assets
│   │   ├── sitemap*.xml   # SEO sitemaps
│   │   ├── robots.txt     # Search engine rules
│   │   ├── favicon.svg    # Site icon
│   │   └── sw.js          # Service worker
│   ├── index.html         # HTML template
│   ├── vite.config.ts     # Vite configuration
│   ├── tsconfig.json      # TypeScript configuration
│   ├── package.json       # Dependencies
│   └── .env               # Environment variables
├── backend/               # Minimal backend (not used by app)
└── .github/               # GitHub Actions workflows
```

## 🔧 Setup & Installation

### Prerequisites
- Node.js 18+ and Yarn
- Supabase account (for backend services)

### Environment Variables

Create a `.env` file in `/app/frontend/` with:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Optional: Replicate API (for AI features)
VITE_REPLICATE_API_KEY=your-replicate-api-key
```

See `SUPABASE_AUTH_SETUP.md` for detailed Supabase setup instructions.

### Installation

Dependencies are already installed. The application is running via supervisor.

### Development

The application runs automatically via supervisor on port 3000:

```bash
# Check status
sudo supervisorctl status

# View logs
tail -f /var/log/supervisor/frontend.out.log

# Restart if needed
sudo supervisorctl restart frontend
```

### Building for Production

```bash
cd /app/frontend
yarn build
```

The build output will be in `/app/frontend/dist/`

## 🎨 Theming

The app supports light and dark modes with custom color palette:
- **Leaf**: #1F7A4D (primary green)
- **Mango**: #F9A825 (accent yellow)
- **Coral**: #FF7043 (accent orange)
- **Cream**: #FAFAFA (light background)
- **Charcoal**: #222222 (dark text)

Theme preference is persisted in localStorage.

## 📄 Available Pages

1. **Home** - Landing page with hero and featured content
2. **Fruits** - Browse all fruits with search and filters
3. **Fruit Detail** - Detailed fruit information
4. **Recipes** - Recipe collection
5. **Recipe Detail** - Full recipe with instructions
6. **Seasonal Fruits** - Seasonal availability guide
7. **Buy Fruits** - Fruit purchasing guide
8. **Blog** - Articles and content
9. **Blog Post** - Individual blog articles
10. **Store** - Digital products store
11. **Checkout** - Payment and checkout
12. **eBook Preview** - Preview digital books
13. **Medicinal Leaves** - Medicinal plants database
14. **Leaf Detail** - Detailed leaf information
15. **Quiz** - Interactive fruit quiz
16. **Quiz Results** - Personalized quiz results
17. **Fruit Match-Up** - Compare fruits side-by-side
18. **Compare** - Comparison tool
19. **Wishlist** - Saved favorites
20. **Food AI** - AI-powered fruit recognition
21. **Smart Assistant** - AI chatbot for fruit questions
22. **Income Guide** - Monetization guide for fruit farming
23. **Health & Wellness** - Health benefits content
24. **About** - About the platform
25. **Contact** - Contact form
26. **Privacy** - Privacy policy
27. **Terms** - Terms of service
28. **Sitemap Viewer** - Interactive sitemap

## 🔌 Integrations

### Supabase
- Authentication (email, social login)
- Database for user data
- Storage for images and assets
- Real-time subscriptions

### Optional Services
- **Replicate API** - AI image recognition (Food AI feature)
- **Ahrefs Analytics** - Website analytics
- **Email Automation** - See `EMAIL_AUTOMATION_SETUP.md`

## 🚢 Deployment

### GitHub Actions
Pre-configured GitHub Actions workflow for Hostinger deployment. See `HOSTINGER_GITHUB_ACTIONS_SETUP.md` for setup instructions.

### Manual Deployment
1. Build the project: `yarn build`
2. Deploy the `dist/` folder to any static hosting service
3. Ensure environment variables are set on the hosting platform

## 📊 SEO Features

- Comprehensive meta tags (Open Graph, Twitter Cards)
- Multiple XML sitemaps (core, fruits, recipes, blog, tools, leaves)
- Sitemap index for better crawling
- Canonical URLs
- Structured data (Schema.org)
- Robots.txt configuration
- Semantic HTML structure

## 🎯 Performance Optimizations

- Route-level code splitting with React.lazy()
- Image lazy loading and optimization
- Font preloading
- Resource hints (preconnect, preload)
- Minified production builds
- Tree-shaking unused code
- Vite's optimized HMR in development

## 📝 License

This project is private and proprietary.

## 🤝 Support

For questions or issues, please refer to:
- `SUPABASE_AUTH_SETUP.md` - Supabase configuration
- `EMAIL_AUTOMATION_SETUP.md` - Email setup
- `HOSTINGER_GITHUB_ACTIONS_SETUP.md` - Deployment setup

---

**Built with ❤️ for tropical fruit enthusiasts**

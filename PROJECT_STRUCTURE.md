# IslandFruitGuide - Complete File Structure

## Summary
Successfully rebuilt IslandFruitGuide website from zip file to /app directory.

**Total Files:**
- 59 source files in /app/frontend/src/
- 12 public assets in /app/frontend/public/
- Complete project configuration files

---

## 📂 Complete Directory Structure

### Root Level (`/app/`)
```
/app/
├── README.md                          # Project documentation
├── backend/                           # Minimal backend (not used by app)
│   ├── server.py                      # Placeholder FastAPI server
│   └── requirements.txt               # Python dependencies
├── frontend/                          # Main application
└── .github/                           # GitHub Actions workflows
```

### Frontend (`/app/frontend/`)
```
/app/frontend/
├── index.html                         # HTML template with SEO meta tags
├── package.json                       # Dependencies & scripts
├── vite.config.ts                     # Vite build configuration
├── tsconfig.json                      # TypeScript configuration
├── .env                               # Environment variables
├── .env.example                       # Environment template
├── yarn.lock                          # Dependency lock file
├── node_modules/                      # Installed packages
├── src/                               # Source code
└── public/                            # Static assets
```

---

## 📄 Source Files (`/app/frontend/src/`)

### Main Entry Points
- **main.tsx** - Application entry point, renders root component
- **App.tsx** - Main app with routing logic and page management
- **index.css** - Global styles, theme colors, dark mode, animations

### Components (`/app/frontend/src/components/`) - 11 files
1. **BookCover.tsx** - Generic book cover component for store
2. **Breadcrumb.tsx** - Navigation breadcrumb component
3. **Footer.tsx** - Site footer with links and information
4. **FruitCard.tsx** - Card component for fruit listings
5. **Header.tsx** - Site header with navigation and theme toggle
6. **LeadMagnetPopup.tsx** - Email capture popup for lead generation
7. **OptimizedImage.tsx** - Image component with lazy loading
8. **ProductBundleBar.tsx** - Product bundle promotional bar
9. **RecipeCard.tsx** - Card component for recipe listings
10. **SoursopBookCover.tsx** - Specific book cover for Soursop guide
11. **SuperfruitsBookCover.tsx** - Specific book cover for Superfruits guide

### Data Files (`/app/frontend/src/data/`) - 4 files
1. **fruits.ts** - Complete database of tropical fruits (62.7 KB)
2. **recipes.ts** - Recipe collection with instructions (25.6 KB)
3. **medicinalLeaves.ts** - Medicinal leaves database (44.3 KB)
4. **blogPosts.ts** - Blog articles and content (17.6 KB)

### Pages (`/app/frontend/src/pages/`) - 31 files

#### Main Pages
1. **HomePage.tsx** - Landing page with hero and featured content
2. **AboutPage.tsx** - About the platform
3. **ContactPage.tsx** - Contact form

#### Fruit Pages
4. **FruitsPage.tsx** - Browse all fruits with search/filters
5. **FruitDetailPage.tsx** - Detailed fruit information page
6. **SeasonalFruitsPage.tsx** - Seasonal fruit availability guide
7. **BuyFruitsPage.tsx** - Guide for purchasing fruits

#### Recipe Pages
8. **RecipesPage.tsx** - Browse all recipes
9. **RecipeDetailPage.tsx** - Full recipe with instructions

#### Blog Pages
10. **BlogPage.tsx** - Blog listing page
11. **BlogPostPage.tsx** - Individual blog article page

#### Medicinal Leaves
12. **MedicinalLeavesPage.tsx** - Medicinal leaves database
13. **MedicinalLeafDetailPage.tsx** - Detailed leaf information

#### Interactive Tools
14. **FruitMatchUpPage.tsx** - Compare fruits side-by-side
15. **ComparePage.tsx** - Fruit comparison tool
16. **QuizPage.tsx** - Interactive fruit quiz
17. **QuizResultsPage.tsx** - Personalized quiz results
18. **FruitMixerPage.tsx** - Fruit combination tool
19. **FruitMixerMixPage.tsx** - Create fruit mixes
20. **FruitMixerAdminPage.tsx** - Admin for fruit mixer

#### AI Features
21. **FoodAIPage.tsx** - AI-powered fruit image recognition
22. **SmartAssistantPage.tsx** - AI chatbot for fruit questions

#### E-Commerce
23. **StorePage.tsx** - Digital products store
24. **CheckoutPage.tsx** - Payment and checkout flow
25. **EbookPreviewPage.tsx** - Preview digital books

#### Utility Pages
26. **WishlistPage.tsx** - Saved favorites
27. **HealthWellnessPage.tsx** - Health benefits content
28. **IncomeGuidePage.tsx** - Monetization guide
29. **SitemapViewerPage.tsx** - Interactive sitemap
30. **PrivacyPage.tsx** - Privacy policy
31. **TermsPage.tsx** - Terms of service
32. **NotFoundPage.tsx** - 404 error page

### Utility Functions (`/app/frontend/src/utils/`) - 7 files
1. **cn.ts** - Class name utility (clsx + tailwind-merge)
2. **favorites.ts** - LocalStorage favorites management
3. **fruitMixer.ts** - Fruit mixing calculations and logic
4. **imageDelivery.ts** - Optimized image URL generation
5. **personalization.ts** - User personalization utilities
6. **runtimeMeta.ts** - Dynamic meta tag updates
7. **theme.ts** - Theme management (light/dark mode)

### Library (`/app/frontend/src/lib/`) - 1 file
1. **supabaseClient.ts** - Supabase client initialization

---

## 🌐 Public Assets (`/app/frontend/public/`) - 12 files

### SEO & Sitemaps
1. **sitemap.xml** - Main sitemap (21 KB)
2. **sitemap_index.xml** - Sitemap index
3. **sitemap-core.xml** - Core pages sitemap
4. **sitemap-fruits.xml** - All fruits pages (14.5 KB)
5. **sitemap-recipes.xml** - All recipes pages (11.2 KB)
6. **sitemap-blog.xml** - Blog posts sitemap
7. **sitemap-leaves.xml** - Medicinal leaves sitemap
8. **sitemap-tools.xml** - Tools and utilities sitemap
9. **robots.txt** - Search engine crawling rules

### Static Files
10. **favicon.svg** - Site icon
11. **.htaccess** - Apache server configuration
12. **sw.js** - Service worker for PWA features

---

## 📋 Configuration Files

### TypeScript Configuration (`tsconfig.json`)
- Strict type checking enabled
- Path aliases configured (`@` → `src/`)
- Modern ES module support

### Vite Configuration (`vite.config.ts`)
- React plugin enabled
- Tailwind CSS v4 Vite plugin
- Single file plugin for optimized builds
- Path aliases configured

### Package Dependencies (`package.json`)
**Core Dependencies:**
- react@19.2.3
- react-dom@19.2.3
- @supabase/supabase-js@2.97.0
- clsx@2.1.1
- tailwind-merge@3.4.0

**Dev Dependencies:**
- vite@7.2.4
- typescript@5.9.3
- tailwindcss@4.1.17
- @vitejs/plugin-react@5.1.1
- @tailwindcss/vite@4.1.17
- vite-plugin-singlefile@2.3.0

---

## 🎨 Styling System

### Color Palette (defined in `index.css`)
- **Leaf (Primary)**: #1F7A4D (green)
- **Mango (Accent)**: #F9A825 (yellow/gold)
- **Coral (Accent)**: #FF7043 (orange)
- **Cream (Background)**: #FAFAFA (light)
- **Charcoal (Text)**: #222222 (dark)

### Typography
- **Headings**: Poppins (400, 500, 600, 700, 800)
- **Body**: Inter (400, 500, 600)

### Features
- Complete dark mode with 100+ custom overrides
- Smooth animations (fade-in, slide-up, pulse)
- Hover effects on cards and buttons
- Custom scrollbar styling
- Gradient backgrounds
- Responsive design utilities

---

## 🔌 External Integrations

### Supabase (Required)
- **Database**: User data, favorites, quiz results
- **Authentication**: Email & social login
- **Storage**: Image CDN for fruits, recipes, leaves
- **Configuration**: `.env` file with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

### Analytics
- **Ahrefs Analytics**: Integrated in `index.html`

### Optional APIs
- **Replicate**: AI image recognition (Food AI feature)
  - Configuration: `VITE_REPLICATE_API_KEY` in `.env`

---

## 🚀 Running the Application

### Current Status
✅ Application is **RUNNING** on port 3000
✅ Vite dev server active with hot reload
✅ All 71 files successfully copied
✅ Dependencies installed
✅ Supervisor configured

### Access
- **Local**: http://localhost:3000
- **Network**: http://10.208.149.224:3000

### Logs
```bash
# View frontend logs
tail -f /var/log/supervisor/frontend.out.log
tail -f /var/log/supervisor/frontend.err.log

# Check service status
sudo supervisorctl status

# Restart if needed
sudo supervisorctl restart frontend
```

---

## 📝 Setup Documentation

Additional setup guides included in the project:

1. **SUPABASE_AUTH_SETUP.md** - Complete Supabase configuration guide
2. **EMAIL_AUTOMATION_SETUP.md** - Email integration setup
3. **HOSTINGER_GITHUB_ACTIONS_SETUP.md** - Deployment workflow setup

---

## ✅ Rebuild Verification

**Source Integrity**: ✅ All files copied exactly as is
**Structure**: ✅ Original structure preserved
**Dependencies**: ✅ All packages installed via yarn
**Configuration**: ✅ Vite, TypeScript, Tailwind properly configured
**Services**: ✅ Running on supervisor (port 3000)
**SEO**: ✅ All sitemaps and meta tags intact
**Styling**: ✅ Tailwind v4 with custom theme
**Assets**: ✅ All public files copied

---

**Rebuild Status**: ✅ **COMPLETE & RUNNING**

The IslandFruitGuide website has been successfully rebuilt 100% exactly as provided in the zip file.

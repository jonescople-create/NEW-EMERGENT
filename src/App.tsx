import { useState, useEffect, Suspense, lazy } from "react";
import { applyTheme, getInitialTheme, toggleTheme, type ThemeMode } from "./utils/theme";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { LeadMagnetPopup } from "./components/LeadMagnetPopup";

// Route-level code splitting (reduces unused JS on initial load)
const HomePage = lazy(() => import("./pages/HomePage").then(m => ({ default: m.HomePage })));
const FruitsPage = lazy(() => import("./pages/FruitsPage").then(m => ({ default: m.FruitsPage })));
const FruitDetailPage = lazy(() => import("./pages/FruitDetailPage").then(m => ({ default: m.FruitDetailPage })));
const RecipesPage = lazy(() => import("./pages/RecipesPage").then(m => ({ default: m.RecipesPage })));
const RecipeDetailPage = lazy(() => import("./pages/RecipeDetailPage").then(m => ({ default: m.RecipeDetailPage })));
const SeasonalFruitsPage = lazy(() => import("./pages/SeasonalFruitsPage").then(m => ({ default: m.SeasonalFruitsPage })));
const AboutPage = lazy(() => import("./pages/AboutPage").then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import("./pages/ContactPage").then(m => ({ default: m.ContactPage })));
const BuyFruitsPage = lazy(() => import("./pages/BuyFruitsPage").then(m => ({ default: m.BuyFruitsPage })));
const FoodAIPage = lazy(() => import("./pages/FoodAIPage").then(m => ({ default: m.FoodAIPage })));
const IncomeGuidePage = lazy(() => import("./pages/IncomeGuidePage").then(m => ({ default: m.IncomeGuidePage })));
const HealthWellnessPage = lazy(() => import("./pages/HealthWellnessPage").then(m => ({ default: m.HealthWellnessPage })));
const SmartAssistantPage = lazy(() => import("./pages/SmartAssistantPage").then(m => ({ default: m.SmartAssistantPage })));
const StorePage = lazy(() => import("./pages/StorePage").then(m => ({ default: m.StorePage })));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage").then(m => ({ default: m.CheckoutPage })));
const EbookPreviewPage = lazy(() => import("./pages/EbookPreviewPage").then(m => ({ default: m.EbookPreviewPage })));
const BlogPage = lazy(() => import("./pages/BlogPage").then(m => ({ default: m.BlogPage })));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage").then(m => ({ default: m.BlogPostPage })));
const FruitMatchUpPage = lazy(() => import("./pages/FruitMatchUpPage").then(m => ({ default: m.default })));
const ComparePage = lazy(() => import("./pages/ComparePage").then(m => ({ default: m.ComparePage })));
const WishlistPage = lazy(() => import("./pages/WishlistPage").then(m => ({ default: m.WishlistPage })));
const QuizPage = lazy(() => import("./pages/QuizPage").then(m => ({ default: m.QuizPage })));
const QuizResultsPage = lazy(() => import("./pages/QuizResultsPage").then(m => ({ default: m.QuizResultsPage })));
const SitemapViewerPage = lazy(() => import("./pages/SitemapViewerPage").then(m => ({ default: m.SitemapViewerPage })));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage").then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import("./pages/TermsPage").then(m => ({ default: m.TermsPage })));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage").then(m => ({ default: m.NotFoundPage })));
const MedicinalLeavesPage = lazy(() => import("./pages/MedicinalLeavesPage").then(m => ({ default: m.MedicinalLeavesPage })));
const MedicinalLeafDetailPage = lazy(() => import("./pages/MedicinalLeafDetailPage").then(m => ({ default: m.MedicinalLeafDetailPage })));

function PageFallback() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <div className="inline-flex items-center gap-3 bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4">
        <span className="animate-spin text-2xl">⏳</span>
        <span className="text-sm text-charcoal-light">Loading…</span>
      </div>
    </div>
  );
}


export type Route =
  | { page: "home" }
  | { page: "fruits" }
  | { page: "fruit-detail"; slug: string }
  | { page: "recipes" }
  | { page: "recipe-detail"; slug: string }
  | { page: "seasonal-fruits" }
  | { page: "buy-fruits" }
  | { page: "about" }
  | { page: "contact" }
  | { page: "food-ai" }
  | { page: "income-guide" }
  | { page: "health-wellness" }
  | { page: "assistant" }
  | { page: "store" }
  | { page: "checkout"; productId: string }
  | { page: "ebook"; bookId: string }
  | { page: "blog" }
  | { page: "blog-post"; slug: string }
  | { page: "fruit-match-up" }
  | { page: "compare" }
  | { page: "wishlist" }
  | { page: "quiz" }
  | { page: "quiz-results" }
  | { page: "sitemap-viewer" }
  | { page: "privacy" }
  | { page: "terms" }
  | { page: "medicinal-leaves" }
  | { page: "medicinal-leaf-detail"; slug: string }
  | { page: "not-found"; path: string };

function parseRoute(pathname: string): Route {
  const path = pathname || "/";
  if (path === "/") return { page: "home" };
  if (path === "/fruits") return { page: "fruits" };
  if (path.startsWith("/fruits/")) return { page: "fruit-detail", slug: path.replace("/fruits/", "") };
  if (path === "/recipes") return { page: "recipes" };
  if (path.startsWith("/recipes/")) return { page: "recipe-detail", slug: path.replace("/recipes/", "") };
  if (path === "/seasonal-fruits") return { page: "seasonal-fruits" };
  if (path === "/buy-fruits") return { page: "buy-fruits" };
  if (path === "/about") return { page: "about" };
  if (path === "/contact") return { page: "contact" };
  if (path === "/food-ai") return { page: "food-ai" };
  if (path === "/income-guide") return { page: "income-guide" };
  if (path === "/health-wellness") return { page: "health-wellness" };
  if (path === "/assistant") return { page: "assistant" };
  if (path === "/store") return { page: "store" };
  if (path.startsWith("/checkout/")) return { page: "checkout", productId: path.replace("/checkout/", "") };
  if (path.startsWith("/ebook/")) return { page: "ebook", bookId: path.replace("/ebook/", "") };
  if (path === "/blog") return { page: "blog" };
  if (path.startsWith("/blog/")) return { page: "blog-post", slug: path.replace("/blog/", "") };
  if (path === "/fruit-match-up") return { page: "fruit-match-up" };
  if (path === "/compare") return { page: "compare" };
  if (path === "/wishlist") return { page: "wishlist" };
  if (path === "/quiz") return { page: "quiz" };
  if (path === "/quiz/results") return { page: "quiz-results" };
  if (path === "/sitemap-viewer") return { page: "sitemap-viewer" };
  if (path === "/privacy") return { page: "privacy" };
  if (path === "/terms") return { page: "terms" };
  if (path === "/medicinal-leaves") return { page: "medicinal-leaves" };
  if (path.startsWith("/medicinal-leaves/")) return { page: "medicinal-leaf-detail", slug: path.replace("/medicinal-leaves/", "") };
  return { page: "not-found", path };
}

export function navigate(path: string) {
  // History API navigation (no hash) for better SEO and consistent canonicals.
  if (window.location.pathname !== path) {
    window.history.pushState({}, "", path);
  }
  // Notify listeners
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}


export function App() {
  const [themeMode, setThemeMode] = useState<ThemeMode>(getInitialTheme());
  const [route, setRoute] = useState<Route>(parseRoute(window.location.pathname));

  useEffect(() => {
    applyTheme(themeMode);
  }, [themeMode]);

  useEffect(() => {
    const handler = () => {
      setRoute(parseRoute(window.location.pathname));
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  const renderPage = () => {
    switch (route.page) {
      case "home": return <HomePage />;
      case "fruits": return <FruitsPage />;
      case "fruit-detail": return <FruitDetailPage slug={route.slug} />;
      case "recipes": return <RecipesPage />;
      case "recipe-detail": return <RecipeDetailPage slug={route.slug} />;
      case "seasonal-fruits": return <SeasonalFruitsPage />;
      case "buy-fruits": return <BuyFruitsPage />;
      case "about": return <AboutPage />;
      case "contact": return <ContactPage />;
      case "food-ai": return <FoodAIPage />;
      case "income-guide": return <IncomeGuidePage />;
      case "health-wellness": return <HealthWellnessPage />;
      case "assistant": return <SmartAssistantPage />;
      case "store": return <StorePage />;
      case "checkout": return <CheckoutPage productId={route.productId} />;
      case "ebook": return <EbookPreviewPage bookId={route.bookId} />;
      case "blog": return <BlogPage />;
      case "blog-post": return <BlogPostPage slug={route.slug} />;
      case "fruit-match-up": return <FruitMatchUpPage />;
      case "compare": return <ComparePage />;
      case "wishlist": return <WishlistPage />;
      case "quiz": return <QuizPage />;
      case "quiz-results": return <QuizResultsPage />;
      case "sitemap-viewer": return <SitemapViewerPage />;
      case "privacy": return <PrivacyPage />;
      case "terms": return <TermsPage />;
      case "medicinal-leaves": return <MedicinalLeavesPage />;
      case "medicinal-leaf-detail": return <MedicinalLeafDetailPage slug={route.slug} />;
      case "not-found": return <NotFoundPage path={route.path} />;
      default: return <NotFoundPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header
        currentRoute={route}
        themeMode={themeMode}
        onToggleTheme={() => setThemeMode((prev) => toggleTheme(prev))}
      />
      <main className="flex-1">
        <Suspense fallback={<PageFallback />}>
          {renderPage()}
        </Suspense>
      </main>
      <Footer />
      <LeadMagnetPopup />
    </div>
  );
}

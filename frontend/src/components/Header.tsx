import { useState } from "react";
import { navigate, type Route } from "../App";

const LOGO_URL = "https://raguzwxnrdanynjnppze.supabase.co/storage/v1/object/public/brand-assets/logo.png";

interface HeaderProps {
  currentRoute: Route;
  themeMode: "light" | "dark";
  onToggleTheme: () => void;
}

export function Header({ currentRoute, themeMode, onToggleTheme }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lifeToolsOpen, setLifeToolsOpen] = useState(false);

  const isActive = (page: string) => currentRoute.page === page;

  const mainNavLinks = [
    { label: "Home", path: "/", page: "home" },
    { label: "Fruits", path: "/fruits", page: "fruits" },
    { label: "Recipes", path: "/recipes", page: "recipes" },
    { label: "Seasonal", path: "/seasonal-fruits", page: "seasonal-fruits" },
  ];

  const lifeToolsLinks = [
    { label: "🍽️ Food AI", path: "/food-ai", page: "food-ai", desc: "Get meal suggestions from ingredients" },
    { label: "💰 Income Guide", path: "/income-guide", page: "income-guide", desc: "Practical income ideas" },
    { label: "🌿 Health & Wellness", path: "/health-wellness", page: "health-wellness", desc: "Food-based wellness tips" },
    { label: "🤖 Fruitsy Assistant", path: "/assistant", page: "assistant", desc: "AI-powered fruit assistant" },
    { label: "🍃 Medicinal Leaves", path: "/medicinal-leaves", page: "medicinal-leaves", desc: "Traditional Caribbean leaf knowledge" },
  ];

  const secondaryNavLinks = [
    { label: "📝 Blog", path: "/blog", page: "blog" },
    { label: "🎯 Quiz", path: "/quiz", page: "quiz" },
    { label: "⚖️ Compare", path: "/compare", page: "compare" },
    { label: "❤️ Wishlist", path: "/wishlist", page: "wishlist" },
    { label: "📚 Store", path: "/store", page: "store" },
    { label: "About", path: "/about", page: "about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-green-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <button
            onClick={() => { navigate("/"); setMobileOpen(false); }}
            className="flex items-center gap-2.5 group"
          >
            <img
              src={LOGO_URL}
              alt="IslandFruitGuide Logo"
              width={144}
              height={72}
              decoding="async"
              fetchPriority="high"
              className="h-[72px] w-auto object-contain -my-4"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'inline';
              }}
            />
            <span className="text-3xl hidden">🌴</span>
            <span className="font-heading text-xl font-bold text-leaf">
              Island<span className="text-mango">Fruit</span>Guide
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={onToggleTheme}
              className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-charcoal-light hover:bg-gray-100 hover:text-charcoal"
              aria-label="Toggle night mode"
            >
              {themeMode === "dark" ? "🌙" : "☀️"}
            </button>
            {mainNavLinks.map(link => (
              <button
                key={link.page}
                onClick={() => navigate(link.path)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.page)
                    ? "bg-leaf/10 text-leaf font-semibold"
                    : "text-charcoal-light hover:bg-gray-100 hover:text-charcoal"
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Life Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLifeToolsOpen(!lifeToolsOpen)}
                onBlur={() => setTimeout(() => setLifeToolsOpen(false), 200)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                  ["food-ai", "income-guide", "health-wellness", "assistant"].includes(currentRoute.page)
                    ? "bg-leaf/10 text-leaf font-semibold"
                    : "text-charcoal-light hover:bg-gray-100 hover:text-charcoal"
                }`}
              >
                Life Tools
                <svg className={`w-4 h-4 transition-transform ${lifeToolsOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {lifeToolsOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fade-in">
                  {lifeToolsLinks.map(link => (
                    <button
                      key={link.page}
                      onClick={() => { navigate(link.path); setLifeToolsOpen(false); }}
                      className={`w-full px-4 py-3 text-left hover:bg-leaf/5 transition-colors ${
                        isActive(link.page) ? "bg-leaf/5" : ""
                      }`}
                    >
                      <div className="font-medium text-sm text-charcoal">{link.label}</div>
                      <div className="text-xs text-charcoal-light mt-0.5">{link.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {secondaryNavLinks.map(link => (
              <button
                key={link.page}
                onClick={() => navigate(link.path)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.page)
                    ? "bg-leaf/10 text-leaf font-semibold"
                    : "text-charcoal-light hover:bg-gray-100 hover:text-charcoal"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle night mode"
            >
              {themeMode === "dark" ? "🌙" : "☀️"}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
            </button>
          </div>
        </div>

                  {/* Mobile Nav */}
          {mobileOpen && (
            <nav className="lg:hidden py-4 border-t border-gray-100 animate-fade-in">
            <div className="flex flex-col gap-1">
              <div className="px-4 py-2 text-xs font-semibold text-charcoal-light uppercase tracking-wider">
                Theme
              </div>
              <button
                onClick={() => { onToggleTheme(); setMobileOpen(false); }}
                className="px-4 py-3 rounded-lg text-left text-sm font-medium transition-all text-charcoal-light hover:bg-gray-50"
              >
                {themeMode === "dark" ? "Switch to Day Mode ☀️" : "Switch to Night Mode 🌙"}
              </button>

              <div className="border-t border-gray-100 my-2"></div>
              {mainNavLinks.map(link => (
                <button
                  key={link.page}
                  onClick={() => { navigate(link.path); setMobileOpen(false); }}
                  className={`px-4 py-3 rounded-lg text-left text-sm font-medium transition-all ${
                    isActive(link.page)
                      ? "bg-leaf/10 text-leaf"
                      : "text-charcoal-light hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </button>
              ))}

              {/* Life Tools Section */}
              <div className="px-4 py-2 text-xs font-semibold text-charcoal-light uppercase tracking-wider mt-2">
                Life Tools
              </div>
              {lifeToolsLinks.map(link => (
                <button
                  key={link.page}
                  onClick={() => { navigate(link.path); setMobileOpen(false); }}
                  className={`px-4 py-3 rounded-lg text-left text-sm font-medium transition-all ${
                    isActive(link.page)
                      ? "bg-leaf/10 text-leaf"
                      : "text-charcoal-light hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <div className="border-t border-gray-100 my-2"></div>

              {secondaryNavLinks.map(link => (
                <button
                  key={link.page}
                  onClick={() => { navigate(link.path); setMobileOpen(false); }}
                  className={`px-4 py-3 rounded-lg text-left text-sm font-medium transition-all ${
                    isActive(link.page)
                      ? "bg-leaf/10 text-leaf"
                      : "text-charcoal-light hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

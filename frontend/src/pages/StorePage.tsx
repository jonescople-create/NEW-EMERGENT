import { navigate } from "../App";
import { Breadcrumb } from "../components/Breadcrumb";
import { BookCover } from "../components/BookCover";
import { SoursopBookCover } from "../components/SoursopBookCover";
import { SuperfruitsBookCover } from "../components/SuperfruitsBookCover";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  type: "ebook" | "guide" | "bundle";
  features: string[];
  badge?: string;
  popular?: boolean;
  previewUrl?: string;
  downloadUrl?: string;
  coverType?: "caribbean" | "soursop" | "superfruits";
}

export const products: Product[] = [
  {
    id: "ebook-caribbean-fruit-guide",
    name: "The Caribbean Tropical Fruit Guide",
    description:
      "The ultimate ebook covering 50+ Caribbean and tropical fruits — recipes, health benefits, seasonal guides, nutrition facts, storage tips, and cultural history. Your complete tropical fruit encyclopedia in digital format.",
    price: 12.99,
    originalPrice: 19.99,
    currency: "USD",
    type: "ebook",
    features: [
      "50+ tropical fruits with full profiles",
      "100+ authentic Caribbean recipes",
      "Nutrition facts & health benefit breakdowns",
      "Seasonal availability calendar",
      "Storage & preparation guides",
      "Cultural history & traditional uses",
      "Beautiful food photography",
      "Instant PDF download",
      "Free lifetime updates",
    ],
    badge: "Bestseller",
    popular: true,
    previewUrl: "/ebook/caribbean-fruit-guide",
    downloadUrl: "https://image2url.com/r2/default/documents/1771979481368-df16b0ee-9819-4667-a8f2-4b3727d0f4b4.pdf",
    coverType: "caribbean",
  },
  {
    id: "ebook-soursop-guide",
    name: "The Soursop Guide: Nature's Green Powerhouse",
    description:
      "A comprehensive, evidence-based guide to soursop — covering real nutritional data, peer-reviewed health research, the cancer debate (fact vs. fiction), safe preparation methods, traditional uses, and critical safety precautions.",
    price: 8.99,
    originalPrice: 14.99,
    currency: "USD",
    type: "ebook",
    features: [
      "Complete nutritional profile with data tables",
      "Evidence-based health benefits with citations",
      "Cancer research analysis: fact vs. fiction",
      "Safe preparation & recipe guide",
      "Side effects & drug interaction warnings",
      "Traditional Caribbean uses documented",
      "15+ authentic soursop recipes",
      "Instant PDF download",
      "Free lifetime updates",
    ],
    badge: "Popular",
    popular: true,
    previewUrl: "/ebook/soursop-guide",
    downloadUrl: "https://image2url.com/r2/default/documents/1771979481368-df16b0ee-9819-4667-a8f2-4b3727d0f4b4.pdf",
    coverType: "soursop",
  },
  {
    id: "ebook-superfruits-guide",
    name: "The Complete Guide to Caribbean Superfruits: Soursop, Papaya & Banana",
    description:
      "Three tropical powerhouses in one comprehensive volume. Part 1 delivers an in-depth soursop guide with real nutritional data, the cancer debate (fact vs. fiction), a 7-day meal plan, and essential recipes. Part 2 features a curated papaya & banana recipe collection with international dishes. Includes safety precautions and evidence-based health information throughout.",
    price: 14.99,
    originalPrice: 24.99,
    currency: "USD",
    type: "ebook",
    features: [
      "3 superfruits covered in one complete volume",
      "7-day soursop meal plan with shopping list",
      "Cancer research: honest fact vs. fiction analysis",
      "Safety warnings & drug interaction guide",
      "Nutritional data tables with daily values",
      "Essential soursop recipes (juice, smoothie, ice cream, tea)",
      "Green Papaya Salad recipe (Som Tum style)",
      "Classic Banana Walnut Bread recipe",
      "120 pages of expert content",
      "Instant PDF download",
      "Free lifetime updates",
    ],
    badge: "New Release",
    popular: true,
    previewUrl: "/ebook/superfruits-guide",
    downloadUrl: "https://image2url.com/r2/default/documents/1771979481368-df16b0ee-9819-4667-a8f2-4b3727d0f4b4.pdf",
    coverType: "superfruits",
  },
  {
    id: "guide-income-starter-kit",
    name: "Caribbean Income Starter Kit",
    description:
      "A practical step-by-step guide to building income streams using Caribbean fruits and food — from juice businesses to online content creation and eco-tourism.",
    price: 9.99,
    originalPrice: 16.99,
    currency: "USD",
    type: "guide",
    features: [
      "12 proven income ideas with step-by-step plans",
      "Budget templates & cost calculators",
      "Marketing strategies for Caribbean businesses",
      "Social media content templates",
      "Supplier & resource directory",
      "Real case studies from Caribbean entrepreneurs",
      "Instant PDF download",
    ],
    downloadUrl: "https://image2url.com/r2/default/documents/1771979481368-df16b0ee-9819-4667-a8f2-4b3727d0f4b4.pdf",
  },
  {
    id: "guide-wellness-plan",
    name: "Tropical Fruit Wellness Plan",
    description:
      "A 30-day wellness plan built around Caribbean tropical fruits — daily meal plans, smoothie recipes, natural remedies education, and lifestyle tips for vibrant health.",
    price: 7.99,
    originalPrice: 12.99,
    currency: "USD",
    type: "guide",
    features: [
      "30-day structured meal plan",
      "40+ smoothie & juice recipes",
      "Natural remedies reference guide",
      "Shopping lists for each week",
      "Calorie & nutrition tracking sheets",
      "Mindfulness & lifestyle tips",
      "Instant PDF download",
    ],
    downloadUrl: "https://image2url.com/r2/default/documents/1771979481368-df16b0ee-9819-4667-a8f2-4b3727d0f4b4.pdf",
  },
  {
    id: "bundle-complete",
    name: "Complete IslandFruitGuide Bundle",
    description:
      "Get everything — all 3 ebooks, the Income Starter Kit, and the Wellness Plan bundled together at a massive discount. Best value for serious learners and entrepreneurs.",
    price: 34.99,
    originalPrice: 71.95,
    currency: "USD",
    type: "bundle",
    features: [
      "✅ The Caribbean Tropical Fruit Guide ($12.99)",
      "✅ The Soursop Guide ($8.99)",
      "✅ Caribbean Superfruits Guide ($14.99)",
      "✅ Caribbean Income Starter Kit ($9.99)",
      "✅ Tropical Fruit Wellness Plan ($7.99)",
      "Save $37 compared to buying separately",
      "All future updates included free",
      "Priority email support",
      "Bonus: Seasonal Fruit Calendar poster (digital)",
    ],
    badge: "Best Value",
    popular: true,
    downloadUrl: "https://image2url.com/r2/default/documents/1771979481368-df16b0ee-9819-4667-a8f2-4b3727d0f4b4.pdf",
  },
  {
    id: "ebook-tropical-drinks-collection",
    name: "Tropical Drinks Collection: 4 Signature Recipes",
    description:
      "A beautifully curated recipe book featuring four exclusive tropical drink recipes that showcase the best of Caribbean fruit beverages. Perfect for home mixologists, health enthusiasts, and anyone who loves refreshing tropical flavors.",
    price: 6.99,
    originalPrice: 9.99,
    currency: "USD",
    type: "ebook",
    features: [
      "4 exclusive signature tropical drink recipes",
      "Papaya-Passion-Guava Elixir (Island Trio)",
      "Lychee Dragon Fruit Splash",
      "Lychee Lime Cooler",
      "Dragon Fruit Coconut Refresher",
      "Professional drink photography for each recipe",
      "Detailed ingredient lists & measurements",
      "Step-by-step preparation instructions",
      "Serving suggestions & variations",
      "Mocktail and cocktail options",
      "Nutritional information & health benefits",
      "Tips for ingredient substitutions",
      "Instant PDF download",
      "Free lifetime updates",
    ],
    badge: "New",
    popular: false,
    downloadUrl: "https://image2url.com/r2/default/documents/1771979481368-df16b0ee-9819-4667-a8f2-4b3727d0f4b4.pdf",
  },
];

function ProductCover({ product, size = "xl" }: { product: Product; size?: "sm" | "md" | "lg" | "xl" }) {
  if (product.coverType === "soursop") return <SoursopBookCover size={size} rotate />;
  if (product.coverType === "superfruits") return <SuperfruitsBookCover size={size} rotate />;
  if (product.coverType === "caribbean") return <BookCover size={size} rotate />;
  return (
    <div className={`${size === "xl" ? "w-80 h-[440px]" : size === "lg" ? "w-64 h-88" : size === "md" ? "w-48 h-66" : "w-32 h-44"} bg-gradient-to-br from-leaf/20 to-mango/20 rounded-xl flex flex-col items-center justify-center gap-3 border border-gray-200`}>
      <span className="text-5xl">{product.type === "bundle" ? "📦" : "📖"}</span>
      <span className="font-heading font-bold text-charcoal text-center text-sm px-4">{product.name}</span>
    </div>
  );
}

export function StorePage() {
  const ebooks = products.filter((p) => p.type === "ebook");
  const guides = products.filter((p) => p.type === "guide");
  const bundle = products.find((p) => p.type === "bundle");

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-leaf to-leaf-light text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Store" }]} />
          <h1 className="font-heading text-3xl lg:text-5xl font-bold">
            Island<span className="text-mango">Fruit</span>Guide Store 📚
          </h1>
          <p className="text-white/80 mt-3 text-lg max-w-2xl">
            Premium ebooks, guides, and digital products to deepen your tropical fruit knowledge and build real income.
          </p>
        </div>
      </div>

      {/* ===== FEATURED EBOOKS ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="text-center mb-12">
          <span className="inline-block bg-leaf/10 text-leaf text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3">📚 Ebooks</span>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-charcoal">Our Ebooks</h2>
          <p className="text-charcoal-light mt-3">Comprehensive guides backed by real research and Caribbean expertise</p>
        </div>

        {ebooks.map((ebook, idx) => (
          <div key={ebook.id} className={`grid lg:grid-cols-2 gap-12 items-center ${idx > 0 ? "mt-20 pt-16 border-t border-gray-100" : ""}`}>
            {/* Book Cover - alternate sides */}
            <div className={`flex justify-center ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
              <ProductCover product={ebook} size="xl" />
            </div>

            {/* Product Info */}
            <div>
              {ebook.badge && (
                <span className="inline-block bg-coral text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
                  🔥 {ebook.badge}
                </span>
              )}
              <h2 className="font-heading text-2xl lg:text-3xl font-bold text-charcoal leading-tight">{ebook.name}</h2>
              <p className="text-charcoal-light mt-4 text-base leading-relaxed">{ebook.description}</p>

              {/* Price */}
              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-heading text-4xl font-bold text-leaf">${ebook.price}</span>
                {ebook.originalPrice && <span className="text-charcoal-light line-through text-lg">${ebook.originalPrice}</span>}
                {ebook.originalPrice && (
                  <span className="bg-coral/15 text-coral text-sm font-bold px-2 py-1 rounded-lg">
                    {Math.round(((ebook.originalPrice - ebook.price) / ebook.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              {/* Features */}
              <ul className="mt-5 space-y-2">
                {ebook.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-charcoal-light">
                    <span className="w-5 h-5 bg-leaf text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-7 flex flex-wrap gap-3">
                <button onClick={() => navigate(`/checkout/${ebook.id}`)} className="btn-primary text-base px-7 py-3.5 shadow-xl">
                  🛒 Buy Now — ${ebook.price}
                </button>
                {ebook.previewUrl && (
                  <button onClick={() => navigate(ebook.previewUrl!)} className="btn-secondary text-base">
                    📖 Read Free Preview
                  </button>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-charcoal-light">
                <span>🔒 Secure PayPal Checkout</span>
                <span>📥 Instant Download</span>
                <span>💯 30-Day Money Back</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ===== WHAT'S INSIDE ===== */}
      <section className="bg-gradient-to-br from-leaf/5 to-mango/5 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-charcoal">What's Inside the Books?</h2>
            <p className="text-charcoal-light mt-3 text-lg">A complete tropical fruit education in beautiful ebook format</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "🍎", title: "50+ Fruit Profiles", desc: "Complete guides for every Caribbean fruit with scientific data and cultural significance." },
              { icon: "🍽️", title: "115+ Recipes", desc: "Traditional Caribbean recipes — drinks, desserts, main courses, preserves, and fusion dishes." },
              { icon: "💚", title: "Health & Nutrition", desc: "Evidence-based health benefits with peer-reviewed citations and nutritional data tables." },
              { icon: "📅", title: "Seasonal Calendar", desc: "Month-by-month availability showing exactly when each fruit is in season." },
              { icon: "🔬", title: "Cancer Research", desc: "Honest analysis of soursop cancer research — what studies show and what they don't." },
              { icon: "📋", title: "7-Day Meal Plans", desc: "Complete weekly meal plans with shopping lists featuring tropical superfruits." },
              { icon: "⚠️", title: "Safety Guides", desc: "Drug interactions, side effects, and precautions documented for safe consumption." },
              { icon: "💰", title: "Income Ideas", desc: "Practical ways to turn fruit knowledge into income — businesses, content, and more." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-shadow">
                <span className="text-3xl block mb-3">{item.icon}</span>
                <h3 className="font-heading font-bold text-base text-charcoal">{item.title}</h3>
                <p className="text-xs text-charcoal-light mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SUPERFRUITS GUIDE SPOTLIGHT ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="bg-gradient-to-r from-[#BF360C] to-[#E65100] rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center p-8 lg:p-12">
            <div>
              <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">🆕 NEW RELEASE — 3 FRUITS, 1 BOOK</span>
              <h2 className="font-heading text-2xl lg:text-3xl font-bold text-white leading-tight">
                Caribbean Superfruits: Soursop, Papaya & Banana
              </h2>
              <p className="text-white/80 mt-3 leading-relaxed">
                The ultimate superfruit guide combining soursop health research, a complete 7-day meal plan, essential recipes, plus international papaya and banana recipes — all in one comprehensive volume. Includes the cancer debate, safety warnings, and nutritional data tables.
              </p>
              <div className="mt-4 space-y-2">
                {["7-day soursop meal plan with shopping list", "Cancer research: peer-reviewed facts", "Green Papaya Salad & Banana Bread recipes", "Drug interaction & safety warnings", "120 pages of expert content"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-white/90 text-sm">
                    <span className="text-[#FFD54F]">✓</span> {item}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={() => navigate("/checkout/ebook-superfruits-guide")} className="bg-[#FFD54F] text-[#BF360C] px-6 py-3 rounded-xl font-bold hover:brightness-110 transition-all shadow-lg">
                  🛒 Get It — $14.99
                </button>
                <button onClick={() => navigate("/ebook/superfruits-guide")} className="bg-white/15 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/25 transition-all border border-white/20">
                  📖 Free Preview
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <SuperfruitsBookCover size="lg" rotate />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SOURSOP GUIDE SPOTLIGHT ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-20">
        <div className="bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center p-8 lg:p-12">
            <div>
              <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">📗 DEEP DIVE</span>
              <h2 className="font-heading text-2xl lg:text-3xl font-bold text-white leading-tight">
                The Truth About Soursop
              </h2>
              <p className="text-white/80 mt-3 leading-relaxed">
                Can soursop really fight cancer? What does the science actually say? This guide cuts through the hype with peer-reviewed research, real nutritional data, and honest analysis. Learn the genuine health benefits — and the important safety warnings most sources don't mention.
              </p>
              <div className="mt-4 space-y-2">
                {["Cancer research: peer-reviewed facts", "Nutritional data tables from real studies", "Drug interaction & safety warnings", "Authentic Caribbean recipes included"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-white/90 text-sm">
                    <span className="text-[#A5D6A7]">✓</span> {item}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={() => navigate("/checkout/ebook-soursop-guide")} className="bg-[#A5D6A7] text-[#1B5E20] px-6 py-3 rounded-xl font-bold hover:brightness-110 transition-all shadow-lg">
                  🛒 Get It — $8.99
                </button>
                <button onClick={() => navigate("/ebook/soursop-guide")} className="bg-white/15 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/25 transition-all border border-white/20">
                  📖 Free Preview
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <SoursopBookCover size="lg" rotate />
            </div>
          </div>
        </div>
      </section>

      {/* ===== GUIDES ===== */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-mango/15 text-mango-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3">📖 Practical Guides</span>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-charcoal">More Digital Products</h2>
            <p className="text-charcoal-light mt-3">Practical tools and plans to help you thrive</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {guides.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all hover:shadow-xl">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">📖</span>
                    <span className="text-xs bg-leaf/10 text-leaf px-2 py-1 rounded-full font-medium uppercase">{product.type}</span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-charcoal">{product.name}</h3>
                  <p className="text-sm text-charcoal-light mt-2">{product.description}</p>
                  <ul className="mt-4 space-y-1.5">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-charcoal-light">
                        <span className="text-leaf flex-shrink-0 mt-0.5">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="font-heading text-2xl font-bold text-leaf">${product.price}</span>
                      {product.originalPrice && <span className="text-charcoal-light line-through text-sm ml-2">${product.originalPrice}</span>}
                    </div>
                    <button onClick={() => navigate(`/checkout/${product.id}`)} className="bg-leaf text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-leaf-dark transition-all">
                      🛒 Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BUNDLE ===== */}
      {bundle && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="bg-gradient-to-br from-mango/10 via-coral/5 to-leaf/10 rounded-3xl border-2 border-mango/30 p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block bg-mango text-charcoal text-xs font-bold px-3 py-1 rounded-full mb-4">⭐ BEST VALUE — SAVE $37</span>
                <h2 className="font-heading text-2xl lg:text-3xl font-bold text-charcoal">{bundle.name}</h2>
                <p className="text-charcoal-light mt-3">{bundle.description}</p>
                <ul className="mt-5 space-y-2">
                  {bundle.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-charcoal-light">
                      <span className="text-leaf flex-shrink-0 mt-0.5">{f.startsWith("✅") ? "" : "✓"}</span> {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <div>
                    <span className="font-heading text-4xl font-bold text-leaf">${bundle.price}</span>
                    {bundle.originalPrice && <span className="text-charcoal-light line-through text-lg ml-2">${bundle.originalPrice}</span>}
                  </div>
                  <button onClick={() => navigate(`/checkout/${bundle.id}`)} className="bg-mango text-charcoal px-8 py-4 rounded-xl font-bold text-lg hover:brightness-110 transition-all shadow-xl">
                    🛒 Get the Bundle
                  </button>
                </div>
              </div>
              <div className="flex justify-center gap-3 flex-wrap">
                <BookCover size="sm" rotate />
                <SoursopBookCover size="sm" rotate />
                <SuperfruitsBookCover size="sm" rotate />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== TESTIMONIALS ===== */}
      <section className="bg-charcoal text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold">What Readers Say</h2>
            <p className="text-gray-400 mt-3">Trusted by Caribbean food lovers worldwide</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Shanice M.", location: "Kingston, Jamaica", text: "This book changed how I look at our local fruits! The recipes are authentic and the health benefits section opened my eyes. Worth every penny.", stars: 5 },
              { name: "Devon T.", location: "Port of Spain, Trinidad", text: "The soursop guide is incredible. Finally someone giving honest, science-backed information instead of miracle cure nonsense. The cancer chapter is a must-read.", stars: 5 },
              { name: "Alicia R.", location: "Bridgetown, Barbados", text: "I bought the bundle — best decision. Started a juice business using recipes from the fruit guide and the income starter kit. Already profitable!", stars: 5 },
              { name: "Marcus J.", location: "Miami, USA", text: "The Superfruits guide meal plan is amazing. I followed the 7-day plan and felt so much more energized. The papaya salad recipe is now a weekly staple.", stars: 5 },
              { name: "Dr. Keisha W.", location: "Montego Bay, Jamaica", text: "I recommend the soursop guide to patients who ask about natural remedies. It's honest about what works and what doesn't, with proper references. Very responsible.", stars: 5 },
              { name: "Ravi P.", location: "Georgetown, Guyana", text: "The income starter kit alone paid for the entire bundle. I sell fruit preserves now using techniques from the book. Cleared $400 in my first month.", stars: 5 },
            ].map((review) => (
              <div key={review.name} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: review.stars }).map((_, i) => (<span key={i} className="text-mango text-base">★</span>))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed italic">"{review.text}"</p>
                <div className="mt-4 pt-3 border-t border-white/10">
                  <div className="font-semibold text-white text-sm">{review.name}</div>
                  <div className="text-gray-500 text-xs">{review.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <h2 className="font-heading text-3xl font-bold text-charcoal text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "What format are the ebooks?", a: "All ebooks are delivered as high-quality PDF files that work on any device — phone, tablet, laptop, or desktop. You can also print them." },
            { q: "How do I receive my purchase?", a: "After completing payment through PayPal, you'll receive an instant download link on the confirmation page. A copy is also sent to your PayPal email." },
            { q: "Is there a money-back guarantee?", a: "Yes! We offer a 30-day money-back guarantee. If you're not satisfied for any reason, contact us for a full refund — no questions asked." },
            { q: "Do I get free updates?", a: "Absolutely! When we add new content to the guides, you'll receive the updated version free via email." },
            { q: "What's the difference between the Soursop Guide and the Superfruits Guide?", a: "The Soursop Guide is a standalone deep-dive into soursop only (85 pages). The Superfruits Guide covers soursop, papaya, AND banana in one volume (120 pages) — including a 7-day meal plan, papaya salad recipe, and banana bread recipe that aren't in the standalone guide." },
            { q: "Is the soursop guide medical advice?", a: "No. All our guides are educational content only. They present peer-reviewed research and traditional uses but do not provide medical advice. Always consult a healthcare provider." },
            { q: "What payment methods do you accept?", a: "We accept PayPal and all major credit/debit cards (Visa, Mastercard, Amex) processed securely through PayPal's checkout system." },
            { q: "What's in the bundle?", a: "The Complete Bundle includes all 5 products: The Caribbean Tropical Fruit Guide, The Soursop Guide, the Superfruits Guide, the Income Starter Kit, and the Wellness Plan. You save $37 compared to buying separately." },
            { q: "Can I read a preview first?", a: "Yes! All 3 ebooks have free preview chapters. Click 'Read Free Preview' on any ebook to read multiple chapters before purchasing." },
          ].map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="font-heading font-bold text-charcoal">{faq.q}</h3>
              <p className="text-sm text-charcoal-light mt-2 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="bg-gradient-to-r from-leaf to-leaf-light py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white">Ready to Master Caribbean Fruits?</h2>
          <p className="text-white/80 mt-4 text-lg max-w-2xl mx-auto">
            Join thousands of readers who've transformed their knowledge of tropical fruits. Instant download, lifetime updates.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <button onClick={() => navigate("/checkout/ebook-caribbean-fruit-guide")} className="bg-mango text-charcoal px-8 py-4 rounded-xl font-bold text-lg hover:brightness-110 transition-all shadow-xl">
              🛒 Caribbean Guide — $12.99
            </button>
            <button onClick={() => navigate("/checkout/ebook-superfruits-guide")} className="bg-white text-leaf px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl">
              🛒 Superfruits Guide — $14.99
            </button>
            <button onClick={() => navigate("/checkout/bundle-complete")} className="bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-all border border-white/30">
              📦 Get the Bundle — $34.99
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

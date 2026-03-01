import { useEffect, useState } from "react";
import { navigate } from "../App";
import { getFruitBySlug, getRelatedFruits, fruits } from "../data/fruits";
import { getRecipesForFruit } from "../data/recipes";
import { blogPosts } from "../data/blogPosts";
import { RecipeCard } from "../components/RecipeCard";
import { Breadcrumb } from "../components/Breadcrumb";
import { recordFruitView } from "../utils/personalization";
import { isFruitFavorited, toggleFruitFavorite } from "../utils/favorites";
import { OptimizedImage } from "../components/OptimizedImage";
import { setupPageSEO } from "../utils/seo";

interface Props {
  slug: string;
}

export function FruitDetailPage({ slug }: Props) {
  const fruit = getFruitBySlug(slug);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    if (fruit) {
      recordFruitView(fruit.id);
      setFav(isFruitFavorited(fruit.id));
      
      // Setup SEO for this fruit page
      setupPageSEO({
        path: `/fruits/${fruit.slug}`,
        title: `${fruit.name} - ${fruit.local_names[0] || 'Tropical Fruit'} | IslandFruitGuide`,
        description: `Discover ${fruit.name}: ${fruit.description.substring(0, 150)}... Complete guide with nutritional facts, health benefits, recipes, and growing tips.`,
        image: fruit.image_url,
        type: 'article',
        breadcrumbs: [
          { name: 'Home', url: '/' },
          { name: 'Fruits', url: '/fruits' },
          { name: fruit.name, url: `/fruits/${fruit.slug}` }
        ]
      });
    }
  }, [fruit]);

  const handleFav = () => {
    if (!fruit) return;
    setFav(toggleFruitFavorite(fruit.id));
  };

  if (!fruit) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <span className="text-6xl block mb-4">🤔</span>
        <h1 className="font-heading text-2xl font-bold mb-4">Fruit Not Found</h1>
        <p className="text-charcoal-light mb-6">We couldn't find that fruit in our database.</p>
        <button onClick={() => navigate("/fruits")} className="btn-primary">← Back to Fruits</button>
      </div>
    );
  }

  const related = getRelatedFruits(fruit);
  const fruitRecipes = getRecipesForFruit(fruit.id);
  const hasImage = fruit.image_url && fruit.image_url.length > 0;

  const leafData = fruit.leaf_medicine;

  const faqEntities: Array<{["@type"]: string; name: string; acceptedAnswer: {["@type"]: string; text: string}}> = [
    {
      "@type": "Question",
      "name": `What is ${fruit.name}?`,
      "acceptedAnswer": { "@type": "Answer", "text": fruit.description }
    },
    {
      "@type": "Question",
      "name": `What are the health benefits of ${fruit.name}?`,
      "acceptedAnswer": { "@type": "Answer", "text": fruit.health_benefits.join(". ") }
    },
    {
      "@type": "Question",
      "name": `How to eat ${fruit.name}?`,
      "acceptedAnswer": { "@type": "Answer", "text": fruit.how_to_eat }
    }
  ];

  if (leafData?.has_leaf_use) {
    faqEntities.push({
      "@type": "Question",
      "name": `What are the traditional medicinal uses of ${fruit.name} leaves?`,
      "acceptedAnswer": { "@type": "Answer", "text": leafData.traditional_uses.join(". ") + ". " + leafData.disclaimer }
    });
    faqEntities.push({
      "@type": "Question",
      "name": `How to prepare ${fruit.name} leaf tea?`,
      "acceptedAnswer": { "@type": "Answer", "text": leafData.preparation + " Safety: " + leafData.safety_warnings.join(". ") }
    });
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqEntities
  };

  const leafSchema = leafData?.has_leaf_use ? {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": `${leafData.leaf_name} — Traditional Medicinal Uses`,
    "about": {
      "@type": "Drug",
      "name": leafData.leaf_name,
      "activeIngredient": `${fruit.name} (${fruit.scientific_name}) leaf extract`,
      "description": leafData.traditional_uses.join(". ")
    },
    "lastReviewed": "2025-06-14",
    "medicalAudience": { "@type": "MedicalAudience", "audienceType": "Patient" },
    "specialty": { "@type": "MedicalSpecialty", "name": "Herbal Medicine" },
    "disclaimer": leafData.disclaimer,
    "isPartOf": {
      "@type": "WebPage",
      "@id": `https://islandfruitguide.com/fruits/${fruit.slug}`
    }
  } : null;

  return (
    <div className="animate-fade-in">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {leafSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(leafSchema) }} />
      )}

      {/* Hero */}
      <div className="bg-gradient-to-r from-leaf to-leaf-light text-white py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Fruits", path: "/fruits" }, { label: fruit.name }]} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Fruit header */}
            <div className="flex flex-col sm:flex-row gap-6 items-start mb-8">
              <div
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden"
                style={!hasImage ? { background: `linear-gradient(135deg, ${fruit.color}22, ${fruit.color}55)` } : {}}
              >
                {hasImage ? (
                  <OptimizedImage
                    src={fruit.image_url}
                    alt={`Fresh ${fruit.name} tropical fruit – IslandFruitGuide`}
                    width={320}
                    height={320}
                    className="w-full h-full object-cover rounded-2xl"
                    fallbackEmoji={fruit.emoji}
                    sizes="160px"
                  />
                ) : (
                  <span className="text-7xl sm:text-8xl">{fruit.emoji}</span>
                )}
              </div>
              <div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {fruit.category.map(cat => (
                    <span key={cat} className={`category-badge ${
                      cat === "popular" ? "bg-mango/20 text-amber-800" :
                      cat === "seasonal" ? "bg-leaf/15 text-leaf-dark" :
                      cat === "rare" ? "bg-purple-100 text-purple-800" :
                      "bg-coral/15 text-red-800"
                    }`}>{cat}</span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <h1 className="font-heading text-3xl lg:text-4xl font-bold text-charcoal">{fruit.name}</h1>
                  <button
                    onClick={handleFav}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm border ${fav ? "bg-red-50 border-red-200 text-red-500" : "bg-white border-gray-200 text-gray-300 hover:text-red-400 hover:border-red-200"}`}
                    aria-label={fav ? "Remove from wishlist" : "Save to wishlist"}
                  >
                    {fav ? "❤️" : "🤍"}
                  </button>
                </div>
                <p className="text-charcoal-light italic mt-1">{fruit.scientific_name}</p>
                <div className="flex items-center gap-4 mt-3 text-sm text-charcoal-light">
                  <span>🌍 {fruit.origin}</span>
                  <span>📅 {fruit.seasonality}</span>
                </div>
              </div>
            </div>

            {/* Large hero image for fruits with images */}
            {hasImage && (
              <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
                <OptimizedImage
                  src={fruit.image_url}
                  alt={`Fresh ${fruit.name} tropical fruit – IslandFruitGuide`}
                  width={1200}
                  height={600}
                  className="w-full h-64 sm:h-80 object-cover"
                  hideOnError
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            )}

            {/* Description — AEO optimized */}
            <section className="mb-8">
              <h2 className="font-heading text-2xl font-bold text-charcoal mb-3">
                What is {fruit.name}?
              </h2>
              <p className="text-charcoal-light leading-relaxed text-base">{fruit.description}</p>
            </section>

            {/* Health Benefits */}
            <section className="mb-8 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-green-100">
              <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">
                💚 Health Benefits of {fruit.name}
              </h2>
              <ul className="space-y-3">
                {fruit.health_benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-leaf text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                    <span className="text-charcoal-light">{benefit}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* How to Eat */}
            <section className="mb-8">
              <h2 className="font-heading text-2xl font-bold text-charcoal mb-3">
                🍴 How to Eat {fruit.name}
              </h2>
              <p className="text-charcoal-light leading-relaxed">{fruit.how_to_eat}</p>
            </section>

            {/* Storage */}
            <section className="mb-8 bg-amber-50 rounded-2xl p-6 border border-amber-100">
              <h2 className="font-heading text-2xl font-bold text-charcoal mb-3">
                📦 Storage & Preparation
              </h2>
              <p className="text-charcoal-light leading-relaxed">{fruit.storage}</p>
            </section>

            {/* Nutrition */}
            <section className="mb-8">
              <h2 className="font-heading text-2xl font-bold text-charcoal mb-3">
                📊 Nutrition Facts
              </h2>
              <p className="text-charcoal-light leading-relaxed">{fruit.nutrition}</p>
            </section>

            {/* Recipes for this fruit */}
            {fruitRecipes.length > 0 && (
              <section className="mb-8">
                <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">
                  🍽️ {fruit.name} Recipes
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {fruitRecipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Info */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-heading font-bold text-lg text-charcoal mb-4">Quick Facts</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal-light">Season</span>
                    <span className="font-medium text-charcoal">{fruit.seasonality}</span>
                  </div>
                  <hr className="border-gray-100" />
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal-light">Origin</span>
                    <span className="font-medium text-charcoal text-right max-w-[60%]">{fruit.origin}</span>
                  </div>
                  <hr className="border-gray-100" />
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal-light">Categories</span>
                    <span className="font-medium text-charcoal">{fruit.category.join(", ")}</span>
                  </div>
                  <hr className="border-gray-100" />
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal-light">Views</span>
                    <span className="font-medium text-charcoal">{fruit.views.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Related Fruits */}
              {related.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-heading font-bold text-lg text-charcoal mb-4">Related Fruits</h3>
                  <div className="space-y-3">
                    {related.map(rf => (
                      <button
                        key={rf.id}
                        onClick={() => navigate(`/fruits/${rf.slug}`)}
                        className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-leaf/5 transition-colors text-left"
                      >
                        {rf.image_url ? (
                          <OptimizedImage
                            src={rf.image_url}
                            alt={`Fresh ${rf.name} tropical fruit – IslandFruitGuide`}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-lg object-cover"
                            fallbackEmoji={rf.emoji}
                            sizes="40px"
                          />
                        ) : (
                          <span className="text-2xl w-10 h-10 flex items-center justify-center">{rf.emoji}</span>
                        )}
                        <div>
                          <div className="font-medium text-sm text-charcoal">{rf.name}</div>
                          <div className="text-xs text-charcoal-light">{rf.scientific_name}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Blog Articles */}
              {(() => {
                const relatedPosts = blogPosts.filter(p => p.relatedFruitSlugs.includes(fruit.slug));
                if (relatedPosts.length === 0) return null;
                return (
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="font-heading font-bold text-lg text-charcoal mb-4">📝 Articles About {fruit.name}</h3>
                    <div className="space-y-3">
                      {relatedPosts.map(post => (
                        <button
                          key={post.id}
                          onClick={() => navigate(`/blog/${post.slug}`)}
                          className="block w-full text-left p-3 rounded-xl hover:bg-leaf/5 transition-colors group"
                        >
                          <h4 className="text-sm font-medium text-charcoal group-hover:text-leaf transition-colors leading-snug">{post.title}</h4>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-xs bg-leaf/10 text-leaf px-2 py-0.5 rounded-full">{post.category}</span>
                            <span className="text-xs text-charcoal-light">{post.readTime}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Compare This Fruit */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
                <h3 className="font-heading font-bold text-lg text-charcoal mb-2">⚖️ Compare {fruit.name}</h3>
                <p className="text-charcoal-light text-sm mb-4">See how {fruit.name} stacks up against other tropical fruits — nutrition, taste, and uses side by side.</p>
                <button onClick={() => navigate("/compare")} className="w-full bg-white text-purple-700 font-semibold px-4 py-2.5 rounded-xl hover:bg-purple-50 transition-colors text-sm border border-purple-200">
                  Open Comparison Tool →
                </button>
              </div>

              {/* Fruit Match-Up */}
              <div className="bg-gradient-to-br from-mango/10 to-coral/10 rounded-2xl p-6 border border-mango/20">
                <h3 className="font-heading font-bold text-lg text-charcoal mb-2">🏆 Fruit Match-Up</h3>
                <p className="text-charcoal-light text-sm mb-4">Soursop vs Sweetsop? Papaya vs Banana? Discover which Caribbean superfruit is your perfect match.</p>
                <button onClick={() => navigate("/fruit-match-up")} className="w-full bg-mango text-charcoal font-semibold px-4 py-2.5 rounded-xl hover:bg-amber-500 transition-colors text-sm">
                  Find Your Match →
                </button>
              </div>

              {/* Quiz CTA */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
                <h3 className="font-heading font-bold text-lg text-charcoal mb-2">🧠 Test Your Fruit IQ</h3>
                <p className="text-charcoal-light text-sm mb-4">Think you know Caribbean fruits? Take our 5-question quiz and unlock a special reward!</p>
                <button onClick={() => navigate("/quiz")} className="w-full bg-coral text-white font-semibold px-4 py-2.5 rounded-xl hover:bg-red-500 transition-colors text-sm">
                  Take the Quiz →
                </button>
              </div>

              {/* Ebook CTA */}
              <div className="bg-gradient-to-br from-leaf/10 to-emerald-50 rounded-2xl p-6 border border-leaf/20">
                <h3 className="font-heading font-bold text-lg text-charcoal mb-2">📚 Caribbean Fruit Guide</h3>
                <p className="text-charcoal-light text-sm mb-4">Get our premium ebooks with 50+ fruit profiles, 100+ recipes, meal plans, and expert health research.</p>
                <button onClick={() => navigate("/store")} className="w-full bg-leaf text-white font-semibold px-4 py-2.5 rounded-xl hover:bg-leaf-dark transition-colors text-sm">
                  Browse Ebooks →
                </button>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-leaf to-leaf-light rounded-2xl p-6 text-white">
                <h3 className="font-heading font-bold text-lg mb-2">🌴 Explore More Fruits</h3>
                <p className="text-white/80 text-sm mb-4">Discover our complete collection of tropical fruits.</p>
                <button onClick={() => navigate("/fruits")} className="w-full bg-white text-leaf font-semibold px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                  Browse All Fruits
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ===== RECOMMENDED / YOU MAY ALSO LIKE ===== */}
        {(() => {
          const recommended = fruits
            .filter(f => f.id !== fruit.id && !fruit.related_fruit_ids.includes(f.id))
            .filter(f => f.category.some(c => fruit.category.includes(c)))
            .slice(0, 4);
          if (recommended.length === 0) return null;
          return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <div className="border-t border-gray-100 pt-10">
                <h2 className="font-heading text-2xl font-bold text-charcoal mb-6">
                  🧡 You May Also Like
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  {recommended.map(rf => (
                    <button
                      key={rf.id}
                      onClick={() => navigate(`/fruits/${rf.slug}`)}
                      className="fruit-card-hover bg-white rounded-2xl p-4 border border-gray-100 text-left group cursor-pointer"
                    >
                      <div className="w-full aspect-square rounded-xl mb-3 overflow-hidden">
                        {rf.image_url ? (
                          <OptimizedImage
                            src={rf.image_url}
                            alt={`Fresh ${rf.name} tropical fruit – IslandFruitGuide`}
                            width={320}
                            height={320}
                            className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
                            fallbackEmoji={rf.emoji}
                            sizes="(max-width: 768px) 45vw, 320px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-5xl" style={{ background: `linear-gradient(135deg, ${rf.color}22, ${rf.color}44)` }}>{rf.emoji}</div>
                        )}
                      </div>
                      <h3 className="font-heading font-semibold text-charcoal group-hover:text-leaf transition-colors">{rf.name}</h3>
                      <p className="text-xs text-charcoal-light italic">{rf.scientific_name}</p>
                      <span className="inline-flex items-center gap-1 text-leaf text-sm font-medium mt-2">View Guide →</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

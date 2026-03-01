import { useEffect, useState } from "react";
import { navigate } from "../App";
import { getRecipeBySlug, recipes } from "../data/recipes";
import { getFruitById } from "../data/fruits";
import { blogPosts } from "../data/blogPosts";
import { Breadcrumb } from "../components/Breadcrumb";
import { recordRecipeView } from "../utils/personalization";
import { isRecipeFavorited, toggleRecipeFavorite } from "../utils/favorites";
import { OptimizedImage } from "../components/OptimizedImage";

interface Props {
  slug: string;
}

export function RecipeDetailPage({ slug }: Props) {
  const recipe = getRecipeBySlug(slug);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    if (recipe) {
      recordRecipeView(recipe.id);
      setFav(isRecipeFavorited(recipe.id));
    }
  }, [recipe]);

  const handleFav = () => {
    if (!recipe) return;
    setFav(toggleRecipeFavorite(recipe.id));
  };

  if (!recipe) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <span className="text-6xl block mb-4">🤔</span>
        <h1 className="font-heading text-2xl font-bold mb-4">Recipe Not Found</h1>
        <button onClick={() => navigate("/recipes")} className="btn-primary">← Back to Recipes</button>
      </div>
    );
  }

  const relatedFruits = recipe.related_fruit_ids.map(id => getFruitById(id)).filter(Boolean);
  const hasImage = recipe.image_url && recipe.image_url.length > 0;

  const recipeSchema = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": recipe.title,
    "description": recipe.description,
    "prepTime": `PT${parseInt(recipe.prep_time)}M`,
    "cookTime": recipe.cook_time !== "0 min" ? `PT${parseInt(recipe.cook_time)}M` : undefined,
    "recipeYield": `${recipe.servings} servings`,
    "recipeIngredient": recipe.ingredients,
    "recipeInstructions": recipe.instructions.map(step => ({ "@type": "HowToStep", "text": step })),
    "image": recipe.image_url || undefined,
  };

  return (
    <div className="animate-fade-in">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }} />

      <div className="bg-gradient-to-r from-coral to-mango text-white py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Recipes", path: "/recipes" }, { label: recipe.title }]} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Hero Image */}
        {hasImage && (
          <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
            <OptimizedImage
              src={recipe.image_url}
              alt={`${recipe.title} – IslandFruitGuide Recipe`}
              width={1200}
              height={720}
              priority
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              hideOnError
              sizes="(max-width: 768px) 100vw, 900px"
            />
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-charcoal">{recipe.title}</h1>
            <button
              onClick={handleFav}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm border flex-shrink-0 ${fav ? "bg-red-50 border-red-200 text-red-500" : "bg-white border-gray-200 text-gray-300 hover:text-red-400 hover:border-red-200"}`}
              aria-label={fav ? "Remove from wishlist" : "Save to wishlist"}
            >
              {fav ? "❤️" : "🤍"}
            </button>
          </div>
          <p className="text-charcoal-light mt-2 text-lg">{recipe.description}</p>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
            <span className="flex items-center gap-1 bg-leaf/10 text-leaf px-3 py-1.5 rounded-lg font-medium">⏱️ Prep: {recipe.prep_time}</span>
            <span className="flex items-center gap-1 bg-coral/10 text-coral px-3 py-1.5 rounded-lg font-medium">🔥 Cook: {recipe.cook_time}</span>
            <span className="flex items-center gap-1 bg-mango/10 text-amber-800 px-3 py-1.5 rounded-lg font-medium">👥 Serves {recipe.servings}</span>
            <span className="flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-lg font-medium">📊 {recipe.difficulty}</span>
          </div>
        </div>

        {/* Related Fruits */}
        <div className="mb-8">
          <h2 className="font-heading text-xl font-bold text-charcoal mb-3">Featured Fruits</h2>
          <div className="flex flex-wrap gap-2">
            {relatedFruits.map(f => f && (
              <button
                key={f.id}
                onClick={() => navigate(`/fruits/${f.slug}`)}
                className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl hover:border-leaf hover:bg-leaf/5 transition-all"
              >
                {f.image_url ? (
                  <OptimizedImage
                    src={f.image_url}
                    alt={`Fresh ${f.name} tropical fruit – IslandFruitGuide`}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-lg object-cover"
                    fallbackEmoji={f.emoji}
                    sizes="32px"
                  />
                ) : (
                  <span className="text-xl">{f.emoji}</span>
                )}
                <span className="font-medium text-sm text-charcoal">{f.name}</span>
                <span className="text-leaf text-xs">→</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Ingredients */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
            <h2 className="font-heading text-xl font-bold text-charcoal mb-4">🥘 Ingredients</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-charcoal-light">
                  <span className="w-5 h-5 bg-mango/30 rounded flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">•</span>
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h2 className="font-heading text-xl font-bold text-charcoal mb-4">📝 Instructions</h2>
            <ol className="space-y-4">
              {recipe.instructions.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-7 h-7 bg-leaf text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                  <span className="text-sm text-charcoal-light leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* ===== CONTEXTUAL INTERNAL LINKS ===== */}
        {(() => {
          const fruitSlugs = recipe.related_fruit_ids.map(id => getFruitById(id)).filter(Boolean).map(f => f!.slug);
          const relatedPosts = blogPosts.filter(p => p.relatedFruitSlugs.some(s => fruitSlugs.includes(s)));
          return (
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Related blog articles */}
              {relatedPosts.length > 0 && (
                <div className="bg-gradient-to-br from-leaf/5 to-emerald-50 rounded-2xl p-5 border border-leaf/10">
                  <h3 className="font-heading font-bold text-base text-charcoal mb-3">📝 Related Articles</h3>
                  <div className="space-y-2">
                    {relatedPosts.slice(0, 3).map(post => (
                      <button
                        key={post.id}
                        onClick={() => navigate(`/blog/${post.slug}`)}
                        className="block w-full text-left p-2 rounded-lg hover:bg-white/80 transition-colors group"
                      >
                        <h4 className="text-sm font-medium text-charcoal group-hover:text-leaf transition-colors leading-snug line-clamp-2">{post.title}</h4>
                        <span className="text-xs text-charcoal-light">{post.readTime}</span>
                      </button>
                    ))}
                  </div>
                  <button onClick={() => navigate("/blog")} className="text-leaf text-sm font-medium mt-2 hover:underline">
                    More articles →
                  </button>
                </div>
              )}

              {/* Ebook CTA */}
              <div className="bg-gradient-to-br from-mango/10 to-coral/10 rounded-2xl p-5 border border-mango/20">
                <h3 className="font-heading font-bold text-base text-charcoal mb-2">📚 100+ Island Recipes</h3>
                <p className="text-charcoal-light text-sm mb-3">Love this recipe? Get our complete ebook collection with meal plans, health guides, and expert tips.</p>
                <button onClick={() => navigate("/store")} className="w-full bg-mango text-charcoal font-semibold px-4 py-2 rounded-xl hover:bg-amber-500 transition-colors text-sm">
                  Browse Ebooks →
                </button>
              </div>

              {/* Quiz / Tools CTA */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-5 border border-purple-100">
                <h3 className="font-heading font-bold text-base text-charcoal mb-2">🧠 Caribbean Fruit Quiz</h3>
                <p className="text-charcoal-light text-sm mb-3">Test your tropical fruit knowledge and unlock exclusive rewards and discount codes!</p>
                <button onClick={() => navigate("/quiz")} className="w-full bg-purple-600 text-white font-semibold px-4 py-2 rounded-xl hover:bg-purple-700 transition-colors text-sm">
                  Take the Quiz →
                </button>
              </div>
            </div>
          );
        })()}

        {/* ===== RECOMMENDED RECIPES ===== */}
        {(() => {
          const recommended = recipes
            .filter(r => r.id !== recipe.id)
            .filter(r => r.related_fruit_ids.some(id => recipe.related_fruit_ids.includes(id)))
            .slice(0, 3);
          const fallback = recommended.length < 3
            ? recipes.filter(r => r.id !== recipe.id && !recommended.some(rr => rr.id === r.id)).slice(0, 3 - recommended.length)
            : [];
          const all = [...recommended, ...fallback];
          if (all.length === 0) return null;
          return (
            <div className="mt-12 border-t border-gray-100 pt-10">
              <h2 className="font-heading text-2xl font-bold text-charcoal mb-6">
                🧡 You May Also Like
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {all.map(r => (
                  <button
                    key={r.id}
                    onClick={() => navigate(`/recipes/${r.slug}`)}
                    className="recipe-card-hover bg-white rounded-2xl border border-gray-100 text-left group cursor-pointer overflow-hidden"
                  >
                    <div className="w-full h-36 bg-gradient-to-br from-mango/20 to-coral/10 overflow-hidden">
                      {r.image_url ? (
                        <OptimizedImage
                          src={r.image_url}
                          alt={`${r.title} – IslandFruitGuide Recipe`}
                          width={480}
                          height={288}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          fallbackEmoji="🍽️"
                          sizes="(max-width: 768px) 90vw, 320px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl">🍽️</div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading font-semibold text-sm text-charcoal group-hover:text-leaf transition-colors leading-snug line-clamp-2">{r.title}</h3>
                      <div className="flex items-center gap-2 mt-2 text-xs text-charcoal-light">
                        <span>⏱️ {r.prep_time}</span>
                        <span>•</span>
                        <span>{r.difficulty}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Back */}
        <div className="mt-12 text-center">
          <button onClick={() => navigate("/recipes")} className="btn-primary">
            ← More Recipes
          </button>
        </div>
      </div>
    </div>
  );
}

import { navigate } from "../App";
import { Breadcrumb } from "../components/Breadcrumb";

export function AboutPage() {
  return (
    <div className="animate-fade-in">
      <div className="bg-gradient-to-r from-leaf to-leaf-light text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "About" }]} />
          <h1 className="font-heading text-3xl lg:text-5xl font-bold">About IslandFruitGuide 🌴</h1>
          <p className="text-white/80 mt-3 text-lg max-w-2xl">
            The Caribbean's premier tropical fruit knowledge platform
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Mission */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">Our Mission</h2>
          <p className="text-charcoal-light leading-relaxed text-lg">
            IslandFruitGuide was created to preserve and share the rich tropical fruit knowledge of the Caribbean. 
            Our goal is to be the world's most comprehensive, accurate, and accessible resource for tropical fruit 
            education — helping people discover, prepare, and enjoy these incredible natural gifts.
          </p>
        </section>

        {/* What we offer */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl font-bold text-charcoal mb-6">What We Offer</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: "📚", title: "Fruit Encyclopedia", desc: "Comprehensive guides for every Caribbean and tropical fruit with nutrition facts, health benefits, and preparation tips." },
              { icon: "🍽️", title: "Traditional Recipes", desc: "Authentic Caribbean recipes passed down through generations, featuring tropical fruits as star ingredients." },
              { icon: "📅", title: "Seasonal Guides", desc: "Know exactly what's ripe and available each month so you never miss your favorite fruits." },
              { icon: "💚", title: "Health & Wellness", desc: "Evidence-based health benefits and medicinal uses of tropical fruits from the Caribbean tradition." },
            ].map(item => (
              <div key={item.title} className="bg-gradient-to-br from-leaf/5 to-mango/5 rounded-2xl p-6 border border-gray-100">
                <span className="text-3xl block mb-3">{item.icon}</span>
                <h3 className="font-heading font-bold text-charcoal mb-2">{item.title}</h3>
                <p className="text-sm text-charcoal-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">Our Values</h2>
          <div className="space-y-4">
            {[
              { title: "Accuracy First", desc: "Every piece of information is researched and verified. We consult with nutritionists, farmers, and cultural experts." },
              { title: "Cultural Preservation", desc: "We honor the Caribbean tradition of fruit knowledge passed down through generations." },
              { title: "Accessibility", desc: "Our content is free, easy to understand, and available to everyone worldwide." },
              { title: "Sustainability", desc: "We promote sustainable farming practices and support local Caribbean fruit farmers." },
            ].map(val => (
              <div key={val.title} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100">
                <span className="w-8 h-8 bg-leaf text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">✓</span>
                <div>
                  <h3 className="font-heading font-semibold text-charcoal">{val.title}</h3>
                  <p className="text-sm text-charcoal-light mt-1">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Future Plans */}
        <section className="bg-charcoal text-white rounded-2xl p-8 mb-12">
          <h2 className="font-heading text-2xl font-bold mb-4">🚀 Coming Soon</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "📖 Downloadable fruit ebooks & guides",
              "🤖 AI-powered fruit chatbot (Fruitsy)",
              "🔄 Fruit comparison tool",
              "🛒 Caribbean fruit marketplace",
              "📱 Mobile app for iOS & Android",
              "🎓 Online tropical fruit courses",
            ].map(item => (
              <div key={item} className="flex items-center gap-2 text-gray-300 text-sm">
                {item}
              </div>
            ))}
          </div>
        </section>

        <div className="text-center">
          <button onClick={() => navigate("/contact")} className="btn-primary text-lg">
            Get in Touch →
          </button>
        </div>
      </div>
    </div>
  );
}

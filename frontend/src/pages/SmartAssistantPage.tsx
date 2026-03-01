import { useState } from "react";
import { navigate } from "../App";
import { searchFruits, fruits } from "../data/fruits";
import { searchRecipes } from "../data/recipes";
import { Breadcrumb } from "../components/Breadcrumb";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function SmartAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "assistant",
      content: "Hi! I'm Fruitsy 🍎, your Caribbean fruit assistant! I can help you with:\n\n• Finding fruits and their health benefits\n• Suggesting recipes based on ingredients\n• Nutrition and storage tips\n• Income ideas using tropical fruits\n\nWhat would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    "What fruits are in season now?",
    "I have mango and coconut, what can I make?",
    "Health benefits of soursop",
    "How to store breadfruit?",
    "Best fruits for smoothies",
    "How can I make money with fruits?",
    "Compare soursop vs sweetsop",
    "Show me the fruit match-up quiz",
    "Find Health & Beauty products"
  ];

  const generateResponse = (query: string): string => {
    const q = query.toLowerCase();

    // Season query
    if (q.includes("season") || q.includes("ripe") || q.includes("available")) {
      const month = new Date().toLocaleString('default', { month: 'long' });
      const seasonalFruits = fruits.filter(f => 
        f.seasonality.toLowerCase().includes(month.toLowerCase().substring(0, 3)) || 
        f.seasonality.includes("Year-round")
      );
      const fruitNames = seasonalFruits.slice(0, 5).map(f => f.name).join(", ");
      return `🌦️ **Fruits in Season (${month}):**\n\n${fruitNames}, and more!\n\nTip: Year-round fruits like coconut, papaya, and banana are always available.\n\n[👉 View full seasonal guide](/seasonal-fruits)`;
    }

    // Recipe/cooking query
    if (q.includes("make") || q.includes("recipe") || q.includes("cook") || q.includes("what can i")) {
      const foundRecipes = searchRecipes(q);
      if (foundRecipes.length > 0) {
        const recipeNames = foundRecipes.slice(0, 3).map(r => `• ${r.title}`).join("\n");
        return `🍽️ **Here are some recipes you might like:**\n\n${recipeNames}\n\n[👉 Browse all recipes](/recipes)`;
      }
      // Check for ingredient mentions
      const matchedFruits = searchFruits(q);
      if (matchedFruits.length > 0) {
        const fruit = matchedFruits[0];
        return `With **${fruit.name}**, you can make:\n\n• Fresh ${fruit.name.toLowerCase()} juice or smoothie\n• ${fruit.name} chutney or jam\n• Add to fruit salads\n• Use in desserts and ice cream\n\nStorage tip: ${fruit.storage.substring(0, 100)}...\n\n[👉 See ${fruit.name} recipes](/fruits/${fruit.slug})`;
      }
      return `I'd be happy to suggest recipes! Could you tell me what fruits or ingredients you have available? For example: "I have mango and coconut"`;
    }

    // Health benefits query
    if (q.includes("health") || q.includes("benefit") || q.includes("good for") || q.includes("nutrition")) {
      const matchedFruits = searchFruits(q);
      if (matchedFruits.length > 0) {
        const fruit = matchedFruits[0];
        const benefits = fruit.health_benefits.slice(0, 3).map(b => `✓ ${b}`).join("\n");
        return `💚 **Health Benefits of ${fruit.name}:**\n\n${benefits}\n\n**Nutrition:** ${fruit.nutrition.substring(0, 150)}...\n\n[👉 Full ${fruit.name} guide](/fruits/${fruit.slug})`;
      }
      return `Caribbean fruits are packed with nutrients! Some highlights:\n\n• **Guava**: 4x more Vitamin C than oranges\n• **Soursop**: Powerful antioxidants\n• **Coconut**: Healthy MCTs for energy\n• **Papaya**: Digestive enzymes\n\n[👉 Explore health guides](/health-wellness)`;
    }

    // Storage query
    if (q.includes("store") || q.includes("keep") || q.includes("fresh") || q.includes("preserve")) {
      const matchedFruits = searchFruits(q);
      if (matchedFruits.length > 0) {
        const fruit = matchedFruits[0];
        return `📦 **How to Store ${fruit.name}:**\n\n${fruit.storage}\n\n**Pro tip:** Most tropical fruits should be ripened at room temperature, then refrigerated once ripe.\n\n[👉 Full ${fruit.name} guide](/fruits/${fruit.slug})`;
      }
      return `General tropical fruit storage tips:\n\n• Ripen at room temperature\n• Refrigerate once ripe\n• Most last 3-7 days when refrigerated\n• Freeze puréed fruit for smoothies\n\nWhich fruit do you want specific storage tips for?`;
    }

    // Money/income query
    if (q.includes("money") || q.includes("income") || q.includes("sell") || q.includes("business") || q.includes("earn")) {
      return `💰 **Ways to Earn with Tropical Fruits:**\n\n• Start a juice/smoothie business\n• Sell homemade jams and preserves\n• Fruit farming and direct sales\n• Create content about Caribbean food\n• Offer fruit-based catering\n\n[👉 Full Income Guide](/income-guide)`;
    }

    // Comparison / match-up / quiz
    if (q.includes("compare") || q.includes("match") || q.includes("match-up") || q.includes("versus") || q.includes("vs") || q.includes("quiz")) {
      return `🥊 **Try our interactive tools:**\n\n• Fruit Match-Up: compare Soursop vs Sweetsop, Papaya vs Banana\n• Fruit Comparison Tool: side-by-side nutrition and benefits\n• Caribbean Superfruit IQ Quiz\n\n[👉 Fruit Match-Up](/fruit-match-up)\n[👉 Compare Fruits](/compare)\n[👉 Take the Quiz](/quiz)`;
    }

    // Health & Beauty products
    if (q.includes("beauty") || q.includes("skincare") || q.includes("body oil") || q.includes("mask") || q.includes("hair")) {
      return `✨ **Health & Beauty Collection:**\n\nExplore tropical fruit skincare, body oils, hair masks, and more — powered by papaya, soursop, coconut, and guava.\n\n[👉 Shop Health & Beauty](/health-beauty)`;
    }

    // How to eat query
    if (q.includes("how to eat") || q.includes("how do you eat") || q.includes("prepare")) {
      const matchedFruits = searchFruits(q);
      if (matchedFruits.length > 0) {
        const fruit = matchedFruits[0];
        return `🍴 **How to Eat ${fruit.name}:**\n\n${fruit.how_to_eat}\n\n[👉 Full ${fruit.name} guide](/fruits/${fruit.slug})`;
      }
      return `I can tell you how to prepare any tropical fruit! Just ask me about a specific fruit like "How to eat soursop?" or "How to prepare breadfruit?"`;
    }

    // Smoothie query
    if (q.includes("smoothie") || q.includes("juice") || q.includes("drink") || q.includes("blend")) {
      return `🥤 **Best Fruits for Smoothies:**\n\n• **Mango**: Sweet, creamy base\n• **Papaya**: Tropical flavor + digestive enzymes\n• **Soursop**: Unique sweet-sour taste\n• **Banana**: Natural sweetness + thickness\n• **Passion Fruit**: Tangy flavor punch\n\n**Pro tip:** Freeze fruits in advance for thick, cold smoothies without ice!\n\n[👉 See smoothie recipes](/recipes)`;
    }

    // General fruit query
    const matchedFruits = searchFruits(q);
    if (matchedFruits.length > 0) {
      const fruit = matchedFruits[0];
      return `🍎 **${fruit.name}** (${fruit.scientific_name})\n\n${fruit.description.substring(0, 200)}...\n\n**Season:** ${fruit.seasonality}\n**Origin:** ${fruit.origin}\n\n[👉 Full ${fruit.name} guide](/fruits/${fruit.slug})`;
    }

    // Default response
    return `Thanks for your question! I'm here to help with Caribbean tropical fruits. You can ask me about:\n\n• Specific fruits (e.g., "Tell me about soursop")\n• Recipes (e.g., "What can I make with mango?")\n• Health benefits (e.g., "Benefits of guava")\n• Storage tips (e.g., "How to store breadfruit?")\n• Seasonal availability\n• Income ideas\n\nWhat would you like to know? 🌴`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateResponse(userMessage.content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Fruitsy Assistant" }]} />
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">🤖</span>
            <h1 className="font-heading text-3xl lg:text-4xl font-bold">
              Fruitsy — Your Fruit Assistant
            </h1>
          </div>
          <p className="text-white/80 mt-2 text-lg max-w-2xl">
            Ask me anything about Caribbean fruits, recipes, nutrition, and more!
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Quick Prompts */}
        <div className="mb-6">
          <p className="text-sm text-charcoal-light mb-3">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map(prompt => (
              <button
                key={prompt}
                onClick={() => handleQuickPrompt(prompt)}
                className="text-sm bg-white border border-gray-200 px-3 py-1.5 rounded-full hover:border-leaf hover:bg-leaf/5 transition-colors text-charcoal-light hover:text-leaf"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Messages */}
          <div className="h-[400px] overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.type === "user"
                      ? "bg-leaf text-white rounded-br-md"
                      : "bg-gray-100 text-charcoal rounded-bl-md"
                  }`}
                >
                  {message.type === "assistant" && (
                    <div className="flex items-center gap-2 mb-2 text-xs text-charcoal-light">
                      <span>🤖</span>
                      <span className="font-semibold">Fruitsy</span>
                    </div>
                  )}
                  <div className="text-sm whitespace-pre-wrap">
                    {message.content.split(/(\[👉[^\]]+\]\([^)]+\))/g).map((part, i) => {
                      const linkMatch = part.match(/\[👉([^\]]+)\]\(([^)]+)\)/);
                      if (linkMatch) {
                        return (
                          <button
                            key={i}
                            onClick={() => navigate(linkMatch[2])}
                            className="text-leaf underline hover:no-underline font-medium"
                          >
                            👉 {linkMatch[1]}
                          </button>
                        );
                      }
                      return <span key={i}>{part}</span>;
                    })}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span>🤖</span>
                    <span className="text-sm text-charcoal-light">Fruitsy is typing...</span>
                    <span className="animate-pulse">💭</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-gray-100 p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Fruitsy anything..."
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-leaf focus:ring-2 focus:ring-leaf/20 outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </form>
        </div>

        {/* Features */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {[
            { icon: "🍎", title: "Fruit Info", desc: "Learn about any tropical fruit" },
            { icon: "🍽️", title: "Recipe Ideas", desc: "Get meal suggestions" },
            { icon: "💚", title: "Health Tips", desc: "Nutrition & wellness advice" },
          ].map(feature => (
            <div key={feature.title} className="bg-white rounded-xl p-4 border border-gray-100 text-center">
              <span className="text-3xl block mb-2">{feature.icon}</span>
              <h3 className="font-heading font-semibold text-charcoal">{feature.title}</h3>
              <p className="text-sm text-charcoal-light">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

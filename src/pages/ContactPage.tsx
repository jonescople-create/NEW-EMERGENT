import { useState } from "react";
import { Breadcrumb } from "../components/Breadcrumb";

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-gradient-to-r from-leaf to-leaf-light text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Contact" }]} />
          <h1 className="font-heading text-3xl lg:text-5xl font-bold">Contact Us 📬</h1>
          <p className="text-white/80 mt-3 text-lg max-w-2xl">
            Have a question, suggestion, or want to collaborate? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="font-heading text-2xl font-bold text-charcoal mb-6">Send Us a Message</h2>
            {submitted ? (
              <div className="bg-leaf/10 border border-leaf/20 rounded-2xl p-8 text-center">
                <span className="text-5xl block mb-4">✅</span>
                <h3 className="font-heading text-xl font-bold text-leaf mb-2">Message Sent!</h3>
                <p className="text-charcoal-light">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="btn-primary mt-4 text-sm">
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-1">Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-leaf focus:ring-2 focus:ring-leaf/20 outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-leaf focus:ring-2 focus:ring-leaf/20 outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-charcoal mb-1">Subject</label>
                  <select
                    id="subject"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-leaf focus:ring-2 focus:ring-leaf/20 outline-none transition-all"
                  >
                    <option>General Inquiry</option>
                    <option>Suggest a Fruit</option>
                    <option>Submit a Recipe</option>
                    <option>Report an Error</option>
                    <option>Partnership / Collaboration</option>
                    <option>Media Inquiry</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-1">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-leaf focus:ring-2 focus:ring-leaf/20 outline-none transition-all resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <button type="submit" className="btn-primary w-full justify-center text-base">
                  Send Message →
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="font-heading text-2xl font-bold text-charcoal mb-6">Get in Touch</h2>
            <div className="space-y-6">
              {[
                { icon: "📧", label: "Email", value: "hello@islandfruitguide.com", desc: "We respond within 24 hours" },
                { icon: "🌐", label: "Website", value: "islandfruitguide.com", desc: "Browse our fruit guides" },
                { icon: "📍", label: "Location", value: "Caribbean Islands", desc: "Covering the entire Caribbean region" },
                { icon: "⏰", label: "Hours", value: "Mon–Fri, 9am–5pm AST", desc: "Atlantic Standard Time" },
              ].map(info => (
                <div key={info.label} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100">
                  <span className="text-2xl">{info.icon}</span>
                  <div>
                    <div className="font-medium text-charcoal">{info.label}</div>
                    <div className="text-leaf font-medium text-sm">{info.value}</div>
                    <div className="text-xs text-charcoal-light mt-0.5">{info.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <div className="mt-8 bg-mango/10 rounded-2xl p-6 border border-mango/20">
              <h3 className="font-heading font-bold text-charcoal mb-3">💡 Quick Answers</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-charcoal">How can I suggest a fruit?</span>
                  <p className="text-charcoal-light">Use the form with subject "Suggest a Fruit" and include as much detail as possible.</p>
                </div>
                <div>
                  <span className="font-medium text-charcoal">Can I submit a recipe?</span>
                  <p className="text-charcoal-light">Yes! We love community recipes. Select "Submit a Recipe" and share your creation.</p>
                </div>
                <div>
                  <span className="font-medium text-charcoal">Do you offer partnerships?</span>
                  <p className="text-charcoal-light">We welcome collaborations with farmers, brands, and content creators.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

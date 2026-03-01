import { useState, useEffect, useRef } from "react";
import { navigate } from "../App";
import { Breadcrumb } from "../components/Breadcrumb";
import { BookCover } from "../components/BookCover";
import { SoursopBookCover } from "../components/SoursopBookCover";
import { SuperfruitsBookCover } from "../components/SuperfruitsBookCover";
import { products } from "./StorePage";

interface Props {
  productId: string;
}

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: {
        style?: Record<string, string>;
        createOrder: (
          _data: unknown,
          actions: {
            order: {
              create: (orderData: {
                purchase_units: Array<{
                  description: string;
                  amount: { currency_code: string; value: string };
                }>;
              }) => Promise<string>;
            };
          }
        ) => Promise<string>;
        onApprove: (
          _data: unknown,
          actions: {
            order: {
              capture: () => Promise<{
                id: string;
                payer?: { email_address?: string; name?: { given_name?: string } };
              }>;
            };
          }
        ) => Promise<void>;
        onError: (err: Error) => void;
        onCancel: () => void;
      }) => { render: (selector: string) => Promise<void> };
    };
  }
}

// PayPal Client ID — LIVE for production
const PAYPAL_CLIENT_ID = "ASXOVC-1ePvDfIm1ZGDaXy-1TGJTG_yWq5ceJewisq-96qzPyX1tZgDMJTPFebtTP-1x_hvRj2xHdvzl";

// Download URLs per product
const downloadUrls: Record<string, string> = {
  "ebook-caribbean-fruit-guide": "https://image2url.com/r2/default/documents/1771979481368-df16b0ee-9819-4667-a8f2-4b3727d0f4b4.pdf",
  "ebook-soursop-guide": "https://image2url.com/r2/default/documents/1771979481368-df16b0ee-9819-4667-a8f2-4b3727d0f4b4.pdf",
  "ebook-superfruits-guide": "https://image2url.com/r2/default/documents/1771979481368-df16b0ee-9819-4667-a8f2-4b3727d0f4b4.pdf",
  "guide-income-starter-kit": "https://image2url.com/r2/default/documents/1771979481368-df16b0ee-9819-4667-a8f2-4b3727d0f4b4.pdf",
  "guide-wellness-plan": "https://image2url.com/r2/default/documents/1771979481368-df16b0ee-9819-4667-a8f2-4b3727d0f4b4.pdf",
  "bundle-complete": "https://image2url.com/r2/default/documents/1771979481368-df16b0ee-9819-4667-a8f2-4b3727d0f4b4.pdf",
};

function ProductThumbnail({ productId }: { productId: string }) {
  const product = products.find((p) => p.id === productId);
  if (product?.coverType === "soursop") return <SoursopBookCover size="sm" />;
  if (product?.coverType === "superfruits") return <SuperfruitsBookCover size="sm" />;
  if (product?.coverType === "caribbean") return <BookCover size="sm" />;
  return (
    <div className="w-16 h-22 bg-gradient-to-br from-leaf/20 to-mango/20 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
      {product?.type === "bundle" ? "📦" : "📖"}
    </div>
  );
}

export function CheckoutPage({ productId }: Props) {
  const product = products.find((p) => p.id === productId);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [orderId, setOrderId] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [showPaypal, setShowPaypal] = useState(false);
  const paypalRef = useRef<HTMLDivElement>(null);
  const paypalRendered = useRef(false);

  // Load PayPal SDK
  useEffect(() => {
    if (document.getElementById("paypal-sdk")) {
      if (window.paypal) setPaypalLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.id = "paypal-sdk";
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD&intent=capture&components=buttons,funding-eligibility&enable-funding=card,paypal`;
    script.async = true;
    script.onload = () => setPaypalLoaded(true);
    script.onerror = () =>
      setOrderError("Failed to load PayPal. Please refresh and try again.");
    document.body.appendChild(script);
  }, []);

  // Render PayPal buttons
  useEffect(() => {
    if (
      !paypalLoaded ||
      !window.paypal ||
      !showPaypal ||
      !paypalRef.current ||
      !product ||
      paypalRendered.current
    )
      return;

    paypalRendered.current = true;

    window.paypal
      .Buttons({
        style: {
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "paypal",
          height: "50",
        },
        createOrder: (_data: unknown, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: product.name,
                amount: {
                  currency_code: "USD",
                  value: product.price.toFixed(2),
                },
              },
            ],
          });
        },
        onApprove: async (_data: unknown, actions) => {
          try {
            const details = await actions.order.capture();
            setOrderId(details.id);
            setBuyerName(
              details.payer?.name?.given_name || email.split("@")[0] || "Customer"
            );
            setBuyerEmail(details.payer?.email_address || email);
            setOrderComplete(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
          } catch {
            setOrderError(
              "Payment was approved but capture failed. Please contact support with your PayPal transaction ID."
            );
          }
        },
        onError: (err: Error) => {
          console.error("PayPal error:", err);
          setOrderError("Something went wrong with PayPal. Please try again.");
        },
        onCancel: () => {
          setOrderError("");
        },
      })
      .render("#paypal-button-container");
  }, [paypalLoaded, showPaypal, product, email]);

  // Reset on product change
  useEffect(() => {
    paypalRendered.current = false;
    setShowPaypal(false);
    setOrderComplete(false);
    setOrderError("");
  }, [productId]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <span className="text-6xl block mb-4">🤔</span>
        <h1 className="font-heading text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-charcoal-light mb-6">The product you're looking for doesn't exist.</p>
        <button onClick={() => navigate("/store")} className="btn-primary">← Back to Store</button>
      </div>
    );
  }

  const productDownloadUrl = downloadUrls[product.id] || downloadUrls["ebook-caribbean-fruit-guide"];

  // ===== ORDER COMPLETE =====
  if (orderComplete) {
    return (
      <div className="animate-fade-in">
        <div className="bg-gradient-to-r from-leaf to-leaf-light text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb items={[{ label: "Store", path: "/store" }, { label: "Order Complete" }]} />
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 lg:p-12">
            <div className="w-20 h-20 bg-leaf/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">🎉</span>
            </div>
            <h1 className="font-heading text-3xl font-bold text-charcoal">
              Thank You, {buyerName}!
            </h1>
            <p className="text-charcoal-light mt-3 text-lg">Your order has been processed successfully.</p>

            {/* Order details */}
            <div className="bg-gradient-to-br from-leaf/5 to-mango/5 rounded-2xl p-6 mt-8 text-left">
              <h3 className="font-heading font-bold text-charcoal mb-4">📦 Order Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-charcoal-light">Order ID</span>
                  <span className="font-mono font-medium text-charcoal">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-light">Product</span>
                  <span className="font-medium text-charcoal">{product.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-light">Amount Paid</span>
                  <span className="font-bold text-leaf">${product.price.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-light">Email</span>
                  <span className="font-medium text-charcoal">{buyerEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-light">Format</span>
                  <span className="font-medium text-charcoal">PDF (Digital Download)</span>
                </div>
              </div>
            </div>

            {/* Download */}
            <div className="mt-8 bg-mango/10 rounded-2xl p-6 border border-mango/20">
              <h3 className="font-heading font-bold text-charcoal mb-2">📥 Download Your Purchase</h3>
              <p className="text-sm text-charcoal-light mb-4">
                Click below to download. A copy has also been sent to {buyerEmail}.
              </p>

              {product.type === "bundle" ? (
                <div className="space-y-3">
                  {products.filter((p) => p.type !== "bundle").map((p) => (
                    <a
                      key={p.id}
                      href={downloadUrls[p.id] || productDownloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between bg-white rounded-xl p-3 border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <span className="text-sm font-medium text-charcoal">📄 {p.name}</span>
                      <span className="text-leaf text-xs font-bold">Download →</span>
                    </a>
                  ))}
                </div>
              ) : (
                <a
                  href={productDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 text-base"
                >
                  📄 Download {product.name}
                </a>
              )}
            </div>

            {/* Next steps */}
            <div className="mt-8 space-y-3">
              <p className="text-sm text-charcoal-light">
                A receipt has been sent to your PayPal email. For support,{" "}
                <button onClick={() => navigate("/contact")} className="text-leaf underline">contact our team</button>.
              </p>
              <div className="flex flex-wrap gap-3 justify-center mt-6">
                <button onClick={() => navigate("/store")} className="btn-secondary">🛒 Continue Shopping</button>
                <button onClick={() => navigate("/")} className="px-6 py-3 rounded-xl border border-gray-200 text-charcoal-light hover:bg-gray-50 transition-colors font-medium">🏠 Go Home</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===== CHECKOUT FORM =====
  return (
    <div className="animate-fade-in">
      <div className="bg-gradient-to-r from-leaf to-leaf-light text-white py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Store", path: "/store" }, { label: "Checkout" }]} />
          <div className="flex items-center gap-3">
            <span className="text-3xl">🛒</span>
            <h1 className="font-heading text-2xl lg:text-4xl font-bold">Secure Checkout</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-3">
            {/* Step 1: Email */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                <h2 className="font-heading font-bold text-charcoal flex items-center gap-2">
                  <span className="w-7 h-7 bg-leaf text-white rounded-full flex items-center justify-center text-sm">1</span>
                  Your Email
                </h2>
              </div>
              <div className="p-6">
                <p className="text-sm text-charcoal-light mb-3">We'll send your download link and receipt to this email.</p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setOrderError(""); }}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-leaf focus:ring-2 focus:ring-leaf/20 outline-none transition-all"
                />
              </div>
            </div>

            {/* Step 2: Review */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                <h2 className="font-heading font-bold text-charcoal flex items-center gap-2">
                  <span className="w-7 h-7 bg-leaf text-white rounded-full flex items-center justify-center text-sm">2</span>
                  Review Order
                </h2>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <ProductThumbnail productId={product.id} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-bold text-charcoal">{product.name}</h3>
                    <p className="text-sm text-charcoal-light mt-1 line-clamp-2">{product.description}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-xs bg-leaf/10 text-leaf px-2 py-1 rounded-full font-medium uppercase">{product.type}</span>
                      <span className="text-xs text-charcoal-light">PDF Digital Download</span>
                    </div>
                    {product.type === "bundle" && (
                      <div className="mt-3 space-y-1">
                        {products.filter((p) => p.type !== "bundle").map((p) => (
                          <div key={p.id} className="text-xs text-charcoal-light flex items-center gap-1.5">
                            <span className="text-leaf">✓</span> {p.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-heading text-2xl font-bold text-leaf">${product.price.toFixed(2)}</div>
                    {product.originalPrice && (
                      <div className="text-xs text-charcoal-light line-through">${product.originalPrice.toFixed(2)}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Pay */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                <h2 className="font-heading font-bold text-charcoal flex items-center gap-2">
                  <span className="w-7 h-7 bg-leaf text-white rounded-full flex items-center justify-center text-sm">3</span>
                  Payment
                </h2>
              </div>
              <div className="p-6">
                <label className="flex items-start gap-3 mb-6 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => { setAgreed(e.target.checked); setOrderError(""); }}
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-leaf focus:ring-leaf accent-[#1F7A4D]"
                  />
                  <span className="text-sm text-charcoal-light">
                    I agree to the{" "}
                    <button onClick={() => navigate("/about")} className="text-leaf underline">Terms of Service</button>{" "}and{" "}
                    <button onClick={() => navigate("/about")} className="text-leaf underline">Privacy Policy</button>.
                    I understand this is a digital product with instant delivery.
                  </span>
                </label>

                {orderError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                    <p className="text-sm text-red-700 flex items-center gap-2"><span>⚠️</span>{orderError}</p>
                  </div>
                )}

                {!showPaypal ? (
                  <button
                    onClick={() => {
                      if (!email || !email.includes("@")) {
                        setOrderError("Please enter a valid email address.");
                        return;
                      }
                      if (!agreed) {
                        setOrderError("Please agree to the Terms of Service.");
                        return;
                      }
                      setOrderError("");
                      setShowPaypal(true);
                    }}
                    className="w-full bg-[#0070ba] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#003087] transition-colors shadow-lg flex items-center justify-center gap-3"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .76-.65h6.18c2.046 0 3.482.46 4.272 1.368.738.85.946 2.07.635 3.73l-.003.02v.463l.36.205c.306.165.55.358.737.576.318.372.523.845.607 1.404.087.579.053 1.27-.1 2.055-.176.9-.463 1.685-.855 2.332-.36.598-.812 1.085-1.344 1.449-.505.343-1.1.6-1.77.76-.648.155-1.386.233-2.193.233H11.65a.943.943 0 0 0-.932.8l-.024.148-.462 2.93-.02.12a.943.943 0 0 1-.932.8H7.076z" />
                      <path d="M18.36 8.104c-.009.058-.02.117-.032.177-.96 4.932-4.245 6.635-8.44 6.635H7.77a1.038 1.038 0 0 0-1.025.878l-.795 5.04-.226 1.428a.545.545 0 0 0 .539.633h3.787c.45 0 .832-.328.903-.77l.037-.194.715-4.536.046-.25a.91.91 0 0 1 .9-.77h.566c3.666 0 6.534-1.49 7.373-5.8.35-1.8.17-3.305-.757-4.362a3.62 3.62 0 0 0-1.037-.823l-.236-.29z" />
                    </svg>
                    Proceed to PayPal — ${product.price.toFixed(2)}
                  </button>
                ) : (
                  <div>
                    <p className="text-sm text-charcoal-light mb-4 text-center">Complete your payment securely through PayPal:</p>
                    {!paypalLoaded ? (
                      <div className="text-center py-8">
                        <span className="animate-spin text-3xl inline-block">⏳</span>
                        <p className="text-sm text-charcoal-light mt-3">Loading PayPal...</p>
                      </div>
                    ) : (
                      <div id="paypal-button-container" ref={paypalRef}></div>
                    )}
                    <button
                      onClick={() => {
                        setShowPaypal(false);
                        paypalRendered.current = false;
                        if (paypalRef.current) paypalRef.current.innerHTML = "";
                      }}
                      className="w-full mt-4 text-sm text-charcoal-light hover:text-charcoal transition-colors text-center"
                    >
                      ← Go back
                    </button>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-charcoal-light">
                    <span>🔒 256-bit SSL Encryption</span>
                    <span>🛡️ PayPal Buyer Protection</span>
                    <span>💯 30-Day Money Back</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              {/* Order Summary */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-heading font-bold text-lg text-charcoal mb-4">Order Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-charcoal-light">{product.name}</span>
                    <span className="font-medium text-charcoal">${product.price.toFixed(2)}</span>
                  </div>
                  {product.originalPrice && (
                    <div className="flex justify-between">
                      <span className="text-charcoal-light">Discount</span>
                      <span className="font-medium text-coral">-${(product.originalPrice - product.price).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-charcoal-light">Format</span>
                    <span className="font-medium text-charcoal">PDF Digital</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-light">Delivery</span>
                    <span className="font-medium text-leaf">Instant</span>
                  </div>
                  <hr className="border-gray-100" />
                  <div className="flex justify-between text-base">
                    <span className="font-bold text-charcoal">Total</span>
                    <span className="font-heading text-2xl font-bold text-leaf">${product.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* What you get */}
              <div className="bg-gradient-to-br from-leaf/5 to-mango/5 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-heading font-bold text-charcoal mb-3">✅ What You'll Get</h3>
                <ul className="space-y-2">
                  {product.features.slice(0, 6).map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-charcoal-light">
                      <span className="text-leaf flex-shrink-0 mt-0.5">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Guarantee */}
              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">🛡️</span>
                  <h3 className="font-heading font-bold text-charcoal">30-Day Guarantee</h3>
                </div>
                <p className="text-sm text-charcoal-light">Not satisfied? Get a full refund within 30 days — no questions asked.</p>
              </div>

              {/* Help */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="font-heading font-bold text-charcoal mb-2">Need Help?</h3>
                <p className="text-sm text-charcoal-light mb-3">Having trouble with checkout?</p>
                <button onClick={() => navigate("/contact")} className="text-sm text-leaf font-medium hover:underline">📧 Contact Support →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

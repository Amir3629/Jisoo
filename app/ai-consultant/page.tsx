"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Send,
  Sparkles,
  User,
  Bot,
  Droplets,
  Sun,
  Moon,
  Leaf,
  ShoppingBag,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";
import { useRegion } from "@/components/providers/region-provider";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  products?: typeof products;
  quickReplies?: string[];
}

const initialMessage: Message = {
  id: "1",
  type: "assistant",
  content:
    "Hello! I'm JISOO, your personal skincare consultant. I'm here to help you discover the perfect Korean beauty routine tailored to your unique skin needs. What would you like help with today?",
  quickReplies: [
    "Build my routine",
    "Help with skin concerns",
    "Product recommendations",
    "Learn about ingredients",
  ],
};

const skinTypeQuestions = [
  "What's your skin type?",
  "Do you have any specific skin concerns?",
  "What's your current skincare routine like?",
  "Are there any ingredients you'd like to avoid?",
];

const skinTypes = [
  { icon: Droplets, label: "Oily", description: "Shiny, enlarged pores" },
  { icon: Leaf, label: "Dry", description: "Tight, flaky, rough" },
  { icon: Sun, label: "Combination", description: "Oily T-zone, dry cheeks" },
  { icon: Moon, label: "Sensitive", description: "Easily irritated, redness" },
];

export default function AIConsultantPage() {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSkinTypes, setShowSkinTypes] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { formatPrice } = useRegion();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes("routine") ||
      lowerMessage.includes("build")
    ) {
      return {
        id: Date.now().toString(),
        type: "assistant",
        content:
          "I'd love to help you build the perfect K-beauty routine! First, let me understand your skin better. What's your skin type?",
        quickReplies: ["Oily", "Dry", "Combination", "Sensitive", "Not sure"],
      };
    }

    if (
      lowerMessage.includes("oily") ||
      lowerMessage.includes("dry") ||
      lowerMessage.includes("combination") ||
      lowerMessage.includes("sensitive")
    ) {
      const skinType = lowerMessage.includes("oily")
        ? "oily"
        : lowerMessage.includes("dry")
        ? "dry"
        : lowerMessage.includes("combination")
        ? "combination"
        : "sensitive";

      const recommendations = products.slice(0, 4);

      return {
        id: Date.now().toString(),
        type: "assistant",
        content: `Perfect! For ${skinType} skin, I recommend a gentle but effective routine. Based on your skin type, here are my top picks that will help balance and nourish your skin:`,
        products: recommendations,
        quickReplies: [
          "Tell me more about these",
          "Show different products",
          "What's the routine order?",
        ],
      };
    }

    if (
      lowerMessage.includes("concern") ||
      lowerMessage.includes("acne") ||
      lowerMessage.includes("wrinkle") ||
      lowerMessage.includes("dark spot")
    ) {
      return {
        id: Date.now().toString(),
        type: "assistant",
        content:
          "I understand skin concerns can be frustrating. Korean skincare is known for its targeted, effective solutions. What's your primary concern right now?",
        quickReplies: [
          "Acne & breakouts",
          "Fine lines & wrinkles",
          "Dark spots & hyperpigmentation",
          "Redness & irritation",
          "Dullness & texture",
        ],
      };
    }

    if (
      lowerMessage.includes("ingredient") ||
      lowerMessage.includes("learn")
    ) {
      return {
        id: Date.now().toString(),
        type: "assistant",
        content:
          "K-beauty is famous for innovative, skin-loving ingredients! Here are some popular ones:\n\n**Snail Mucin** - Hydrates and repairs\n**Centella Asiatica** - Calms and soothes\n**Niacinamide** - Brightens and controls oil\n**Hyaluronic Acid** - Deep hydration\n**Vitamin C** - Brightening and antioxidant\n\nWould you like to learn more about any of these?",
        quickReplies: [
          "Snail Mucin",
          "Centella Asiatica",
          "Niacinamide",
          "Show products with these",
        ],
      };
    }

    if (lowerMessage.includes("order") || lowerMessage.includes("steps")) {
      return {
        id: Date.now().toString(),
        type: "assistant",
        content:
          "Here's the classic 10-step Korean skincare routine:\n\n1. **Oil Cleanser** - Remove makeup & SPF\n2. **Water Cleanser** - Deep cleanse\n3. **Exfoliator** - 2-3x per week\n4. **Toner** - Prep & balance\n5. **Essence** - Hydrate & treat\n6. **Serum** - Target concerns\n7. **Sheet Mask** - Weekly treatment\n8. **Eye Cream** - Delicate eye area\n9. **Moisturizer** - Lock in hydration\n10. **SPF** - Protect (AM only)\n\nDon't worry - you don't need all 10 steps! Start with the basics and build up. Would you like me to suggest a simplified routine?",
        quickReplies: [
          "Simple 5-step routine",
          "Morning routine",
          "Night routine",
          "Shop by step",
        ],
      };
    }

    return {
      id: Date.now().toString(),
      type: "assistant",
      content:
        "That's a great question! I'm here to help you navigate the world of Korean skincare. Feel free to ask me about routines, specific concerns, product recommendations, or ingredient questions. What would you like to explore?",
      quickReplies: [
        "Build my routine",
        "Help with skin concerns",
        "Product recommendations",
        "Learn about ingredients",
      ],
    };
  };

  const handleSend = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: messageText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(messageText);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleReset = () => {
    setMessages([initialMessage]);
    setShowSkinTypes(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40 pt-20">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-serif text-lg">JISOO AI Consultant</h1>
                <p className="text-xs text-muted-foreground">
                  Your personal skincare advisor
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="rounded-none"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Start Over
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex gap-3 ${
                  message.type === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-gradient-to-br from-primary to-accent text-white"
                  }`}
                >
                  {message.type === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={`flex-1 max-w-2xl ${
                    message.type === "user" ? "text-right" : ""
                  }`}
                >
                  <div
                    className={`inline-block p-4 ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border"
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </p>
                  </div>

                  {/* Product Recommendations */}
                  {message.products && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {message.products.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.slug}`}
                          className="group bg-card border border-border p-3 hover:border-primary transition-colors"
                        >
                          <div className="relative aspect-square bg-muted mb-2 overflow-hidden">
                            <Image
                              src={product.images[0]?.src || "/placeholder-product.jpg"}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                            {product.brand}
                          </p>
                          <p className="text-xs font-medium line-clamp-2 mt-0.5">
                            {product.name}
                          </p>
                          <p className="text-xs mt-1">
                            {formatPrice(product.price)}
                          </p>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Quick Replies */}
                  {message.quickReplies && message.type === "assistant" && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.quickReplies.map((reply) => (
                        <button
                          key={reply}
                          onClick={() => handleSend(reply)}
                          className="px-3 py-1.5 text-xs border border-border hover:border-primary hover:bg-primary/5 transition-colors"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-card border border-border p-4">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                  <span
                    className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about skincare, routines, or products..."
              className="flex-1 h-12 px-4 border border-border bg-background focus:outline-none focus:border-primary transition-colors"
            />
            <Button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="h-12 px-6 rounded-none"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
          <p className="text-[10px] text-muted-foreground text-center mt-2">
            JISOO AI provides general skincare guidance. For specific skin conditions, please consult a dermatologist.
          </p>
        </div>
      </div>

      {/* Bottom padding for fixed input */}
      <div className="h-32" />
    </div>
  );
}

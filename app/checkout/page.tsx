"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronRight, 
  Lock, 
  CreditCard, 
  Truck, 
  Gift,
  Check,
  ArrowLeft
} from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";
import { useRegion } from "@/components/providers/region-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocale } from "@/components/providers/locale-provider";
import { localizeHref } from "@/lib/i18n";

type CheckoutStep = "information" | "shipping" | "payment";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { formatPrice } = useRegion();
  const { locale, dictionary } = useLocale();
  const c = dictionary.common;
  const [step, setStep] = useState<CheckoutStep>("information");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const steps: { key: CheckoutStep; label: string }[] = [
    { key: "information", label: "Information" },
    { key: "shipping", label: "Shipping" },
    { key: "payment", label: "Payment" },
  ];

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setOrderComplete(true);
    clearCart();
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background pt-32 pb-20">
        <div className="container max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-16"
          >
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-primary flex items-center justify-center">
              <Check className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="font-serif text-4xl mb-4">Thank You!</h1>
            <p className="text-muted-foreground mb-2">
              Your order has been placed successfully.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Order #JIS-{Math.random().toString(36).substring(2, 8).toUpperCase()}
            </p>
            <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
              We&apos;ve sent a confirmation email with your order details and tracking information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" className="rounded-none">
                <Link href={localizeHref('/account/orders', locale)}>{c.viewOrder}</Link>
              </Button>
              <Button asChild className="rounded-none">
                <Link href={localizeHref('/shop', locale)}>{c.continueShopping}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-32 pb-20">
        <div className="container max-w-2xl mx-auto px-4 text-center">
          <h1 className="font-serif text-3xl mb-4">{dictionary.cart.emptyTitle}</h1>
          <p className="text-muted-foreground mb-8">
            {dictionary.cart.emptyBody}
          </p>
          <Button asChild className="rounded-none">
            <Link href={localizeHref('/shop', locale)}>{c.shopNow}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-8">
          <Link href={localizeHref('/cart', locale)} className="text-muted-foreground hover:text-foreground transition-colors">
            {dictionary.cart.title}
          </Link>
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <button
                onClick={() => {
                  const currentIndex = steps.findIndex((st) => st.key === step);
                  if (i <= currentIndex) setStep(s.key);
                }}
                className={`${
                  step === s.key
                    ? "text-foreground font-medium"
                    : steps.findIndex((st) => st.key === step) > i
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-muted-foreground/50 cursor-not-allowed"
                } transition-colors`}
                disabled={steps.findIndex((st) => st.key === step) < i}
              >
                {s.label}
              </button>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div>
            <AnimatePresence mode="wait">
              {step === "information" && (
                <motion.div
                  key="information"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <h2 className="font-serif text-2xl mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="rounded-none mt-1"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="newsletter" />
                      <label htmlFor="newsletter" className="text-sm text-muted-foreground">
                        Email me with news and offers
                      </label>
                    </div>
                  </div>

                  <h2 className="font-serif text-2xl mt-10 mb-6">Shipping Address</h2>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" className="rounded-none mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" className="rounded-none mt-1" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" className="rounded-none mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                      <Input id="apartment" className="rounded-none mt-1" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" className="rounded-none mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input id="state" className="rounded-none mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input id="zip" className="rounded-none mt-1" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" className="rounded-none mt-1" />
                    </div>
                  </div>

                  <Button
                    onClick={() => setStep("shipping")}
                    className="w-full rounded-none mt-8"
                    size="lg"
                  >
                    Continue to Shipping
                  </Button>
                </motion.div>
              )}

              {step === "shipping" && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <button
                    onClick={() => setStep("information")}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Return to information
                  </button>

                  <h2 className="font-serif text-2xl mb-6">Shipping Method</h2>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 border border-primary bg-primary/5 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Standard Shipping</p>
                          <p className="text-sm text-muted-foreground">5-7 business days</p>
                        </div>
                      </div>
                      <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                    </label>
                    <label className="flex items-center justify-between p-4 border border-border hover:border-muted-foreground cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                        <div>
                          <p className="font-medium">Express Shipping</p>
                          <p className="text-sm text-muted-foreground">2-3 business days</p>
                        </div>
                      </div>
                      <span>{formatPrice(12.99)}</span>
                    </label>
                    <label className="flex items-center justify-between p-4 border border-border hover:border-muted-foreground cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                        <div>
                          <p className="font-medium">Overnight Shipping</p>
                          <p className="text-sm text-muted-foreground">Next business day</p>
                        </div>
                      </div>
                      <span>{formatPrice(24.99)}</span>
                    </label>
                  </div>

                  <Button
                    onClick={() => setStep("payment")}
                    className="w-full rounded-none mt-8"
                    size="lg"
                  >
                    Continue to Payment
                  </Button>
                </motion.div>
              )}

              {step === "payment" && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <button
                    onClick={() => setStep("shipping")}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Return to shipping
                  </button>

                  <h2 className="font-serif text-2xl mb-6">Payment</h2>
                  <div className="border border-border p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <CreditCard className="w-5 h-5" />
                      <span className="font-medium">Credit Card</span>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          className="rounded-none mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input id="cardName" className="rounded-none mt-1" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiration Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM / YY"
                            className="rounded-none mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">Security Code</Label>
                          <Input
                            id="cvv"
                            placeholder="CVV"
                            className="rounded-none mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-6 text-sm text-muted-foreground">
                    <Lock className="w-4 h-4" />
                    <span>Your payment information is secure and encrypted</span>
                  </div>

                  <Button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="w-full rounded-none mt-8"
                    size="lg"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                        />
                        Processing...
                      </span>
                    ) : (
                      `Pay ${formatPrice(total)}`
                    )}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:pl-12 lg:border-l border-border">
            <h2 className="font-serif text-xl mb-6">Order Summary</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.variant?.id || "default"}`}
                  className="flex gap-4"
                >
                  <div className="relative w-16 h-16 bg-muted rounded-sm overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.images[0]?.src || "/placeholder.jpg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-background text-xs rounded-full flex items-center justify-center">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex-1 flex justify-between">
                    <div>
                      <p className="text-sm font-medium">{item.product.name}</p>
                      {item.variant && (
                        <p className="text-xs text-muted-foreground">
                          {item.variant.name}
                        </p>
                      )}
                    </div>
                    <p className="text-sm">
                      {formatPrice(
                        (item.variant?.price || item.product.price) * item.quantity
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
            </div>

            <div className="flex justify-between py-6 border-t border-border mt-6 font-medium text-lg">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            {/* Benefits */}
            <div className="mt-6 pt-6 border-t border-border space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Truck className="w-4 h-4 flex-shrink-0" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Gift className="w-4 h-4 flex-shrink-0" />
                <span>Free samples with every order</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Package, Truck, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/components/providers/locale-provider";
import { localizeHref } from "@/lib/i18n";

const orders = [
  {
    id: "JIS-A7B3C9",
    date: "December 15, 2024",
    status: "delivered",
    total: 156.00,
    items: [
      {
        name: "Sulwhasoo First Care Activating Serum",
        brand: "Sulwhasoo",
        price: 89.00,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400",
      },
      {
        name: "COSRX Advanced Snail 96 Mucin Power Essence",
        brand: "COSRX",
        price: 24.00,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400",
      },
    ],
    shippingAddress: "123 Beauty Lane, Los Angeles, CA 90001",
    trackingNumber: "1Z999AA10123456784",
  },
  {
    id: "JIS-X2Y8Z4",
    date: "November 28, 2024",
    status: "delivered",
    total: 89.00,
    items: [
      {
        name: "Laneige Water Sleeping Mask",
        brand: "Laneige",
        price: 32.00,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400",
      },
      {
        name: "Beauty of Joseon Glow Serum",
        brand: "Beauty of Joseon",
        price: 19.00,
        quantity: 3,
        image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=400",
      },
    ],
    shippingAddress: "123 Beauty Lane, Los Angeles, CA 90001",
    trackingNumber: "1Z999AA10123456783",
  },
  {
    id: "JIS-M5N6P7",
    date: "November 10, 2024",
    status: "delivered",
    total: 234.00,
    items: [
      {
        name: "SK-II Facial Treatment Essence",
        brand: "SK-II",
        price: 185.00,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1570194065650-d99fb4d38123?w=400",
      },
      {
        name: "Innisfree Green Tea Seed Serum",
        brand: "Innisfree",
        price: 49.00,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
      },
    ],
    shippingAddress: "456 Office Blvd, Suite 200, Los Angeles, CA 90010",
    trackingNumber: "1Z999AA10123456782",
  },
];

const statusSteps = [
  { key: "processing", label: "Processing", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: Check },
];

export default function OrdersPage() {
  const { locale, dictionary } = useLocale();
  const c = dictionary.common;
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const getStatusIndex = (status: string) => {
    return statusSteps.findIndex((s) => s.key === status);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl">{c.orderHistory}</h2>
        <p className="text-sm text-muted-foreground">{orders.length} orders</p>
      </div>

      <div className="space-y-4">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card border border-border"
          >
            {/* Order Header */}
            <button
              onClick={() =>
                setExpandedOrder(expandedOrder === order.id ? null : order.id)
              }
              className="w-full p-6 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  {order.items.slice(0, 3).map((item, i) => (
                    <div
                      key={i}
                      className="relative w-12 h-12 rounded-full border-2 border-background overflow-hidden"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-medium">Order #{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="font-medium">${order.total.toFixed(2)}</p>
                  <span className="inline-block px-2 py-0.5 text-xs bg-primary/10 text-primary capitalize">
                    {order.status}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    expandedOrder === order.id ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {/* Expanded Content */}
            <AnimatePresence>
              {expandedOrder === order.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 border-t border-border pt-6">
                    {/* Status Timeline */}
                    <div className="mb-8">
                      <h4 className="text-sm font-medium mb-4">{c.orderStatus}</h4>
                      <div className="flex items-center justify-between">
                        {statusSteps.map((step, i) => {
                          const isCompleted = i <= getStatusIndex(order.status);
                          const isCurrent = i === getStatusIndex(order.status);
                          return (
                            <div key={step.key} className="flex items-center">
                              <div className="flex flex-col items-center">
                                <div
                                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    isCompleted
                                      ? "bg-primary text-primary-foreground"
                                      : "bg-muted text-muted-foreground"
                                  } ${isCurrent ? "ring-2 ring-primary ring-offset-2" : ""}`}
                                >
                                  <step.icon className="w-5 h-5" />
                                </div>
                                <span
                                  className={`text-xs mt-2 ${
                                    isCompleted
                                      ? "text-foreground"
                                      : "text-muted-foreground"
                                  }`}
                                >
                                  {step.label}
                                </span>
                              </div>
                              {i < statusSteps.length - 1 && (
                                <div
                                  className={`w-20 sm:w-32 h-0.5 mx-2 ${
                                    i < getStatusIndex(order.status)
                                      ? "bg-primary"
                                      : "bg-muted"
                                  }`}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium mb-4">Items</h4>
                      <div className="space-y-4">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex gap-4">
                            <div className="relative w-16 h-16 bg-muted rounded-sm overflow-hidden flex-shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                                {item.brand}
                              </p>
                              <p className="text-sm font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Qty: {item.quantity} × ${item.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-border">
                      <div>
                        <h4 className="text-sm font-medium mb-2">
                          {c.shippingAddress}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {order.shippingAddress}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">
                          {c.trackingNumber}
                        </h4>
                        <p className="text-sm text-muted-foreground font-mono">
                          {order.trackingNumber}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 mt-6 pt-6 border-t border-border">
                      <Button variant="outline" className="rounded-none">
                        {c.trackPackage}
                      </Button>
                      <Button variant="outline" className="rounded-none">
                        {c.buyAgain}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Empty State would go here if no orders */}
      {orders.length === 0 && (
        <div className="text-center py-16">
          <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-serif text-xl mb-2">{c.noOrdersYet}</h3>
          <p className="text-muted-foreground mb-6">
            {c.startShoppingToSeeOrders}
          </p>
          <Button asChild className="rounded-none">
            <Link href={localizeHref('/shop', locale)}>
              {c.shopNow}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Plus, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PaymentMethod {
  id: string;
  type: "visa" | "mastercard" | "amex";
  last4: string;
  expiry: string;
  isDefault: boolean;
}

const initialPaymentMethods: PaymentMethod[] = [
  {
    id: "1",
    type: "visa",
    last4: "4242",
    expiry: "12/26",
    isDefault: true,
  },
  {
    id: "2",
    type: "mastercard",
    last4: "8888",
    expiry: "08/25",
    isDefault: false,
  },
];

export default function PaymentPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(
    initialPaymentMethods
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const setDefaultPayment = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  const deletePayment = (id: string) => {
    setPaymentMethods((prev) => prev.filter((method) => method.id !== id));
  };

  const getCardIcon = (type: string) => {
    switch (type) {
      case "visa":
        return (
          <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-[8px] font-bold">
            VISA
          </div>
        );
      case "mastercard":
        return (
          <div className="w-10 h-6 bg-gradient-to-r from-red-500 to-yellow-500 rounded flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-red-500 opacity-80 -mr-1" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
          </div>
        );
      case "amex":
        return (
          <div className="w-10 h-6 bg-blue-800 rounded flex items-center justify-center text-white text-[6px] font-bold">
            AMEX
          </div>
        );
      default:
        return <CreditCard className="w-6 h-6 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl">Payment Methods</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-none">
              <Plus className="w-4 h-4 mr-2" />
              Add Card
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-serif text-xl">
                Add Payment Method
              </DialogTitle>
            </DialogHeader>
            <form className="space-y-4 mt-4">
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
                <Input
                  id="cardName"
                  placeholder="John Doe"
                  className="rounded-none mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiration Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
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
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-none flex-1"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="rounded-none flex-1">
                  Add Card
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {paymentMethods.map((method, index) => (
          <motion.div
            key={method.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative p-6 border ${
              method.isDefault
                ? "border-primary bg-primary/5"
                : "border-border bg-card"
            }`}
          >
            {method.isDefault && (
              <div className="absolute top-4 right-4 flex items-center gap-1 text-xs text-primary">
                <Check className="w-3 h-3" />
                Default
              </div>
            )}
            <div className="flex items-center gap-4">
              {getCardIcon(method.type)}
              <div className="flex-1">
                <p className="font-medium capitalize">
                  {method.type} ending in {method.last4}
                </p>
                <p className="text-sm text-muted-foreground">
                  Expires {method.expiry}
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-border">
              {!method.isDefault && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-none"
                    onClick={() => setDefaultPayment(method.id)}
                  >
                    Set as Default
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-none text-destructive hover:text-destructive"
                    onClick={() => deletePayment(method.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {paymentMethods.length === 0 && (
        <div className="text-center py-12 bg-card border border-border">
          <CreditCard className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-serif text-xl mb-2">No payment methods</h3>
          <p className="text-muted-foreground mb-4">
            Add a card to make checkout faster
          </p>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="rounded-none"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Card
          </Button>
        </div>
      )}
    </div>
  );
}

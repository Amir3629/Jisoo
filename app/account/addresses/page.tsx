"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Plus, Pencil, Trash2, Check } from "lucide-react";
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
import { useLocale } from "@/components/providers/locale-provider";

interface Address {
  id: string;
  label: string;
  name: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

const initialAddresses: Address[] = [
  {
    id: "1",
    label: "Home",
    name: "Sarah Kim",
    street: "123 Beauty Lane",
    city: "Los Angeles",
    state: "CA",
    zip: "90001",
    country: "United States",
    phone: "+1 (555) 123-4567",
    isDefault: true,
  },
  {
    id: "2",
    label: "Work",
    name: "Sarah Kim",
    street: "456 Office Blvd",
    apartment: "Suite 200",
    city: "Los Angeles",
    state: "CA",
    zip: "90010",
    country: "United States",
    phone: "+1 (555) 987-6543",
    isDefault: false,
  },
];

export default function AddressesPage() {
  const { dictionary } = useLocale();
  const c = dictionary.common;
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl">{c.savedAddresses}</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-none">
              <Plus className="w-4 h-4 mr-2" />
              {c.addAddress}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-serif text-xl">
                {c.addAddress}
              </DialogTitle>
            </DialogHeader>
            <form className="space-y-4 mt-4">
              <div>
                <Label htmlFor="label">Address Label</Label>
                <Input
                  id="label"
                  placeholder="e.g., Home, Work, etc."
                  className="rounded-none mt-1"
                />
              </div>
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
                <Label htmlFor="street">Street Address</Label>
                <Input id="street" className="rounded-none mt-1" />
              </div>
              <div>
                <Label htmlFor="apartment">
                  Apartment, suite, etc. (optional)
                </Label>
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
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-none flex-1"
                  onClick={() => setIsDialogOpen(false)}
                >
                  {c.cancel}
                </Button>
                <Button type="submit" className="rounded-none flex-1">
                  {c.saveAddress}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {addresses.map((address, index) => (
          <motion.div
            key={address.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative p-6 border ${
              address.isDefault
                ? "border-primary bg-primary/5"
                : "border-border bg-card"
            }`}
          >
            {address.isDefault && (
              <div className="absolute top-4 right-4 flex items-center gap-1 text-xs text-primary">
                <Check className="w-3 h-3" />
                {c.defaultLabel}
              </div>
            )}
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">{address.label}</span>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>{address.name}</p>
              <p>{address.street}</p>
              {address.apartment && <p>{address.apartment}</p>}
              <p>
                {address.city}, {address.state} {address.zip}
              </p>
              <p>{address.country}</p>
              <p className="pt-2">{address.phone}</p>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-border">
              <Button variant="ghost" size="sm" className="rounded-none">
                <Pencil className="w-4 h-4 mr-1" />
                {c.edit}
              </Button>
              {!address.isDefault && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-none"
                    onClick={() => setDefaultAddress(address.id)}
                  >
                    {c.setAsDefault}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-none text-destructive hover:text-destructive"
                    onClick={() => deleteAddress(address.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Bell, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);

  return (
    <div className="space-y-8">
      <h2 className="font-serif text-2xl">Account Settings</h2>

      {/* Profile Information */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <User className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-medium">Profile Information</h3>
        </div>
        <div className="grid gap-4 max-w-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                defaultValue="Sarah"
                className="rounded-none mt-1"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                defaultValue="Kim"
                className="rounded-none mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              defaultValue="+1 (555) 123-4567"
              className="rounded-none mt-1"
            />
          </div>
          <div>
            <Label htmlFor="birthday">Birthday</Label>
            <Input
              id="birthday"
              type="date"
              className="rounded-none mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Get a special gift on your birthday!
            </p>
          </div>
          <Button className="rounded-none w-fit">Save Changes</Button>
        </div>
      </motion.section>

      {/* Email Settings */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Mail className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-medium">Email Address</h3>
        </div>
        <div className="grid gap-4 max-w-lg">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue="sarah.kim@example.com"
              className="rounded-none mt-1"
            />
          </div>
          <Button className="rounded-none w-fit">Update Email</Button>
        </div>
      </motion.section>

      {/* Password */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card border border-border p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-medium">Password</h3>
        </div>
        <div className="grid gap-4 max-w-lg">
          <div>
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              className="rounded-none mt-1"
            />
          </div>
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              className="rounded-none mt-1"
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              className="rounded-none mt-1"
            />
          </div>
          <Button className="rounded-none w-fit">Change Password</Button>
        </div>
      </motion.section>

      {/* Notification Preferences */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card border border-border p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-medium">Notification Preferences</h3>
        </div>
        <div className="space-y-6 max-w-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">
                Receive notifications via email
              </p>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">SMS Notifications</p>
              <p className="text-sm text-muted-foreground">
                Receive notifications via text message
              </p>
            </div>
            <Switch
              checked={smsNotifications}
              onCheckedChange={setSmsNotifications}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Marketing Emails</p>
              <p className="text-sm text-muted-foreground">
                New products, promotions, and skincare tips
              </p>
            </div>
            <Switch
              checked={marketingEmails}
              onCheckedChange={setMarketingEmails}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Order Updates</p>
              <p className="text-sm text-muted-foreground">
                Shipping confirmations and delivery updates
              </p>
            </div>
            <Switch
              checked={orderUpdates}
              onCheckedChange={setOrderUpdates}
            />
          </div>
        </div>
      </motion.section>

      {/* Region Settings */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card border border-border p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-medium">Region & Language</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 max-w-lg">
          <div>
            <Label htmlFor="country">Country/Region</Label>
            <select
              id="country"
              className="w-full h-10 px-3 border border-input bg-background text-sm mt-1"
              defaultValue="us"
            >
              <option value="us">United States</option>
              <option value="ca">Canada</option>
              <option value="uk">United Kingdom</option>
              <option value="au">Australia</option>
              <option value="kr">South Korea</option>
              <option value="jp">Japan</option>
            </select>
          </div>
          <div>
            <Label htmlFor="language">Language</Label>
            <select
              id="language"
              className="w-full h-10 px-3 border border-input bg-background text-sm mt-1"
              defaultValue="en"
            >
              <option value="en">English</option>
              <option value="ko">Korean</option>
              <option value="ja">Japanese</option>
              <option value="zh">Chinese</option>
            </select>
          </div>
        </div>
      </motion.section>

      {/* Danger Zone */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="border border-destructive/20 p-6"
      >
        <h3 className="font-medium text-destructive mb-4">Danger Zone</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <Button variant="outline" className="rounded-none text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
          Delete Account
        </Button>
      </motion.section>
    </div>
  );
}

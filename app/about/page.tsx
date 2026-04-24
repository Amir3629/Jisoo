"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Leaf,
  Award,
  Globe,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/components/providers/locale-provider";
import { localizeHref } from "@/lib/i18n";

const values = [
  {
    icon: Heart,
    title: "Authenticity",
    description:
      "We source directly from Korea, ensuring every product is genuine and meets our strict quality standards.",
  },
  {
    icon: Leaf,
    title: "Clean Beauty",
    description:
      "We prioritize products with safe, effective ingredients and transparent formulations.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We curate only the best, partnering with brands that share our commitment to quality and innovation.",
  },
  {
    icon: Globe,
    title: "Sustainability",
    description:
      "We support eco-conscious brands and minimize our environmental footprint in everything we do.",
  },
];

const team = [
  {
    name: "Ji-Yeon Park",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    bio: "Former beauty editor with 15+ years in the industry",
  },
  {
    name: "Min-Jun Kim",
    role: "Head of Curation",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    bio: "K-beauty expert and licensed esthetician",
  },
  {
    name: "Soo-Yeon Lee",
    role: "Brand Partnerships",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    bio: "Connecting global customers with Korean brands",
  },
  {
    name: "Hye-Jin Choi",
    role: "Customer Experience",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    bio: "Dedicated to your skincare journey",
  },
];

const milestones = [
  { year: "2018", event: "JISOO founded in Seoul, South Korea" },
  { year: "2019", event: "Launched international shipping to 50+ countries" },
  { year: "2020", event: "Reached 100,000 happy customers" },
  { year: "2021", event: "Introduced AI Skin Consultant" },
  { year: "2022", event: "Partnership with 200+ premium brands" },
  { year: "2023", event: "Opened flagship experience center in Seoul" },
  { year: "2024", event: "1 million customers worldwide" },
];

export default function AboutPage() {
  const { locale } = useLocale();

  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <Image
            src="/background/photo-1596755389378-c31d21fd1273.jpeg"
            alt="Korean beauty heritage"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/55 via-charcoal/35 to-background/95" />
        </motion.div>
        <motion.div
          style={{ opacity }}
          className="relative h-full flex items-center justify-center text-center px-4"
        >
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6"
            >
              Our Story
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-5xl md:text-7xl mb-6"
            >
              Beauty Rooted in
              <br />
              <span className="text-primary">Korean Heritage</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-xl mx-auto"
            >
              JISOO brings the best of Korean skincare to beauty lovers worldwide, 
              curating premium products that honor tradition while embracing innovation.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-4xl md:text-5xl mb-6">
                Our Mission
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                At JISOO, we believe everyone deserves access to the transformative 
                power of Korean skincare. Our mission is to bridge the gap between 
                Korea&apos;s innovative beauty industry and skincare enthusiasts around 
                the world.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We meticulously curate each product in our collection, ensuring it 
                meets our standards for quality, efficacy, and authenticity. From 
                cult-favorite brands to hidden gems, we bring you the very best 
                that K-beauty has to offer.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                More than just a store, JISOO is your guide to achieving healthy, 
                radiant skin through the time-tested wisdom of Korean beauty rituals.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5]"
            >
              <Image
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800"
                alt="Korean skincare ritual"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-serif text-xl mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 px-4">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-4">Our Journey</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From a small Seoul-based startup to a global K-beauty destination
            </p>
          </motion.div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary md:-translate-x-1/2 z-10" />
                  <div className={`flex-1 pl-12 md:pl-0 ${
                    index % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"
                  }`}>
                    <span className="text-primary font-serif text-2xl">
                      {milestone.year}
                    </span>
                    <p className="text-muted-foreground mt-1">
                      {milestone.event}
                    </p>
                  </div>
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Passionate experts dedicated to your skincare journey
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-serif text-xl mb-1">{member.name}</h3>
                <p className="text-sm text-primary mb-2">{member.role}</p>
                <p className="text-xs text-muted-foreground">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "1M+", label: "Happy Customers" },
              { value: "200+", label: "Premium Brands" },
              { value: "50+", label: "Countries Served" },
              { value: "10K+", label: "Products Curated" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="font-serif text-4xl md:text-5xl text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-primary text-primary-foreground">
        <div className="container max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-12 h-12 mx-auto mb-6 opacity-80" />
            <h2 className="font-serif text-4xl md:text-5xl mb-6">
              Begin Your K-Beauty Journey
            </h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Discover the transformative power of Korean skincare with our 
              AI-powered skin consultant and curated product collections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="rounded-none"
              >
                <Link href={localizeHref('/ai-consultant', locale)}>
                  Meet Your AI Consultant
                  <Sparkles className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-none border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link href={localizeHref('/shop', locale)}>
                  Shop Collection
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

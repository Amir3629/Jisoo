"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Heart,
  Eye,
  Droplets,
  Sparkles,
  Shield,
  Sun,
  Activity,
  Clock,
  Wind,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";
import { Product } from "@/lib/types";
import { useCart } from "@/components/providers/cart-provider";
import { useRegion } from "@/components/providers/region-provider";
import { useLocale } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { evaluateRegionAccess } from "@/lib/services/region-access";
import { localizeHref } from "@/lib/i18n";
import {
  localizeProduct,
  localizeProductLabel,
} from "@/lib/product-localization";
import { resolveImageSrc } from "@/lib/image-fallbacks";
import {
  getProductCardHighlights,
  getProductCareChips,
  getProductStatusBadge,
  type ProductCareIconKind,
} from "@/lib/product-merchandising";

interface ProductCardProps {
  product: Product;
  index?: number;
  displayName?: string;
  hideDescription?: boolean;
  compact?: boolean;
}

const SECOND_MODE_PRODUCT_IMAGES = [
  "/assets/products/product-second-mode-final/jisoo-second-mode-product-01.png",
  "/assets/products/product-second-mode-final/jisoo-second-mode-product-02.png",
  "/assets/products/product-second-mode-final/jisoo-second-mode-product-03.png",
  "/assets/products/product-second-mode-final/jisoo-second-mode-product-04.png",
  "/assets/products/product-second-mode-final/jisoo-second-mode-product-05.png",
  "/assets/products/product-second-mode-final/jisoo-second-mode-product-06.png",
] as const;

function getSecondModeProductImage(index: number) {
  return SECOND_MODE_PRODUCT_IMAGES[index % SECOND_MODE_PRODUCT_IMAGES.length];
}

const careIconMap: Record<ProductCareIconKind, LucideIcon> = {
  hydration: Droplets,
  brightening: Sparkles,
  "anti-aging": Clock,
  "dry-skin": Wind,
  "sensitive-skin": Shield,
  firming: Activity,
  repair: RefreshCw,
  glow: Sparkles,
  protection: Sun,
  clarity: Eye,
};

const careIconToneMap: Record<ProductCareIconKind, string> = {
  hydration: "group-hover/care:text-sky-500 group-focus/care:text-sky-500",
  brightening:
    "group-hover/care:text-champagne-gold group-focus/care:text-champagne-gold",
  "anti-aging": "group-hover/care:text-plum group-focus/care:text-plum",
  "dry-skin":
    "group-hover/care:text-champagne-gold group-focus/care:text-champagne-gold",
  "sensitive-skin":
    "group-hover/care:text-rose-mauve group-focus/care:text-rose-mauve",
  firming: "group-hover/care:text-plum group-focus/care:text-plum",
  repair: "group-hover/care:text-rose-mauve group-focus/care:text-rose-mauve",
  glow: "group-hover/care:text-champagne-gold group-focus/care:text-champagne-gold",
  protection:
    "group-hover/care:text-champagne-gold group-focus/care:text-champagne-gold",
  clarity: "group-hover/care:text-plum group-focus/care:text-plum",
};

export function ProductCard({
  product,
  index = 0,
  displayName,
  hideDescription = false,
  compact = false,
}: ProductCardProps) {
  const { addItem } = useCart();
  const { region } = useRegion();
  const { locale, dictionary } = useLocale();
  const access = evaluateRegionAccess(product, region);
  const localizedProduct = localizeProduct(product, locale);
  const cardName =
    locale === "en"
      ? (displayName ?? localizedProduct.name)
      : localizedProduct.name;
  const localizedCategory = localizedProduct.category;
  const wishlistAria =
    locale === "ar"
      ? `أضف ${cardName} إلى المفضلة`
      : locale === "fr"
        ? `Ajouter ${cardName} à la liste d’envies`
        : locale === "de"
          ? `${cardName} zur Wunschliste hinzufügen`
          : locale === "ko"
            ? `${cardName} 위시리스트에 추가`
            : locale === "tr"
              ? `${cardName} favorilere ekle`
              : `Add ${cardName} to wishlist`;

  const defaultProductImageSrc = resolveImageSrc(product.images?.[0]?.src);
  const secondModeProductImageSrc = resolveImageSrc(
    getSecondModeProductImage(index),
  );
  const statusBadge = getProductStatusBadge(product);
  const localizedStatusBadge = statusBadge
    ? { ...statusBadge, label: localizeProductLabel(statusBadge.label, locale) }
    : null;
  const careChips = getProductCareChips(product).map((chip) => ({
    ...chip,
    label: localizeProductLabel(chip.label, locale),
  }));
  const cardHighlights = getProductCardHighlights(product).map((highlight) =>
    localizeProductLabel(highlight, locale),
  );

  if (!access.isVisible) {
    return null;
  }

  return (
    <article
      className={cn(
        "jisoo-product-card group flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#e4c8d2]/24 bg-white/95 shadow-[0_18px_60px_rgba(79,54,60,0.075)] transition-transform duration-300 hover:-translate-y-1",
        localizedStatusBadge?.kind === "best-seller" && "order-first",
        compact && "rounded-[1.5rem]",
      )}
    >
      <Link
        href={localizeHref(`/product/${product.slug}`, locale)}
        className="block flex-none"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-white/85">
          <>
            <Image
              src={defaultProductImageSrc}
              alt={cardName}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="product-card-default-image object-cover transition-[opacity,transform] duration-700 group-hover:scale-105"
            />
            <Image
              src={secondModeProductImageSrc}
              alt={cardName}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="product-card-second-mode-image object-cover transition-[opacity,transform] duration-700 group-hover:scale-105"
            />
          </>

          {localizedStatusBadge &&
          localizedStatusBadge.kind === "best-seller" ? (
            <div className="pointer-events-none absolute -left-10 top-5 z-20 w-40 -rotate-45 transition duration-300 group-hover:brightness-105">
              <span
                aria-label={localizedStatusBadge.label}
                className="relative flex h-8 items-center justify-center overflow-hidden border-y border-white/60 bg-gradient-to-r from-[#a86f1f] via-[#f7d67d] to-[#c8922f] text-[10px] font-bold uppercase tracking-[0.18em] text-[#4f363c] shadow-[0_12px_26px_rgba(171,120,45,0.30)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-white/85"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px bg-[#8a5a1b]/30"
                />
                <span className="relative drop-shadow-[0_1px_0_rgba(255,255,255,0.55)]">
                  {localizedStatusBadge.label}
                </span>
              </span>
            </div>
          ) : localizedStatusBadge ? (
            <div className="absolute left-3 top-3 z-10">
              <span
                tabIndex={0}
                aria-label={localizedStatusBadge.label}
                title={localizedStatusBadge.label}
                className="group/status relative inline-flex focus:outline-none"
              >
                <Image
                  src={localizedStatusBadge.iconSrc}
                  alt={localizedStatusBadge.label}
                  width={40}
                  height={40}
                  className={cn(
                    "object-contain drop-shadow-[0_12px_24px_rgba(79,54,60,0.18)] transition-transform duration-300 group-hover/status:scale-105 group-focus/status:scale-105",
                    localizedStatusBadge.kind === "customer-favorite"
                      ? "h-8 w-8"
                      : "h-10 w-10",
                  )}
                />
              </span>
            </div>
          ) : null}

          <button
            type="button"
            aria-label={wishlistAria}
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-warm-ivory/70 bg-white/90 text-rose-mauve shadow-sm transition hover:scale-105 hover:bg-white/90"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </Link>

      <div className={cn("flex flex-1 flex-col gap-4 p-5", compact && "p-4")}>
        <div className="flex-1 space-y-3">
          <div
            className="flex flex-wrap items-center justify-center gap-2.5"
            aria-label={`${cardName} care focus`}
          >
            {careChips.map((chip) => {
              const CareIcon = careIconMap[chip.kind];
              return (
                <span
                  key={chip.label}
                  tabIndex={0}
                  aria-label={chip.label}
                  title={chip.label}
                  className="group/care relative inline-flex focus:outline-none"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-blush-pink/35 bg-warm-ivory/70 text-charcoal shadow-sm transition duration-300 group-hover/care:-translate-y-0.5 group-hover/care:border-champagne-gold/45 group-focus/care:-translate-y-0.5 group-focus/care:border-champagne-gold/45 group-focus-visible/care:ring-2 group-focus-visible/care:ring-rose-mauve/20">
                    {chip.iconSrc ? (
                      <Image
                        src={chip.iconSrc}
                        alt={chip.label}
                        width={26}
                        height={26}
                        className="h-6 w-6 object-contain transition duration-300 group-hover/care:scale-110 group-focus/care:scale-110"
                      />
                    ) : (
                      <CareIcon
                        className={cn(
                          "h-4 w-4 stroke-[1.9] text-charcoal transition-colors duration-300",
                          careIconToneMap[chip.kind],
                        )}
                      />
                    )}
                  </span>
                  <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-full border border-blush-pink/45 bg-white/95 px-2.5 py-1 text-[11px] font-medium text-charcoal opacity-0 shadow-[0_10px_24px_rgba(79,54,60,0.10)] backdrop-blur-xl transition-all duration-300 group-hover/care:translate-y-0 group-hover/care:opacity-100 group-focus/care:translate-y-0 group-focus/care:opacity-100">
                    {chip.label}
                  </span>
                </span>
              );
            })}
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-charcoal/72">
            {localizedCategory}
          </p>
          <Link
            href={localizeHref(`/product/${product.slug}`, locale)}
            className="block"
          >
            <h3
              className={cn(
                "line-clamp-2 text-lg font-medium leading-snug text-charcoal",
                compact ? "min-h-[3rem]" : "min-h-[3.1rem]",
              )}
            >
              {cardName}
            </h3>
          </Link>
          <ul className="grid gap-1.5 text-xs leading-5 text-charcoal/62">
            {cardHighlights.map((highlight) => (
              <li key={highlight} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-mauve/55" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
          {!hideDescription && (
            <p className="line-clamp-2 text-sm leading-6 text-charcoal/65">
              {localizedProduct.shortDescription}
            </p>
          )}
        </div>

        {/* P0: allow wrapping so long localized CTA labels do not collide with price block. */}
        <div className="mt-auto flex w-full flex-col items-stretch gap-3">
          <div className="flex w-full items-baseline gap-2">
            <span className="text-lg font-semibold text-charcoal">
              {product.price > 0
                ? `€${product.price.toFixed(2)}`
                : locale === "ar"
                  ? "السعر لاحقًا"
                  : locale === "fr"
                    ? "Prix à venir"
                    : locale === "de"
                      ? "Preis folgt"
                      : locale === "ko"
                        ? "가격 확인 예정"
                        : locale === "tr"
                          ? "Fiyat bekleniyor"
                          : "Price pending"}
            </span>
            {product.compareAtPrice &&
              product.compareAtPrice > product.price && (
                <span className="text-sm text-charcoal/40 line-through">
                  €{product.compareAtPrice.toFixed(2)}
                </span>
              )}
          </div>

          <Button
            type="button"
            onClick={() => addItem(product)}
            disabled={!access.isBuyable}
            className={cn(
              "w-full min-h-12 rounded-full px-6 font-semibold tracking-[0.01em]",
              access.isBuyable
                ? "bg-gradient-to-r from-rose-mauve to-[#d3af84] text-white shadow-[0_18px_60px_rgba(79,54,60,0.075)] hover:brightness-105 hover:shadow-[0_22px_70px_rgba(154,98,118,0.16)]"
                : "border border-[#e4c8d2]/24 bg-white/85 text-charcoal opacity-100",
            )}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            {access.isBuyable
              ? dictionary.product.addToCart
              : dictionary.product.notAvailable}
          </Button>
        </div>
      </div>
    </article>
  );
}

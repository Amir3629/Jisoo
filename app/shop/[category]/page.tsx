"use client";

import { useParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/product/product-card";
import { categories, products } from "@/lib/data";
import { useLocale } from "@/components/providers/locale-provider";
import { localizeProductLabel } from "@/lib/product-localization";

const routedCategories = new Set([
  ...categories.map((category) => category.slug),
  ...categories.flatMap(
    (category) => category.subcategories?.map((sub) => sub.slug) ?? [],
  ),
]);

export default function ShopCategoryPage() {
  const params = useParams<{ category: string }>();
  const category = params.category;
  const { locale } = useLocale();
  const localizedCategory = localizeProductLabel(
    category.replace(/-/g, " "),
    locale,
  );
  const copy = {
    available:
      locale === "ar"
        ? "مختارات مركزة لهذه الفئة، مع معلومات منتج واضحة وتوفر حسب المنطقة."
        : locale === "fr"
          ? "Une sélection ciblée pour cette catégorie, avec des informations produit claires et une disponibilité par région."
          : locale === "de"
            ? "Eine fokussierte Auswahl für diese Kategorie mit klaren Produktinformationen und regionaler Verfügbarkeit."
            : locale === "ko"
              ? "이 카테고리를 위한 집중 셀렉션으로, 명확한 제품 정보와 지역별 구매 가능 여부를 제공합니다."
              : locale === "tr"
                ? "Bu kategori için seçilmiş ürünler; net ürün bilgileri ve bölgeye göre erişilebilirlik içerir."
                : "A focused edit selected for this category, with clear product information and region-aware availability.",
    unavailable:
      locale === "ar"
        ? "هذه الفئة غير متاحة حاليًا في المختارات العامة. استكشفي المجموعة الكاملة للمنتجات المتوفرة."
        : locale === "fr"
          ? "Cette catégorie n’est pas disponible dans la sélection publique. Explorez toute la collection pour voir les produits disponibles."
          : locale === "de"
            ? "Diese Kategorie ist in der öffentlichen Auswahl derzeit nicht verfügbar. Entdecke die komplette Kollektion für verfügbare Produkte."
            : locale === "ko"
              ? "이 카테고리는 현재 공개 셀렉션에서 제공되지 않습니다. 전체 컬렉션에서 구매 가능한 제품을 확인하세요."
              : locale === "tr"
                ? "Bu kategori şu anda herkese açık seçkide mevcut değil. Uygun ürünler için tüm koleksiyonu keşfedin."
                : "This category is not currently available in the public edit. Explore our full collection for available products.",
    empty:
      locale === "ar"
        ? "لا توجد منتجات متاحة حاليًا في هذه الفئة."
        : locale === "fr"
          ? "Aucun produit n’est actuellement disponible dans cette catégorie."
          : locale === "de"
            ? "In dieser Kategorie sind derzeit keine Produkte verfügbar."
            : locale === "ko"
              ? "현재 이 카테고리에 제공 가능한 제품이 없습니다."
              : locale === "tr"
                ? "Bu kategoride şu anda mevcut ürün yok."
                : "No products are currently available in this category.",
  };

  const isKnownCategory = routedCategories.has(category);

  const filtered = isKnownCategory
    ? products.filter(
        (product) =>
          product.category === category || product.subcategory === category,
      )
    : [];

  return (
    <main className="min-h-screen bg-warm-ivory">
      <Header />
      <section className="pt-32 pb-16 text-center bg-gradient-to-b from-nude-beige/50 to-warm-ivory">
        <h1 className="font-serif text-4xl lg:text-5xl text-charcoal capitalize">
          {localizedCategory}
        </h1>
        <p className="mt-4 text-muted-foreground">
          {isKnownCategory ? copy.available : copy.unavailable}
        </p>
      </section>
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid gap-6 lg:gap-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {filtered.length > 0 ? (
            filtered.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                hideDescription
              />
            ))
          ) : (
            <div className="col-span-full text-center text-muted-foreground">
              {copy.empty}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}

"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Grid3X3,
  LayoutGrid,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/product/product-card";
import { useLocale } from "@/components/providers/locale-provider";
import { categories, products } from "@/lib/data";
import { cn } from "@/lib/utils";
import { localizeProductLabel } from "@/lib/product-localization";
import type { Locale } from "@/lib/i18n";
import type { Product } from "@/lib/types";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Best Rated" },
];

const skinTypes = [
  "Dry Skin",
  "Oily Skin",
  "Combination Skin",
  "Sensitive Skin",
];

const concerns = [
  {
    label: "Hydration",
    value: "hydration",
    aliases: ["hydration", "moisture", "dehydration", "dryness"],
  },
  {
    label: "Brightening",
    value: "brightening",
    aliases: [
      "brightening",
      "radiance",
      "glow",
      "pigmentation",
      "tone-up",
      "uneven tone",
    ],
  },
  {
    label: "Anti-Aging",
    value: "anti-aging",
    aliases: [
      "anti-aging",
      "anti aging",
      "antiaging",
      "wrinkles",
      "fine lines",
      "firmness",
      "elasticity",
      "collagen",
    ],
  },
  {
    label: "Soothing",
    value: "soothing",
    aliases: ["soothing", "calming", "sensitive", "comfort"],
  },
  {
    label: "Pores",
    value: "pores",
    aliases: ["pores", "pore", "sebum", "oiliness", "clarity"],
  },
  { label: "Acne", value: "acne", aliases: ["acne", "blemishes", "breakout"] },
];

const priceRanges = [
  { label: "Under €30", value: "under-30" },
  { label: "€30 - €50", value: "30-50" },
  { label: "€50 - €80", value: "50-80" },
  { label: "Over €80", value: "over-80" },
];

const shopCopy: Record<
  Locale,
  {
    title: string;
    intro: string;
    filters: string;
    products: string;
    category: string;
    allCategories: string;
    skinType: string;
    allSkinTypes: string;
    concern: string;
    price: string;
    active: string;
    clearAll: string;
    noMatches: string;
    noMatchesBody: string;
    clearFilters: string;
    loadMore: string;
    grid: string;
    largeGrid: string;
    sort: Record<string, string>;
    filterLabels: Record<string, string>;
  }
> = {
  en: {
    title: "Shop All Products",
    intro: "Explore our curated collection of premium Korean beauty essentials",
    filters: "Filters",
    products: "products",
    category: "Category",
    allCategories: "All Categories",
    skinType: "Skin Type",
    allSkinTypes: "All Skin Types",
    concern: "Concern",
    price: "Price",
    active: "Active:",
    clearAll: "Clear all",
    noMatches: "No matching products",
    noMatchesBody: "Try clearing filters or choosing another care category.",
    clearFilters: "Clear Filters",
    loadMore: "Load More Products",
    grid: "Compact product grid",
    largeGrid: "Large product grid",
    sort: Object.fromEntries(
      sortOptions.map((option) => [option.value, option.label]),
    ),
    filterLabels: {},
  },
  fr: {
    title: "Tous les produits",
    intro: "Explorez notre sélection d’essentiels beauté coréens premium",
    filters: "Filtres",
    products: "produits",
    category: "Catégorie",
    allCategories: "Toutes les catégories",
    skinType: "Type de peau",
    allSkinTypes: "Tous types de peau",
    concern: "Besoin",
    price: "Prix",
    active: "Actif :",
    clearAll: "Tout effacer",
    noMatches: "Aucun produit correspondant",
    noMatchesBody:
      "Essayez d’effacer les filtres ou de choisir une autre catégorie.",
    clearFilters: "Effacer les filtres",
    loadMore: "Afficher plus de produits",
    grid: "Grille compacte",
    largeGrid: "Grande grille",
    sort: {
      featured: "Sélection",
      newest: "Nouveautés",
      "price-asc": "Prix : croissant",
      "price-desc": "Prix : décroissant",
      rating: "Mieux notés",
    },
    filterLabels: {
      "Dry Skin": "Peau sèche",
      "Oily Skin": "Peau grasse",
      "Combination Skin": "Peau mixte",
      "Sensitive Skin": "Peau sensible",
      Hydration: "Hydratation",
      Brightening: "Éclat",
      "Anti-Aging": "Anti-âge",
      Soothing: "Apaisant",
      Pores: "Pores",
      Acne: "Acné",
      "Under €30": "Moins de 30 €",
      "€30 - €50": "30 € - 50 €",
      "€50 - €80": "50 € - 80 €",
      "Over €80": "Plus de 80 €",
    },
  },
  de: {
    title: "Alle Produkte shoppen",
    intro:
      "Entdecke unsere kuratierte Auswahl hochwertiger koreanischer Beauty-Essentials",
    filters: "Filter",
    products: "Produkte",
    category: "Kategorie",
    allCategories: "Alle Kategorien",
    skinType: "Hauttyp",
    allSkinTypes: "Alle Hauttypen",
    concern: "Hautthema",
    price: "Preis",
    active: "Aktiv:",
    clearAll: "Alles löschen",
    noMatches: "Keine passenden Produkte",
    noMatchesBody: "Lösche Filter oder wähle eine andere Pflegekategorie.",
    clearFilters: "Filter löschen",
    loadMore: "Mehr Produkte laden",
    grid: "Kompaktes Produktraster",
    largeGrid: "Großes Produktraster",
    sort: {
      featured: "Empfohlen",
      newest: "Neueste",
      "price-asc": "Preis: niedrig bis hoch",
      "price-desc": "Preis: hoch bis niedrig",
      rating: "Bestbewertet",
    },
    filterLabels: {
      "Dry Skin": "Trockene Haut",
      "Oily Skin": "Ölige Haut",
      "Combination Skin": "Mischhaut",
      "Sensitive Skin": "Empfindliche Haut",
      Hydration: "Feuchtigkeit",
      Brightening: "Aufhellung",
      "Anti-Aging": "Anti-Aging",
      Soothing: "Beruhigung",
      Pores: "Poren",
      Acne: "Akne",
      "Under €30": "Unter 30 €",
      "€30 - €50": "30 € - 50 €",
      "€50 - €80": "50 € - 80 €",
      "Over €80": "Über 80 €",
    },
  },
  ko: {
    title: "전체 제품 쇼핑",
    intro: "엄선한 프리미엄 코리안 뷰티 에센셜을 만나보세요",
    filters: "필터",
    products: "개 제품",
    category: "카테고리",
    allCategories: "전체 카테고리",
    skinType: "피부 타입",
    allSkinTypes: "모든 피부 타입",
    concern: "고민",
    price: "가격",
    active: "적용:",
    clearAll: "전체 삭제",
    noMatches: "일치하는 제품이 없습니다",
    noMatchesBody: "필터를 지우거나 다른 케어 카테고리를 선택해 보세요.",
    clearFilters: "필터 지우기",
    loadMore: "제품 더 보기",
    grid: "컴팩트 제품 그리드",
    largeGrid: "큰 제품 그리드",
    sort: {
      featured: "추천",
      newest: "신상품",
      "price-asc": "가격 낮은순",
      "price-desc": "가격 높은순",
      rating: "평점순",
    },
    filterLabels: {
      "Dry Skin": "건성 피부",
      "Oily Skin": "지성 피부",
      "Combination Skin": "복합성 피부",
      "Sensitive Skin": "민감성 피부",
      Hydration: "수분",
      Brightening: "브라이트닝",
      "Anti-Aging": "안티에이징",
      Soothing: "진정",
      Pores: "모공",
      Acne: "트러블",
      "Under €30": "€30 미만",
      "€30 - €50": "€30 - €50",
      "€50 - €80": "€50 - €80",
      "Over €80": "€80 이상",
    },
  },
  tr: {
    title: "Tüm Ürünleri Alışveriş Yap",
    intro: "Özenle seçilmiş premium Kore güzellik ürünlerini keşfedin",
    filters: "Filtreler",
    products: "ürün",
    category: "Kategori",
    allCategories: "Tüm kategoriler",
    skinType: "Cilt tipi",
    allSkinTypes: "Tüm cilt tipleri",
    concern: "İhtiyaç",
    price: "Fiyat",
    active: "Aktif:",
    clearAll: "Tümünü temizle",
    noMatches: "Eşleşen ürün yok",
    noMatchesBody:
      "Filtreleri temizlemeyi veya başka bir bakım kategorisi seçmeyi deneyin.",
    clearFilters: "Filtreleri temizle",
    loadMore: "Daha fazla ürün yükle",
    grid: "Kompakt ürün ızgarası",
    largeGrid: "Büyük ürün ızgarası",
    sort: {
      featured: "Öne çıkan",
      newest: "En yeni",
      "price-asc": "Fiyat: düşükten yükseğe",
      "price-desc": "Fiyat: yüksekten düşüğe",
      rating: "En iyi puan",
    },
    filterLabels: {
      "Dry Skin": "Kuru cilt",
      "Oily Skin": "Yağlı cilt",
      "Combination Skin": "Karma cilt",
      "Sensitive Skin": "Hassas cilt",
      Hydration: "Nem",
      Brightening: "Aydınlatma",
      "Anti-Aging": "Yaşlanma karşıtı",
      Soothing: "Yatıştırma",
      Pores: "Gözenek",
      Acne: "Akne",
      "Under €30": "30 € altı",
      "€30 - €50": "30 € - 50 €",
      "€50 - €80": "50 € - 80 €",
      "Over €80": "80 € üzeri",
    },
  },
  ar: {
    title: "تسوّقي كل المنتجات",
    intro: "اكتشفي مجموعتنا المختارة من أساسيات الجمال الكوري الفاخرة",
    filters: "الفلاتر",
    products: "منتجًا",
    category: "الفئة",
    allCategories: "كل الفئات",
    skinType: "نوع البشرة",
    allSkinTypes: "كل أنواع البشرة",
    concern: "الاحتياج",
    price: "السعر",
    active: "النشط:",
    clearAll: "مسح الكل",
    noMatches: "لا توجد منتجات مطابقة",
    noMatchesBody: "جرّبي مسح الفلاتر أو اختيار فئة عناية أخرى.",
    clearFilters: "مسح الفلاتر",
    loadMore: "تحميل المزيد من المنتجات",
    grid: "شبكة منتجات مدمجة",
    largeGrid: "شبكة منتجات كبيرة",
    sort: {
      featured: "مختارة",
      newest: "الأحدث",
      "price-asc": "السعر: من الأقل للأعلى",
      "price-desc": "السعر: من الأعلى للأقل",
      rating: "الأعلى تقييمًا",
    },
    filterLabels: {
      "Dry Skin": "بشرة جافة",
      "Oily Skin": "بشرة دهنية",
      "Combination Skin": "بشرة مختلطة",
      "Sensitive Skin": "بشرة حساسة",
      Hydration: "ترطيب",
      Brightening: "تفتيح وإشراق",
      "Anti-Aging": "مقاومة علامات التقدم",
      Soothing: "تهدئة",
      Pores: "المسام",
      Acne: "حب الشباب",
      "Under €30": "أقل من 30€",
      "€30 - €50": "30€ - 50€",
      "€50 - €80": "50€ - 80€",
      "Over €80": "أكثر من 80€",
    },
  },
};

const categoryAliases: Record<string, string[]> = {
  skincare: [
    "cream",
    "oil",
    "mask",
    "cleanser",
    "toner",
    "sun care",
    "serum",
    "ampoule",
    "essence",
    "lotion",
    "fluid",
    "emulsion",
    "eye care",
    "mist",
    "toner pad",
    "cleansing oil",
    "exfoliant",
    "tone-up care",
    "trial care",
  ],
  "body-care": [
    "body care",
    "body-wash",
    "body-lotion",
    "body-oil",
    "body-mist",
    "bath-care",
    "hand-care",
    "foot-care",
  ],
  "hair-care": [
    "hair care",
    "shampoo",
    "rinse",
    "hair-treatment",
    "hair-essence",
    "hair-tonic",
    "hair-styling",
  ],
  sets: ["sets", "set", "bundle", "bundles"],
  fragrance: ["fragrance"],
  oil: ["oil", "cleansing oil", "body oil"],
  oils: ["oil", "cleansing oil", "body oil"],
  mask: ["mask", "sheet mask", "wash-off pack"],
  masks: ["mask", "sheet mask", "wash-off pack"],
  cream: ["cream"],
  creams: ["cream"],
  moisturizers: ["cream", "lotion", "fluid", "emulsion"],
  "sun-care": ["sun care"],
  suncare: ["sun care"],
  cleansers: ["cleanser", "cleansing oil", "exfoliant"],
  toners: ["toner", "toner pad", "essence"],
  serums: ["serum", "ampoule"],
};

const surfaceClass =
  "rounded-3xl border border-[#cfae83]/24 bg-[linear-gradient(155deg,var(--card)_0%,color-mix(in_srgb,var(--background)_88%,white)_58%,color-mix(in_srgb,var(--background)_92%,#cfae83)_100%)] shadow-luxury";
const softControlClass =
  "rounded-full border border-[#cfae83]/28 bg-[color-mix(in_srgb,var(--background)_84%,white)] text-charcoal shadow-sm";
const selectedControlClass =
  "rounded-full border border-rose-mauve/35 bg-[linear-gradient(135deg,#d8a7bd_0%,#d3af84_100%)] text-white shadow-luxury";
const filterGroupClass =
  "rounded-2xl border border-[#cfae83]/20 bg-white/16 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]";

function normalize(value: string) {
  return value.trim().toLowerCase();
}
function slugify(value: string) {
  return normalize(value).replace(/_/g, "-").replace(/\s+/g, "-");
}
function productSearchText(product: Product) {
  return [
    product.name,
    product.category,
    product.subcategory,
    ...product.tags,
    ...product.skinType,
    ...(product.skinTypes ?? []),
    ...product.concerns,
    ...product.keyBenefits,
    product.shortDescription,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function categoryMatches(product: Product, selectedCategory: string | null) {
  if (!selectedCategory) return true;
  const selected = normalize(selectedCategory);
  const candidates = new Set([
    selected,
    selected.replace(/-/g, " "),
    selected.endsWith("s") ? selected.slice(0, -1) : selected,
    ...(categoryAliases[selected] ?? []),
  ]);
  const productValues = [product.category, product.subcategory ?? ""]
    .filter(Boolean)
    .flatMap((value) => [normalize(value), slugify(value)]);
  return productValues.some((value) => candidates.has(value));
}
function skinTypeMatches(product: Product, selectedSkinTypes: string[]) {
  return (
    selectedSkinTypes.length === 0 ||
    selectedSkinTypes.some((skinType) =>
      [...product.skinType, ...(product.skinTypes ?? [])]
        .map(normalize)
        .includes(normalize(skinType)),
    )
  );
}
function concernMatches(product: Product, selectedConcerns: string[]) {
  if (selectedConcerns.length === 0) return true;
  const searchable = productSearchText(product);
  return selectedConcerns.some((label) =>
    (
      concerns.find((concern) => concern.label === label)?.aliases ?? [label]
    ).some((alias) => searchable.includes(normalize(alias))),
  );
}
function priceMatches(product: Product, selectedPrices: string[]) {
  if (selectedPrices.length === 0) return true;
  return selectedPrices.some((label) => {
    if (label === "Under €30") return product.price < 30;
    if (label === "€30 - €50")
      return product.price >= 30 && product.price <= 50;
    if (label === "€50 - €80") return product.price > 50 && product.price <= 80;
    if (label === "Over €80") return product.price > 80;
    return true;
  });
}
function sortProducts(productList: Product[], sortBy: string) {
  return [...productList].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return (b.rating ?? 0) - (a.rating ?? 0);
    if (sortBy === "newest")
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    return (
      Number(Boolean(b.isBestSeller)) +
      Number(Boolean(b.isNew)) -
      (Number(Boolean(a.isBestSeller)) + Number(Boolean(a.isNew)))
    );
  });
}
function findConcernLabelFromParam(value: string | null) {
  if (!value) return null;
  const normalized = slugify(value);
  return (
    concerns.find(
      (concern) =>
        concern.value === normalized ||
        concern.aliases.some((alias) => slugify(alias) === normalized),
    )?.label ?? null
  );
}
function findPriceLabelFromParam(value: string | null) {
  if (!value) return null;
  const normalized = normalize(value).replace(/\s+/g, "");
  return (
    priceRanges.find(
      (range) =>
        range.value === normalized ||
        normalize(range.label).replace(/\s+/g, "") === normalized,
    )?.label ?? null
  );
}

function ShopPageContent() {
  const searchParams = useSearchParams();
  const { locale } = useLocale();
  const copy = shopCopy[locale];
  const tFilter = (label: string) => copy.filterLabels[label] ?? label;
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [gridView, setGridView] = useState<"grid" | "large">("large");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const concernParam = searchParams.get("concern");
    const priceParam = searchParams.get("price");
    const sortParam = searchParams.get("sort");
    setSelectedCategory(categoryParam ? normalize(categoryParam) : null);
    setSelectedFilters(
      [
        findConcernLabelFromParam(concernParam),
        findPriceLabelFromParam(priceParam),
      ].filter(Boolean) as string[],
    );
    if (sortParam && sortOptions.some((option) => option.value === sortParam))
      setSortBy(sortParam);
    setVisibleCount(12);
  }, [searchParams]);

  const selectedSkinTypes = selectedFilters.filter((filter) =>
    skinTypes.includes(filter),
  );
  const selectedConcerns = selectedFilters.filter((filter) =>
    concerns.some((concern) => concern.label === filter),
  );
  const selectedPrices = selectedFilters.filter((filter) =>
    priceRanges.some((range) => range.label === filter),
  );
  const activeFilterCount = selectedFilters.length + (selectedCategory ? 1 : 0);

  const filteredProducts = useMemo(
    () =>
      sortProducts(
        products.filter(
          (product) =>
            categoryMatches(product, selectedCategory) &&
            skinTypeMatches(product, selectedSkinTypes) &&
            concernMatches(product, selectedConcerns) &&
            priceMatches(product, selectedPrices),
        ),
        sortBy,
      ),
    [
      selectedCategory,
      selectedConcerns,
      selectedPrices,
      selectedSkinTypes,
      sortBy,
    ],
  );
  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const toggleFilter = (filter: string) => {
    setVisibleCount(12);
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((item) => item !== filter)
        : [...prev, filter],
    );
  };
  const clearSkinTypeFilters = () => {
    setVisibleCount(12);
    setSelectedFilters((prev) =>
      prev.filter((filter) => !skinTypes.includes(filter)),
    );
  };
  const clearAll = () => {
    setSelectedCategory(null);
    setSelectedFilters([]);
    setVisibleCount(12);
  };

  return (
    <main className="min-h-screen bg-warm-ivory">
      <Header />
      <section className="relative bg-gradient-to-b from-nude-beige/50 to-warm-ivory pb-16 pt-32 lg:pb-20 lg:pt-40">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl font-bold text-charcoal lg:text-5xl xl:text-6xl"
          >
            {copy.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.58,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
          >
            {copy.intro}
          </motion.p>
        </div>
      </section>
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#cfae83]/24 py-6">
            <button
              onClick={() => setIsFilterOpen((open) => !open)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all",
                isFilterOpen
                  ? selectedControlClass
                  : cn(softControlClass, "hover:border-rose-mauve/45"),
              )}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>{copy.filters}</span>
              {activeFilterCount > 0 && (
                <span className="ml-2 inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-[#d3af84]/55 bg-white/92 px-2 text-xs font-semibold leading-none text-[#4f363c] shadow-[0_6px_14px_rgba(79,54,60,0.10),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-sm">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {filteredProducts.length} {copy.products}
              </span>
              <div
                className={cn(
                  "hidden items-center gap-1 rounded-full p-1 sm:flex",
                  softControlClass,
                )}
              >
                <button
                  onClick={() => setGridView("grid")}
                  className={cn(
                    "rounded-full p-2 transition-colors",
                    gridView === "grid"
                      ? "bg-[linear-gradient(135deg,#d8a7bd_0%,#d3af84_100%)] text-white"
                      : "text-charcoal hover:bg-blush-pink/20",
                  )}
                  aria-label={copy.grid}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setGridView("large")}
                  className={cn(
                    "rounded-full p-2 transition-colors",
                    gridView === "large"
                      ? "bg-[linear-gradient(135deg,#d8a7bd_0%,#d3af84_100%)] text-white"
                      : "text-charcoal hover:bg-blush-pink/20",
                  )}
                  aria-label={copy.largeGrid}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
              </div>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className={cn(
                    "appearance-none rounded-full px-4 py-2.5 pr-10 text-sm focus:outline-none focus:border-rose-mauve cursor-pointer",
                    softControlClass,
                  )}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {copy.sort[option.value]}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
          </div>
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className={cn("my-8 p-6 sm:p-8", surfaceClass)}>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className={filterGroupClass}>
                      <h3 className="mb-4 font-medium text-charcoal">
                        {copy.category}
                      </h3>
                      <div className="space-y-2">
                        <button
                          onClick={() => {
                            setSelectedCategory(null);
                            setVisibleCount(12);
                          }}
                          className={cn(
                            "block text-sm transition-colors",
                            !selectedCategory
                              ? "font-medium text-plum"
                              : "text-muted-foreground hover:text-charcoal",
                          )}
                        >
                          {copy.allCategories}
                        </button>
                        {categories.slice(0, 5).map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => {
                              setSelectedCategory(cat.slug);
                              setVisibleCount(12);
                            }}
                            className={cn(
                              "block text-sm transition-colors",
                              selectedCategory === cat.slug
                                ? "font-medium text-plum"
                                : "text-muted-foreground hover:text-charcoal",
                            )}
                          >
                            {localizeProductLabel(cat.name, locale)}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className={filterGroupClass}>
                      <h3 className="mb-4 font-medium text-charcoal">
                        {copy.skinType}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={clearSkinTypeFilters}
                          className={cn(
                            "rounded-full px-3 py-1.5 text-sm transition-all",
                            selectedSkinTypes.length === 0
                              ? selectedControlClass
                              : cn(
                                  softControlClass,
                                  "hover:border-rose-mauve/45",
                                ),
                          )}
                        >
                          {copy.allSkinTypes}
                        </button>
                        {skinTypes.map((type) => (
                          <button
                            key={type}
                            onClick={() => toggleFilter(type)}
                            className={cn(
                              "rounded-full px-3 py-1.5 text-sm transition-all",
                              selectedFilters.includes(type)
                                ? selectedControlClass
                                : cn(
                                    softControlClass,
                                    "hover:border-rose-mauve/45",
                                  ),
                            )}
                          >
                            {tFilter(type)}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className={filterGroupClass}>
                      <h3 className="mb-4 font-medium text-charcoal">
                        {copy.concern}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {concerns.map((concern) => (
                          <button
                            key={concern.value}
                            onClick={() => toggleFilter(concern.label)}
                            className={cn(
                              "rounded-full px-3 py-1.5 text-sm transition-all",
                              selectedFilters.includes(concern.label)
                                ? selectedControlClass
                                : cn(
                                    softControlClass,
                                    "hover:border-rose-mauve/45",
                                  ),
                            )}
                          >
                            {tFilter(concern.label)}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className={filterGroupClass}>
                      <h3 className="mb-4 font-medium text-charcoal">
                        {copy.price}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {priceRanges.map((range) => (
                          <button
                            key={range.value}
                            onClick={() => toggleFilter(range.label)}
                            className={cn(
                              "rounded-full px-3 py-1.5 text-sm transition-all",
                              selectedFilters.includes(range.label)
                                ? selectedControlClass
                                : cn(
                                    softControlClass,
                                    "hover:border-rose-mauve/45",
                                  ),
                            )}
                          >
                            {tFilter(range.label)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  {activeFilterCount > 0 && (
                    <div className="mt-6 border-t border-[#cfae83]/24 pt-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {copy.active}
                        </span>
                        {selectedCategory && (
                          <button
                            onClick={() => setSelectedCategory(null)}
                            className="flex items-center gap-1 rounded-full border border-[#cfae83]/20 bg-[#d3af84]/18 px-3 py-1 text-sm text-charcoal"
                          >
                            {categories.find(
                              (category) => category.slug === selectedCategory,
                            )?.name ?? selectedCategory.replace(/-/g, " ")}
                            <X className="h-3 w-3" />
                          </button>
                        )}
                        {selectedFilters.map((filter) => (
                          <button
                            key={filter}
                            onClick={() => toggleFilter(filter)}
                            className="flex items-center gap-1 rounded-full border border-[#cfae83]/20 bg-[#d3af84]/18 px-3 py-1 text-sm text-charcoal"
                          >
                            {tFilter(filter)}
                            <X className="h-3 w-3" />
                          </button>
                        ))}
                        <button
                          onClick={clearAll}
                          className="ml-2 text-sm text-rose-mauve transition-colors hover:text-plum"
                        >
                          {copy.clearAll}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {visibleProducts.length > 0 ? (
            <div
              className={cn(
                "mt-8 grid gap-6 lg:gap-8",
                gridView === "grid"
                  ? "grid-cols-1 md:grid-cols-3 lg:grid-cols-4"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
              )}
            >
              {visibleProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  hideDescription
                />
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-3xl border border-blush-pink/30 bg-white/60 p-10 text-center">
              <h2 className="font-serif text-2xl text-charcoal">
                {copy.noMatches}
              </h2>
              <p className="mt-3 text-muted-foreground">{copy.noMatchesBody}</p>
              <button
                onClick={clearAll}
                className="mt-6 rounded-full bg-gradient-to-r from-rose-mauve to-[#d3af84] px-6 py-3 text-sm font-medium text-white"
              >
                {copy.clearFilters}
              </button>
            </div>
          )}
          {visibleCount < filteredProducts.length && (
            <div className="mt-16 text-center">
              <button
                onClick={() => setVisibleCount((count) => count + 12)}
                className="rounded-full bg-gradient-to-r from-rose-mauve to-[#d3af84] px-8 py-4 font-medium text-white transition-all duration-300 hover:brightness-105"
              >
                {copy.loadMore}
              </button>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-warm-ivory" />}>
      <ShopPageContent />
    </Suspense>
  );
}

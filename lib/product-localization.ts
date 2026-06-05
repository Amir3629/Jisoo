import type { Locale } from "./i18n";
import type { Product, ProductVariant } from "./types";

export type LocalizedProductContent = {
  name: string;
  subtitle?: string;
  category: string;
  subcategory?: string;
  shortDescription: string;
  longDescription: string;
  keyBenefits: string[];
  ingredients: string[];
  usageInstructions: string;
  skinType: string[];
  concerns: string[];
  texture?: string;
  finish?: string;
  variants?: ProductVariant[];
};

type LocaleCopy = Record<Locale, string>;
type LocalizedValueMap = Record<string, Partial<LocaleCopy>>;

const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "Arabic",
  fr: "French",
  de: "German",
  ko: "Korean",
  tr: "Turkish",
};

const productNameBySlug: LocalizedValueMap = {
  "radiance-boost-true-vitamin-c-23-serum": {
    ar: "سيروم Radiance Boost بفيتامين C 23",
    fr: "Sérum Radiance Boost True Vitamin C 23",
    de: "Radiance Boost True Vitamin C 23 Serum",
    ko: "래디언스 부스트 트루 비타민 C 23 세럼",
    tr: "Radiance Boost True C Vitamini 23 Serumu",
  },
  "pore-deep-clean-bubble-cleanser": {
    ar: "منظف فقاعات عميق للمسام",
    fr: "Nettoyant bulles Pore Deep Clean",
    de: "Pore Deep Clean Bubble Cleanser",
    ko: "포어 딥 클린 버블 클렌저",
    tr: "Pore Deep Clean Kabarcık Temizleyici",
  },
  "dewy-glow-azulene-gel-toner-pad": {
    ar: "باد تونر جل أزولين Dewy Glow",
    fr: "Pads toner gel azulène Dewy Glow",
    de: "Dewy Glow Azulene Gel Toner Pads",
    ko: "듀이 글로우 아줄렌 젤 토너 패드",
    tr: "Dewy Glow Azulen Jel Tonik Pedi",
  },
  "daily-uv-shield-sunscreen": {
    ar: "واقي الشمس Daily UV Shield",
    fr: "Protection solaire Daily UV Shield",
    de: "Daily UV Shield Sonnenschutz",
    ko: "데일리 UV 쉴드 선스크린",
    tr: "Daily UV Shield Güneş Kremi",
  },
  "pore-clear-vita-colla-cleansing-form": {
    ar: "منظف Pore Clear Vita-Colla",
    fr: "Mousse nettoyante Pore Clear Vita-Colla",
    de: "Pore Clear Vita-Colla Reinigungsschaum",
    ko: "포어 클리어 비타 콜라 클렌징 폼",
    tr: "Pore Clear Vita-Colla Temizleme Köpüğü",
  },
  "hydra-daily-snow-collagen-cream": {
    ar: "كريم Hydra Daily Snow Collagen",
    fr: "Crème Hydra Daily Snow Collagen",
    de: "Hydra Daily Snow Collagen Creme",
    ko: "하이드라 데일리 스노우 콜라겐 크림",
    tr: "Hydra Daily Snow Collagen Krem",
  },
  "professional-concentrate-spicule-cream": {
    ar: "كريم Professional Concentrate Spicule",
    fr: "Crème Professional Concentrate Spicule",
    de: "Professional Concentrate Spicule Creme",
    ko: "프로페셔널 콘센트레이트 스피큘 크림",
    tr: "Professional Concentrate Spicule Krem",
  },
  "real-effect-pore-tightening-cream": {
    ar: "كريم Real Effect لشد المسام",
    fr: "Crème resserrante pores Real Effect",
    de: "Real Effect Porenstraffende Creme",
    ko: "리얼 이펙트 포어 타이트닝 크림",
    tr: "Real Effect Gözenek Sıkılaştırıcı Krem",
  },
  "real-effect-vita-toning-serum": {
    ar: "سيروم Real Effect Vita Toning",
    fr: "Sérum Real Effect Vita Toning",
    de: "Real Effect Vita Toning Serum",
    ko: "리얼 이펙트 비타 토닝 세럼",
    tr: "Real Effect Vita Ton Eşitleyici Serum",
  },
  "deep-clean-soft-peeling-gel": {
    ar: "جل تقشير ناعم Deep Clean",
    fr: "Gel peeling doux Deep Clean",
    de: "Deep Clean Soft Peeling Gel",
    ko: "딥 클린 소프트 필링 젤",
    tr: "Deep Clean Yumuşak Peeling Jel",
  },
  "real-effect-pore-smoothing-skin-balancer": {
    ar: "موازن البشرة Real Effect لتنعيم المسام",
    fr: "Équilibrant peau Real Effect lissant pores",
    de: "Real Effect Pore Smoothing Skin Balancer",
    ko: "리얼 이펙트 포어 스무딩 스킨 밸런서",
    tr: "Real Effect Gözenek Pürüzsüzleştirici Cilt Dengeleyici",
  },
  "white-touch-selfie-cream": {
    ar: "كريم White Touch Selfie",
    fr: "Crème White Touch Selfie",
    de: "White Touch Selfie Creme",
    ko: "화이트 터치 셀피 크림",
    tr: "White Touch Selfie Krem",
  },
  "pure-hop-panthenol-barrier-cream-100ml": {
    ar: "كريم حاجز Pure Hop Panthenol 100مل",
    fr: "Crème barrière Pure Hop Panthenol 100 ml",
    de: "Pure Hop Panthenol Barrier Creme 100 ml",
    ko: "퓨어 홉 판테놀 배리어 크림 100ml",
    tr: "Pure Hop Panthenol Bariyer Krem 100 ml",
  },
  "pure-me-whip-foam-cleanser-150ml": {
    ar: "منظف رغوي Pure Me Whip Foam 150مل",
    fr: "Nettoyant mousse fouettée Pure Me 150 ml",
    de: "Pure Me Whip Foam Cleanser 150 ml",
    ko: "퓨어 미 휩 폼 클렌저 150ml",
    tr: "Pure Me Whip Foam Temizleyici 150 ml",
  },
  "all-day-mellow-uv-sun-screen-50ml-spf50-pa": {
    ar: "واقي الشمس All Day Mellow UV 50مل SPF50+/PA++++",
    fr: "Protection solaire All Day Mellow UV 50 ml SPF50+/PA++++",
    de: "All Day Mellow UV Sonnenschutz 50 ml SPF50+/PA++++",
    ko: "올 데이 멜로우 UV 선스크린 50ml SPF50+/PA++++",
    tr: "All Day Mellow UV Güneş Kremi 50 ml SPF50+/PA++++",
  },
  "yogurt-cream-wash-off-mask-pack-130ml": {
    ar: "قناع Yogurt Cream Wash-off 130مل",
    fr: "Masque crème yaourt à rincer 130 ml",
    de: "Yogurt Cream Wash-off Maske 130 ml",
    ko: "요거트 크림 워시오프 마스크 팩 130ml",
    tr: "Yogurt Cream Durulanan Maske 130 ml",
  },
  "luminous-cicacare-blemish-serum": {
    ar: "سيروم Luminous Cicacare للعيوب",
    fr: "Sérum imperfections Luminous Cicacare",
    de: "Luminous Cicacare Blemish Serum",
    ko: "루미너스 시카케어 블레미쉬 세럼",
    tr: "Luminous Cicacare Leke Serumu",
  },
  "luminous-cica-care-blemish-traces-serum-50ml-melanin-pore-tightening-relief":
    {
      ar: "سيروم Luminous Cica Care لآثار العيوب 50مل",
      fr: "Sérum traces d’imperfections Luminous Cica Care 50 ml",
      de: "Luminous Cica Care Blemish Traces Serum 50 ml",
      ko: "루미너스 시카 케어 블레미쉬 트레이스 세럼 50ml",
      tr: "Luminous Cica Care Leke İzi Serumu 50 ml",
    },
  "moisture-lasting-cream-100ml": {
    ar: "كريم ترطيب طويل الأمد 100مل",
    fr: "Crème hydratation longue durée 100 ml",
    de: "Lang anhaltende Feuchtigkeitscreme 100 ml",
    ko: "모이스처 래스팅 크림 100ml",
    tr: "Uzun Süreli Nem Kremi 100 ml",
  },
  "aqua-soothing-gel-cream-50-ml": {
    ar: "كريم جل Aqua Soothing 50مل",
    fr: "Crème gel apaisante Aqua 50 ml",
    de: "Aqua Soothing Gel-Creme 50 ml",
    ko: "아쿠아 수딩 젤 크림 50ml",
    tr: "Aqua Yatıştırıcı Jel Krem 50 ml",
  },
  "no-sebum-whitening-tone-up-cream-50ml": {
    ar: "كريم No-sebum Whitening Tone Up 50مل",
    fr: "Crème tonifiante No-sebum Whitening 50 ml",
    de: "No-sebum Whitening Tone Up Creme 50 ml",
    ko: "노세범 화이트닝 톤업 크림 50ml",
    tr: "No-sebum Aydınlatıcı Tone Up Krem 50 ml",
  },
  "heartleaf-skin-clear-toner-300ml": {
    ar: "تونر Heartleaf Skin Clear 300مل",
    fr: "Tonique peau nette Heartleaf 300 ml",
    de: "Heartleaf Skin Clear Toner 300 ml",
    ko: "어성초 스킨 클리어 토너 300ml",
    tr: "Heartleaf Cilt Arındırıcı Tonik 300 ml",
  },
  "breeze-essence-fluid-lotion-210ml": {
    ar: "لوشن Breeze Essence Fluid 210مل",
    fr: "Lotion fluide Breeze Essence 210 ml",
    de: "Breeze Essence Fluid Lotion 210 ml",
    ko: "브리즈 에센스 플루이드 로션 210ml",
    tr: "Breeze Essence Fluid Losyon 210 ml",
  },
  "luminous-cicacare-blemish-cream-50ml": {
    ar: "كريم Luminous Cicacare للعيوب 50مل",
    fr: "Crème imperfections Luminous Cicacare 50 ml",
    de: "Luminous Cicacare Blemish Creme 50 ml",
    ko: "루미너스 시카케어 블레미쉬 크림 50ml",
    tr: "Luminous Cicacare Leke Kremi 50 ml",
  },
  "mild-bha-5-5-bubble-foam-cleanser-200ml": {
    ar: "منظف رغوي Mild BHA 5.5 Bubble 200مل",
    fr: "Nettoyant mousse Mild BHA 5.5 Bubble 200 ml",
    de: "Mild BHA 5.5 Bubble Foam Cleanser 200 ml",
    ko: "마일드 BHA 5.5 버블 폼 클렌저 200ml",
    tr: "Mild BHA 5.5 Bubble Foam Temizleyici 200 ml",
  },
  "pure-me-foam-cleanser-500ml": {
    ar: "منظف رغوي Pure Me 500مل",
    fr: "Nettoyant mousse Pure Me 500 ml",
    de: "Pure Me Foam Cleanser 500 ml",
    ko: "퓨어 미 폼 클렌저 500ml",
    tr: "Pure Me Foam Temizleyici 500 ml",
  },
  "essential-deep-cleansing-oil-250ml": {
    ar: "زيت تنظيف عميق Essential 250مل",
    fr: "Huile nettoyante profonde Essential 250 ml",
    de: "Essential Deep Cleansing Oil 250 ml",
    ko: "에센셜 딥 클렌징 오일 250ml",
    tr: "Essential Derin Temizleme Yağı 250 ml",
  },
};

const categoryLabels: LocalizedValueMap = {
  serum: { ar: "سيروم", fr: "Sérum", de: "Serum", ko: "세럼", tr: "Serum" },
  cleanser: {
    ar: "منظف",
    fr: "Nettoyant",
    de: "Reiniger",
    ko: "클렌저",
    tr: "Temizleyici",
  },
  "cleansing oil": {
    ar: "زيت تنظيف",
    fr: "Huile nettoyante",
    de: "Reinigungsöl",
    ko: "클렌징 오일",
    tr: "Temizleme yağı",
  },
  "toner pad": {
    ar: "باد تونر",
    fr: "Pads tonifiants",
    de: "Toner-Pads",
    ko: "토너 패드",
    tr: "Tonik pedi",
  },
  toner: { ar: "تونر", fr: "Tonique", de: "Toner", ko: "토너", tr: "Tonik" },
  "sun care": {
    ar: "عناية شمسية",
    fr: "Soin solaire",
    de: "Sonnenpflege",
    ko: "선 케어",
    tr: "Güneş bakımı",
  },
  cream: { ar: "كريم", fr: "Crème", de: "Creme", ko: "크림", tr: "Krem" },
  mask: { ar: "قناع", fr: "Masque", de: "Maske", ko: "마스크", tr: "Maske" },
  lotion: { ar: "لوشن", fr: "Lotion", de: "Lotion", ko: "로션", tr: "Losyon" },
  oil: { ar: "زيت", fr: "Huile", de: "Öl", ko: "오일", tr: "Yağ" },
};

const taxonomyLabels: LocalizedValueMap = {
  ...categoryLabels,

  "skin care": {
    ar: "العناية بالبشرة",
    fr: "Soins de la peau",
    de: "Hautpflege",
    ko: "스킨케어",
    tr: "Cilt bakımı",
  },
  skincare: {
    ar: "العناية بالبشرة",
    fr: "Soins de la peau",
    de: "Hautpflege",
    ko: "스킨케어",
    tr: "Cilt bakımı",
  },
  creams: {
    ar: "كريمات",
    fr: "Crèmes",
    de: "Cremes",
    ko: "크림",
    tr: "Kremler",
  },
  "cleansing oils": {
    ar: "زيوت تنظيف",
    fr: "Huiles nettoyantes",
    de: "Reinigungsöle",
    ko: "클렌징 오일",
    tr: "Temizleme yağları",
  },
  "cleansing-oils": {
    ar: "زيوت تنظيف",
    fr: "Huiles nettoyantes",
    de: "Reinigungsöle",
    ko: "클렌징 오일",
    tr: "Temizleme yağları",
  },
  exfoliants: {
    ar: "مقشرات",
    fr: "Exfoliants",
    de: "Peelings",
    ko: "각질 케어",
    tr: "Peeling ürünleri",
  },
  toners: {
    ar: "تونرات",
    fr: "Toniques",
    de: "Toner",
    ko: "토너",
    tr: "Tonikler",
  },
  "toner pads": {
    ar: "بادات التونر",
    fr: "Pads tonifiants",
    de: "Toner-Pads",
    ko: "토너 패드",
    tr: "Tonik pedleri",
  },
  essences: {
    ar: "إيسنس",
    fr: "Essences",
    de: "Essences",
    ko: "에센스",
    tr: "Esanslar",
  },
  ampoules: {
    ar: "أمبولات",
    fr: "Ampoules",
    de: "Ampullen",
    ko: "앰플",
    tr: "Ampuller",
  },
  lotions: {
    ar: "لوشنات",
    fr: "Lotions",
    de: "Lotionen",
    ko: "로션",
    tr: "Losyonlar",
  },
  cleansers: {
    ar: "منظفات",
    fr: "Nettoyants",
    de: "Reiniger",
    ko: "클렌저",
    tr: "Temizleyiciler",
  },
  serums: {
    ar: "سيرومات",
    fr: "Sérums",
    de: "Seren",
    ko: "세럼",
    tr: "Serumlar",
  },
  moisturizers: {
    ar: "مرطبات",
    fr: "Hydratants",
    de: "Feuchtigkeitspflege",
    ko: "보습제",
    tr: "Nemlendiriciler",
  },
  "toner-pads": {
    ar: "بادات التونر",
    fr: "Pads tonifiants",
    de: "Toner-Pads",
    ko: "토너 패드",
    tr: "Tonik pedleri",
  },
  hydration: {
    ar: "الترطيب",
    fr: "hydratation",
    de: "Feuchtigkeit",
    ko: "수분",
    tr: "nem",
  },
  moisture: {
    ar: "الرطوبة",
    fr: "hydratation",
    de: "Feuchtigkeit",
    ko: "보습",
    tr: "nem",
  },
  barrier: {
    ar: "حاجز البشرة",
    fr: "barrière cutanée",
    de: "Hautbarriere",
    ko: "피부 장벽",
    tr: "cilt bariyeri",
  },
  soothing: {
    ar: "التهدئة",
    fr: "apaisement",
    de: "Beruhigung",
    ko: "진정",
    tr: "yatıştırma",
  },
  cooling: {
    ar: "الانتعاش",
    fr: "fraîcheur",
    de: "Kühlung",
    ko: "쿨링",
    tr: "serinlik",
  },
  pores: { ar: "المسام", fr: "pores", de: "Poren", ko: "모공", tr: "gözenek" },
  oiliness: {
    ar: "الدهون الزائدة",
    fr: "excès de sébum",
    de: "Öligkeit",
    ko: "유분",
    tr: "yağlanma",
  },
  cleansing: {
    ar: "التنظيف",
    fr: "nettoyage",
    de: "Reinigung",
    ko: "클렌징",
    tr: "temizlik",
  },
  "daily care": {
    ar: "العناية اليومية",
    fr: "soin quotidien",
    de: "tägliche Pflege",
    ko: "데일리 케어",
    tr: "günlük bakım",
  },
  dullness: {
    ar: "بهتان البشرة",
    fr: "teint terne",
    de: "fahler Teint",
    ko: "칙칙함",
    tr: "matlık",
  },
  "uneven tone": {
    ar: "عدم توحّد اللون",
    fr: "teint irrégulier",
    de: "ungleichmäßiger Teint",
    ko: "고르지 않은 톤",
    tr: "eşitsiz ton",
  },
  brightening: {
    ar: "الإشراق",
    fr: "éclat",
    de: "Aufhellung",
    ko: "브라이트닝",
    tr: "aydınlık",
  },
  "daily protection": {
    ar: "الحماية اليومية",
    fr: "protection quotidienne",
    de: "täglicher Schutz",
    ko: "데일리 보호",
    tr: "günlük koruma",
  },
  protection: {
    ar: "الحماية",
    fr: "protection",
    de: "Schutz",
    ko: "보호",
    tr: "koruma",
  },
  acne: {
    ar: "الحبوب",
    fr: "imperfections",
    de: "Unreinheiten",
    ko: "트러블",
    tr: "akne",
  },
  blemishes: {
    ar: "العيوب",
    fr: "imperfections",
    de: "Unreinheiten",
    ko: "잡티",
    tr: "lekeler",
  },
  calming: {
    ar: "التهدئة",
    fr: "apaisement",
    de: "Beruhigung",
    ko: "진정",
    tr: "sakinleştirme",
  },
  firmness: {
    ar: "التماسك",
    fr: "fermeté",
    de: "Festigkeit",
    ko: "탄력",
    tr: "sıkılık",
  },
  collagen: {
    ar: "الكولاجين",
    fr: "collagène",
    de: "Kollagen",
    ko: "콜라겐",
    tr: "kolajen",
  },
  "all skin types": {
    ar: "كل أنواع البشرة",
    fr: "Tous types de peau",
    de: "Alle Hauttypen",
    ko: "모든 피부 타입",
    tr: "Tüm cilt tipleri",
  },
  "to be confirmed": {
    ar: "سيتم التأكيد",
    fr: "À confirmer",
    de: "Noch zu bestätigen",
    ko: "확인 예정",
    tr: "Onaylanacak",
  },
  "ingredient list pending verified supplier documentation": {
    ar: "قائمة المكونات بانتظار توثيق المورد الموثق",
    fr: "Liste d’ingrédients en attente de documentation fournisseur vérifiée",
    de: "Inhaltsstoffliste wartet auf geprüfte Lieferantendokumentation",
    ko: "성분 목록은 검증된 공급사 문서 확인 후 제공됩니다",
    tr: "İçerik listesi doğrulanmış tedarikçi belgelerini bekliyor",
  },
  "pending verified supplier documentation.": {
    ar: "بانتظار توثيق المورد الموثق.",
    fr: "En attente de documentation fournisseur vérifiée.",
    de: "Wartet auf geprüfte Lieferantendokumentation.",
    ko: "검증된 공급사 문서 확인 대기 중입니다.",
    tr: "Doğrulanmış tedarikçi belgeleri bekleniyor.",
  },
  "details pending verified inci documentation.": {
    ar: "التفاصيل بانتظار وثائق INCI الموثقة.",
    fr: "Détails en attente de documentation INCI vérifiée.",
    de: "Details warten auf geprüfte INCI-Dokumentation.",
    ko: "세부 정보는 검증된 INCI 문서 확인 후 제공됩니다.",
    tr: "Detaylar doğrulanmış INCI belgelerini bekliyor.",
  },
  "product copy pending supplier verification.": {
    ar: "نص المنتج بانتظار تحقق المورد.",
    fr: "Texte produit en attente de vérification fournisseur.",
    de: "Produkttext wartet auf Lieferantenprüfung.",
    ko: "제품 문구는 공급사 검증 대기 중입니다.",
    tr: "Ürün metni tedarikçi doğrulaması bekliyor.",
  },
  reviews: {
    ar: "مراجعات",
    fr: "avis",
    de: "Bewertungen",
    ko: "리뷰",
    tr: "yorum",
  },
};

const phraseLabels: LocalizedValueMap = {
  "Best Sellers": {
    ar: "الأكثر مبيعًا",
    fr: "Meilleures ventes",
    de: "Bestseller",
    ko: "베스트셀러",
    tr: "Çok satanlar",
  },
  "Most Viewed": {
    ar: "الأكثر مشاهدة",
    fr: "Les plus vus",
    de: "Meist angesehen",
    ko: "가장 많이 본 제품",
    tr: "En çok görüntülenen",
  },
  "Customer Favorite": {
    ar: "مفضل لدى العملاء",
    fr: "Favori des clients",
    de: "Kundenfavorit",
    ko: "고객 인기 제품",
    tr: "Müşteri favorisi",
  },
  Hydration: {
    ar: "ترطيب",
    fr: "Hydratation",
    de: "Feuchtigkeit",
    ko: "수분",
    tr: "Nem",
  },
  "Dry skin": {
    ar: "بشرة جافة",
    fr: "Peau sèche",
    de: "Trockene Haut",
    ko: "건성 피부",
    tr: "Kuru cilt",
  },
  Glow: { ar: "إشراق", fr: "Éclat", de: "Glow", ko: "광채", tr: "Işıltı" },
  Brightening: {
    ar: "إشراق",
    fr: "Éclat",
    de: "Aufhellung",
    ko: "브라이트닝",
    tr: "Aydınlık",
  },
  Repair: {
    ar: "ترميم",
    fr: "Réparation",
    de: "Regeneration",
    ko: "리페어",
    tr: "Onarım",
  },
  "Anti-aging": {
    ar: "مقاومة علامات التقدم",
    fr: "Anti-âge",
    de: "Anti-Aging",
    ko: "안티에이징",
    tr: "Yaşlanma karşıtı",
  },
  Firming: {
    ar: "شد",
    fr: "Fermeté",
    de: "Straffung",
    ko: "탄력",
    tr: "Sıkılaştırma",
  },
  Clarity: {
    ar: "صفاء",
    fr: "Netteté",
    de: "Klarheit",
    ko: "맑은 피부",
    tr: "Arınmış görünüm",
  },
  "Sensitive skin": {
    ar: "بشرة حساسة",
    fr: "Peau sensible",
    de: "Empfindliche Haut",
    ko: "민감성 피부",
    tr: "Hassas cilt",
  },
  Protection: {
    ar: "حماية",
    fr: "Protection",
    de: "Schutz",
    ko: "보호",
    tr: "Koruma",
  },
  "Hydration & comfort": {
    ar: "ترطيب وراحة",
    fr: "Hydratation & confort",
    de: "Feuchtigkeit & Komfort",
    ko: "수분과 편안함",
    tr: "Nem ve konfor",
  },
  "For hydration": {
    ar: "للترطيب",
    fr: "Pour hydrater",
    de: "Für Feuchtigkeit",
    ko: "수분 케어",
    tr: "Nem için",
  },
  "Soft moisture support for skin that needs comfort and cushion.": {
    ar: "دعم ترطيب ناعم لبشرة تحتاج إلى الراحة والامتلاء.",
    fr: "Un soutien hydratant doux pour une peau qui recherche confort et souplesse.",
    de: "Sanfte Feuchtigkeit für Haut, die Komfort und Polsterung braucht.",
    ko: "편안함과 촉촉한 쿠션감이 필요한 피부를 위한 부드러운 수분 케어입니다.",
    tr: "Konfor ve yumuşak dolgunluk isteyen ciltler için nazik nem desteği.",
  },
  "Glow & tone": {
    ar: "إشراق وتوحيد لون",
    fr: "Éclat & teint",
    de: "Glow & Teint",
    ko: "광채와 톤",
    tr: "Işıltı ve ton",
  },
  "For brightening": {
    ar: "للإشراق",
    fr: "Pour l’éclat",
    de: "Für Ausstrahlung",
    ko: "브라이트닝 케어",
    tr: "Aydınlık için",
  },
  "A glow-focused step for a more even, fresh-looking finish.": {
    ar: "خطوة تركّز على الإشراق لمظهر أكثر توحدًا وانتعاشًا.",
    fr: "Une étape éclat pour un fini plus uniforme et frais.",
    de: "Ein Glow-Schritt für ein ebenmäßigeres, frischeres Finish.",
    ko: "더 고르고 산뜻해 보이는 피부를 위한 광채 중심 단계입니다.",
    tr: "Daha eşit ve taze görünen bir bitiş için ışıltı odaklı adım.",
  },
  "Firmness care": {
    ar: "عناية بالتماسك",
    fr: "Soin fermeté",
    de: "Festigkeitspflege",
    ko: "탄력 케어",
    tr: "Sıkılık bakımı",
  },
  "For anti-aging": {
    ar: "لمقاومة علامات التقدم",
    fr: "Pour l’anti-âge",
    de: "Für Anti-Aging",
    ko: "안티에이징 케어",
    tr: "Yaşlanma karşıtı bakım",
  },
  "A firmness ritual for bounce, comfort, and smoother-looking skin.": {
    ar: "روتين تماسك يمنح البشرة مرونة وراحة ومظهرًا أنعم.",
    fr: "Un rituel fermeté pour rebond, confort et peau visiblement plus lisse.",
    de: "Ein straffendes Ritual für Spannkraft, Komfort und glatter wirkende Haut.",
    ko: "탄탄함과 편안함, 매끄러워 보이는 피부를 위한 탄력 루틴입니다.",
    tr: "Esneklik, konfor ve daha pürüzsüz görünüm için sıkılık ritüeli.",
  },
  "Pore & clarity": {
    ar: "المسام والصفاء",
    fr: "Pores & netteté",
    de: "Poren & Klarheit",
    ko: "모공과 맑은 피부",
    tr: "Gözenek ve arınmışlık",
  },
  "For clear skin": {
    ar: "لبشرة صافية",
    fr: "Pour une peau nette",
    de: "Für klare Haut",
    ko: "맑은 피부 케어",
    tr: "Arınmış cilt için",
  },
  "A balancing step for clearer-looking, comfortable skin.": {
    ar: "خطوة موازنة لبشرة أكثر صفاءً وراحة.",
    fr: "Une étape équilibrante pour une peau plus nette et confortable.",
    de: "Ein ausgleichender Schritt für klarer wirkende, angenehme Haut.",
    ko: "더 맑고 편안해 보이는 피부를 위한 밸런싱 단계입니다.",
    tr: "Daha arınmış ve konforlu görünen cilt için dengeleyici adım.",
  },
  "Daily shield": {
    ar: "درع يومي",
    fr: "Bouclier quotidien",
    de: "Täglicher Schutz",
    ko: "데일리 쉴드",
    tr: "Günlük kalkan",
  },
  "For protection": {
    ar: "للحماية",
    fr: "Pour protéger",
    de: "Für Schutz",
    ko: "보호 케어",
    tr: "Koruma için",
  },
  "A comfortable final morning layer for daily UV care.": {
    ar: "طبقة صباحية نهائية مريحة للعناية اليومية من الأشعة.",
    fr: "Une dernière couche matinale confortable pour la protection UV quotidienne.",
    de: "Eine angenehme letzte Morgenschicht für tägliche UV-Pflege.",
    ko: "매일 아침 자외선 케어를 위한 편안한 마지막 단계입니다.",
    tr: "Günlük UV bakımı için konforlu son sabah katmanı.",
  },
  "First cleanse": {
    ar: "التنظيف الأول",
    fr: "Premier nettoyage",
    de: "Erste Reinigung",
    ko: "첫 클렌징",
    tr: "İlk temizlik",
  },
  "For fresh skin": {
    ar: "لبشرة منتعشة",
    fr: "Pour une peau fraîche",
    de: "Für frische Haut",
    ko: "산뜻한 피부 케어",
    tr: "Taze cilt için",
  },
  "A fresh first step before toner, serum, and cream.": {
    ar: "خطوة أولى منعشة قبل التونر والسيروم والكريم.",
    fr: "Une première étape fraîche avant tonique, sérum et crème.",
    de: "Ein frischer erster Schritt vor Toner, Serum und Creme.",
    ko: "토너, 세럼, 크림 전 산뜻하게 시작하는 첫 단계입니다.",
    tr: "Tonik, serum ve krem öncesi ferah bir ilk adım.",
  },
  "For makeup & SPF": {
    ar: "للمكياج وواقي الشمس",
    fr: "Pour maquillage & SPF",
    de: "Für Make-up & SPF",
    ko: "메이크업과 SPF 클렌징",
    tr: "Makyaj ve SPF için",
  },
  "A first cleanse for sunscreen, makeup, and daily buildup.": {
    ar: "تنظيف أول لواقي الشمس والمكياج وتراكمات اليوم.",
    fr: "Un premier nettoyage pour SPF, maquillage et impuretés du quotidien.",
    de: "Eine erste Reinigung für Sonnenschutz, Make-up und tägliche Rückstände.",
    ko: "선크림, 메이크업, 일상 노폐물을 위한 첫 클렌징입니다.",
    tr: "Güneş kremi, makyaj ve günlük birikim için ilk temizlik.",
  },
  "Prep step": {
    ar: "خطوة التحضير",
    fr: "Étape de préparation",
    de: "Vorbereitungsschritt",
    ko: "피부 준비 단계",
    tr: "Hazırlık adımı",
  },
  "For skin prep": {
    ar: "لتحضير البشرة",
    fr: "Pour préparer la peau",
    de: "Zur Hautvorbereitung",
    ko: "피부 준비 케어",
    tr: "Cilt hazırlığı için",
  },
  "A light prep layer before targeted care.": {
    ar: "طبقة تحضير خفيفة قبل العناية المركزة.",
    fr: "Une couche légère de préparation avant le soin ciblé.",
    de: "Eine leichte Vorbereitungsschicht vor gezielter Pflege.",
    ko: "집중 케어 전 가볍게 피부를 준비하는 단계입니다.",
    tr: "Hedefe yönelik bakım öncesi hafif hazırlık katmanı.",
  },
  "A quick pad ritual for fresh, comfortable skin.": {
    ar: "روتين باد سريع لبشرة منتعشة ومريحة.",
    fr: "Un rituel pad rapide pour une peau fraîche et confortable.",
    de: "Ein schnelles Pad-Ritual für frische, angenehme Haut.",
    ko: "산뜻하고 편안한 피부를 위한 빠른 패드 루틴입니다.",
    tr: "Taze ve konforlu cilt için hızlı ped ritüeli.",
  },
  "Treatment step": {
    ar: "خطوة العناية المركزة",
    fr: "Étape traitement",
    de: "Treatment-Schritt",
    ko: "집중 케어 단계",
    tr: "Bakım adımı",
  },
  "For targeted care": {
    ar: "للعناية المركزة",
    fr: "Pour un soin ciblé",
    de: "Für gezielte Pflege",
    ko: "타깃 케어",
    tr: "Hedefe yönelik bakım için",
  },
  "A focused treatment layer before moisturizer.": {
    ar: "طبقة عناية مركزة قبل المرطب.",
    fr: "Une couche de soin ciblée avant l’hydratant.",
    de: "Eine gezielte Pflegeschicht vor der Feuchtigkeitscreme.",
    ko: "보습제 전 사용하는 집중 케어 단계입니다.",
    tr: "Nemlendirici öncesi odaklı bakım katmanı.",
  },
  "Seal & comfort": {
    ar: "حماية وراحة",
    fr: "Sceller & confort",
    de: "Versiegeln & Komfort",
    ko: "보습막과 편안함",
    tr: "Mühürleme ve konfor",
  },
  "For skin barrier": {
    ar: "لحاجز البشرة",
    fr: "Pour la barrière cutanée",
    de: "Für die Hautbarriere",
    ko: "피부 장벽 케어",
    tr: "Cilt bariyeri için",
  },
  "A comfort layer to seal in previous steps.": {
    ar: "طبقة مريحة تثبت الخطوات السابقة.",
    fr: "Une couche confort pour sceller les étapes précédentes.",
    de: "Eine Komfortschicht, die vorherige Schritte einschließt.",
    ko: "이전 단계의 케어를 감싸주는 편안한 보습막입니다.",
    tr: "Önceki adımları hapsetmek için konfor katmanı.",
  },
  "Weekly ritual": {
    ar: "روتين أسبوعي",
    fr: "Rituel hebdomadaire",
    de: "Wöchentliches Ritual",
    ko: "주간 루틴",
    tr: "Haftalık ritüel",
  },
  "For treatment nights": {
    ar: "لليالي العناية",
    fr: "Pour les soirs de soin",
    de: "Für Pflegeabende",
    ko: "케어 나이트",
    tr: "Bakım geceleri için",
  },
  "An extra care moment for a softer weekly ritual.": {
    ar: "لحظة عناية إضافية لروتين أسبوعي أنعم.",
    fr: "Un moment de soin supplémentaire pour un rituel hebdomadaire plus doux.",
    de: "Ein zusätzlicher Pflegemoment für ein sanfteres Wochenritual.",
    ko: "더 부드러운 주간 루틴을 위한 추가 케어 순간입니다.",
    tr: "Daha yumuşak bir haftalık ritüel için ekstra bakım anı.",
  },
  "Morning final step": {
    ar: "الخطوة الصباحية الأخيرة",
    fr: "Dernière étape du matin",
    de: "Letzter Morgenschritt",
    ko: "아침 마지막 단계",
    tr: "Sabah son adımı",
  },
  "The final AM step after moisturizer.": {
    ar: "الخطوة الصباحية الأخيرة بعد المرطب.",
    fr: "La dernière étape du matin après l’hydratant.",
    de: "Der letzte AM-Schritt nach der Feuchtigkeitspflege.",
    ko: "보습제 후 아침 루틴의 마지막 단계입니다.",
    tr: "Nemlendiriciden sonra sabah rutininin son adımı.",
  },
  Cleanse: {
    ar: "تنظيف",
    fr: "Nettoyer",
    de: "Reinigen",
    ko: "클렌징",
    tr: "Temizle",
  },
  "Start with cleanser to refresh skin.": {
    ar: "ابدئي بمنظف لإنعاش البشرة.",
    fr: "Commencez par un nettoyant pour rafraîchir la peau.",
    de: "Beginne mit Reiniger, um die Haut zu erfrischen.",
    ko: "클렌저로 피부를 산뜻하게 시작하세요.",
    tr: "Cildi ferahlatmak için temizleyiciyle başlayın.",
  },
  Prep: {
    ar: "تحضير",
    fr: "Préparer",
    de: "Vorbereiten",
    ko: "준비",
    tr: "Hazırla",
  },
  "Follow with toner, pads, or essence.": {
    ar: "اتبعيه بتونر أو باد أو إيسنس.",
    fr: "Poursuivez avec un tonique, des pads ou une essence.",
    de: "Danach Toner, Pads oder Essence verwenden.",
    ko: "토너, 패드 또는 에센스로 이어가세요.",
    tr: "Tonik, ped veya esans ile devam edin.",
  },
  Treat: {
    ar: "عناية مركزة",
    fr: "Traiter",
    de: "Behandeln",
    ko: "집중 케어",
    tr: "Bakım yap",
  },
  "Apply serum or ampoule for targeted care.": {
    ar: "ضعي سيروم أو أمبول للعناية المركزة.",
    fr: "Appliquez sérum ou ampoule pour un soin ciblé.",
    de: "Serum oder Ampulle für gezielte Pflege auftragen.",
    ko: "타깃 케어를 위해 세럼이나 앰플을 바르세요.",
    tr: "Hedefe yönelik bakım için serum veya ampul uygulayın.",
  },
  Seal: {
    ar: "تثبيت",
    fr: "Sceller",
    de: "Versiegeln",
    ko: "마무리 보습",
    tr: "Mühürle",
  },
  "Lock in care with cream or lotion.": {
    ar: "ثبتي العناية بكريم أو لوشن.",
    fr: "Scellez le soin avec une crème ou une lotion.",
    de: "Pflege mit Creme oder Lotion einschließen.",
    ko: "크림이나 로션으로 케어를 감싸주세요.",
    tr: "Bakımı krem veya losyonla sabitleyin.",
  },
  Protect: {
    ar: "حماية",
    fr: "Protéger",
    de: "Schützen",
    ko: "보호",
    tr: "Koru",
  },
  "In the morning, finish with sunscreen.": {
    ar: "في الصباح، اختتمي بواقي الشمس.",
    fr: "Le matin, terminez par une protection solaire.",
    de: "Morgens mit Sonnenschutz abschließen.",
    ko: "아침에는 선스크린으로 마무리하세요.",
    tr: "Sabah rutininizi güneş kremiyle bitirin.",
  },
  "Prepared for the curated Care Formulas edit": {
    ar: "مُعد ضمن مختارات Care Formulas المنسقة",
    fr: "Préparé pour la sélection Care Formulas",
    de: "Für die kuratierte Care Formulas Auswahl vorbereitet",
    ko: "큐레이션된 케어 포뮬러스 에디트에 맞춰 준비되었습니다",
    tr: "Özenle seçilen Care Formulas düzenlemesi için hazırlandı",
  },
  "Listed with supplier-reference pricing": {
    ar: "مدرج بسعر مرجعي من المورد",
    fr: "Listé avec un prix de référence fournisseur",
    de: "Mit Lieferanten-Referenzpreis gelistet",
    ko: "공급사 참고 가격으로 등록되었습니다",
    tr: "Tedarikçi referans fiyatıyla listelendi",
  },
};

const shortDescriptionTemplates: Record<
  Locale,
  (name: string, category: string, concerns: string) => string
> = {
  en: (name) =>
    `${name} is a JISOO Cosmetic product curated for a polished Korean skincare ritual.`,
  ar: (name, category, concerns) =>
    `${name} هو ${category} من JISOO Cosmetic مصمم للعناية بـ ${concerns} ضمن روتين كوري راقٍ للعناية بالبشرة.`,
  fr: (name, category, concerns) =>
    `${name} est un ${category} JISOO Cosmetic conçu pour ${concerns} dans un rituel de soin coréen raffiné.`,
  de: (name, category, concerns) =>
    `${name} ist eine JISOO Cosmetic ${category}-Pflege für ${concerns} in einer eleganten koreanischen Skincare-Routine.`,
  ko: (name, category, concerns) =>
    `${name}은(는) ${concerns} 케어를 위해 큐레이션한 JISOO Cosmetic ${category} 제품입니다.`,
  tr: (name, category, concerns) =>
    `${name}, ${concerns} için seçilmiş JISOO Cosmetic ${category} ürünüdür ve Kore cilt bakım ritüeline uyum sağlar.`,
};

const longDescriptionTemplates: Record<
  Locale,
  (name: string, category: string, concerns: string) => string
> = {
  en: (name) =>
    `${name} is part of the JISOO Cosmetic Korean skincare catalog. Public copy, INCI list, claims, usage, and regional compliance should be confirmed against supplier documentation before final publication.`,
  ar: (name, category, concerns) =>
    `${name} هو ${category} ضمن كتالوج JISOO Cosmetic للعناية الكورية بالبشرة، مع تركيز على ${concerns}. يجب تأكيد نص المنتج وقائمة INCI والادعاءات والاستخدام والامتثال الإقليمي وفق وثائق المورد قبل النشر النهائي.`,
  fr: (name, category, concerns) =>
    `${name} fait partie du catalogue de soins coréens JISOO Cosmetic avec un focus ${concerns}. Le texte public, la liste INCI, les allégations, l’utilisation et la conformité régionale doivent être confirmés avec la documentation fournisseur avant publication finale.`,
  de: (name, category, concerns) =>
    `${name} gehört zum koreanischen Skincare-Katalog von JISOO Cosmetic und fokussiert ${concerns}. Öffentliche Texte, INCI-Liste, Claims, Anwendung und regionale Compliance müssen vor der finalen Veröffentlichung mit Lieferantendokumenten abgeglichen werden.`,
  ko: (name, category, concerns) =>
    `${name}은(는) ${concerns}에 초점을 둔 JISOO Cosmetic 한국 스킨케어 카탈로그의 ${category} 제품입니다. 최종 공개 전 제품 문구, INCI 목록, 효능 표현, 사용법 및 지역별 규정 적합성은 공급사 문서로 확인해야 합니다.`,
  tr: (name, category, concerns) =>
    `${name}, ${concerns} odağıyla JISOO Cosmetic Kore cilt bakım kataloğundaki ${category} ürünüdür. Yayın öncesinde ürün metni, INCI listesi, iddialar, kullanım ve bölgesel uyumluluk tedarikçi belgeleriyle doğrulanmalıdır.`,
};

const usageInstructions: Record<Locale, string> = {
  en: "Use as directed for the product format. Patch test before first use and adjust frequency for sensitive skin.",
  ar: "استخدميه حسب طريقة المنتج. اختبريه على منطقة صغيرة قبل أول استخدام وخففي التكرار للبشرة الحساسة.",
  fr: "Utilisez selon le format du produit. Faites un test cutané avant la première utilisation et ajustez la fréquence pour les peaux sensibles.",
  de: "Je nach Produktformat anwenden. Vor der ersten Anwendung patchtesten und die Häufigkeit bei empfindlicher Haut anpassen.",
  ko: "제품 제형에 맞게 사용하세요. 첫 사용 전 패치 테스트를 하고 민감한 피부는 사용 빈도를 조절하세요.",
  tr: "Ürün formuna uygun şekilde kullanın. İlk kullanımdan önce yama testi yapın ve hassas ciltlerde sıklığı ayarlayın.",
};

function labelFrom(
  map: LocalizedValueMap,
  value: string | undefined,
  locale: Locale,
) {
  if (!value) return undefined;
  const key = value.trim().toLowerCase();
  return (
    map[key]?.[locale] ??
    map[value]?.[locale] ??
    (locale === "en" ? value : undefined)
  );
}

const genericLocalizedLabel: Record<Exclude<Locale, "en">, string> = {
  ar: "نقطة عناية من JISOO",
  fr: "Point de soin JISOO",
  de: "JISOO Pflegepunkt",
  ko: "JISOO 케어 포인트",
  tr: "JISOO bakım noktası",
};

export function localizeProductLabel(value: string, locale: Locale): string {
  if (locale === "en") return value;

  const translated =
    labelFrom(phraseLabels, value, locale) ??
    labelFrom(taxonomyLabels, value, locale);
  if (translated) return translated;

  return /[a-z]/i.test(value) ? genericLocalizedLabel[locale] : value;
}

function localizedTaxonomy(
  value: string | undefined,
  locale: Locale,
): string | undefined {
  if (!value) return undefined;
  return labelFrom(taxonomyLabels, value, locale) ?? value;
}

function localizedConcernList(product: Product, locale: Locale) {
  const localized = product.concerns.map(
    (concern) => localizedTaxonomy(concern, locale) ?? concern,
  );
  if (localized.length === 0)
    return localizedTaxonomy(product.category, locale) ?? product.category;
  if (locale === "ar") return localized.join(" و");
  if (locale === "ko") return localized.join(" 및 ");
  if (locale === "tr") return localized.join(" ve ");
  return localized.join(", ");
}

function buildKeyBenefits(product: Product, locale: Locale): string[] {
  if (locale === "en") return product.keyBenefits;

  const concerns = product.concerns
    .slice(0, 2)
    .map((concern) => localizedTaxonomy(concern, locale) ?? concern);
  const category =
    localizedTaxonomy(product.category, locale) ?? product.category;
  const templates: Record<Locale, string[]> = {
    en: product.keyBenefits,
    ar: [
      `يدعم ${concerns[0] ?? category} بلطف`,
      `يناسب روتين العناية الكورية اليومي`,
      "ملمس راقٍ بطابع JISOO Cosmetic",
    ],
    fr: [
      `Aide à cibler ${concerns[0] ?? category}`,
      "S’intègre au rituel coréen quotidien",
      "Texture raffinée dans l’esprit JISOO Cosmetic",
    ],
    de: [
      `Unterstützt ${concerns[0] ?? category}`,
      "Passt in die tägliche koreanische Pflegeroutine",
      "Raffinierte Textur im JISOO Cosmetic Stil",
    ],
    ko: [
      `${concerns[0] ?? category} 케어를 부드럽게 도와줍니다`,
      "데일리 한국 스킨케어 루틴에 어울립니다",
      "JISOO Cosmetic 감성의 세련된 텍스처",
    ],
    tr: [
      `${concerns[0] ?? category} görünümünü destekler`,
      "Günlük Kore cilt bakım ritüeline uyum sağlar",
      "JISOO Cosmetic çizgisinde rafine doku",
    ],
  };
  return templates[locale];
}

function localizeIngredients(product: Product, locale: Locale) {
  return product.ingredients.map((ingredient) =>
    localizeProductLabel(ingredient, locale),
  );
}

function localizeVariants(
  variants: ProductVariant[] | undefined,
  locale: Locale,
) {
  if (!variants) return undefined;
  return variants.map((variant) => ({
    ...variant,
    name: localizeProductLabel(variant.name, locale),
  }));
}

export function localizeProduct(
  product: Product,
  locale: Locale,
): LocalizedProductContent {
  const name = productNameBySlug[product.slug]?.[locale] ?? product.name;
  const category =
    localizedTaxonomy(product.category, locale) ?? product.category;
  const concerns = localizedConcernList(product, locale);
  const shortDescription =
    locale === "en"
      ? product.shortDescription
      : shortDescriptionTemplates[locale](
          name,
          category.toLowerCase(),
          concerns,
        );
  const longDescription =
    locale === "en"
      ? product.longDescription
      : longDescriptionTemplates[locale](
          name,
          category.toLowerCase(),
          concerns,
        );

  return {
    name,
    subtitle: product.subtitle
      ? (localizedTaxonomy(product.subtitle, locale) ?? product.subtitle)
      : undefined,
    category,
    subcategory: product.subcategory
      ? (localizedTaxonomy(product.subcategory, locale) ?? product.subcategory)
      : undefined,
    shortDescription,
    longDescription,
    keyBenefits: buildKeyBenefits(product, locale),
    ingredients: localizeIngredients(product, locale),
    usageInstructions:
      locale === "en" ? product.usageInstructions : usageInstructions[locale],
    skinType: product.skinType.map(
      (skinType) => localizedTaxonomy(skinType, locale) ?? skinType,
    ),
    concerns: product.concerns.map(
      (concern) => localizedTaxonomy(concern, locale) ?? concern,
    ),
    texture: product.texture
      ? (localizedTaxonomy(product.texture, locale) ?? product.texture)
      : undefined,
    finish: product.finish
      ? (localizedTaxonomy(product.finish, locale) ?? product.finish)
      : undefined,
    variants: localizeVariants(product.variants, locale),
  };
}

export function localizedProductSeoTitle(
  product: Product,
  locale: Locale,
): string {
  const localized = localizeProduct(product, locale);
  if (locale === "en") return `${localized.name} Korean Skincare`;
  return `${localized.name} | JISOO Cosmetic ${localeNames[locale]} Skincare`;
}

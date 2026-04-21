import type { Locale } from '@/lib/i18n'

export const i18nContent: Record<Locale, {
  aiCustomer: {
    title: string
    subtitle: string
    inputPlaceholder: string
    startOver: string
    typing: string
    suggested: string
  }
  adminAi: {
    title: string
    description: string
    generator: string
    translator: string
    marketer: string
    tagging: string
    draft: string
    final: string
    apply: string
  }
  translationCenter: {
    title: string
    description: string
    search: string
    source: string
    target: string
    generate: string
    improve: string
    approve: string
    saveDraft: string
    preview: string
  }
}> = {
  en: {
    aiCustomer: {
      title: 'JISOO AI Consultant',
      subtitle: 'Grounded recommendations from your catalog and region',
      inputPlaceholder: 'Ask about concerns, availability, or product comparison…',
      startOver: 'Start Over',
      typing: 'JISOO AI is thinking…',
      suggested: 'Suggested questions',
    },
    adminAi: {
      title: 'AI Operations Copilot',
      description: 'Generate product copy, translations, marketing text, and tags from local catalog context.',
      generator: 'Description Generator',
      translator: 'Translation Generator',
      marketer: 'Luxury Tone Rewriter',
      tagging: 'Tag & Category Assistant',
      draft: 'Draft',
      final: 'Final',
      apply: 'Apply',
    },
    translationCenter: {
      title: 'Translation Center',
      description: 'Manage source text, AI drafts, edits, approvals, and preview across locales.',
      search: 'Search fields…',
      source: 'Source',
      target: 'Target',
      generate: 'Generate Translation',
      improve: 'Improve Luxury Tone',
      approve: 'Approve',
      saveDraft: 'Save Draft',
      preview: 'Preview',
    },
  },
  ar: {
    aiCustomer: {
      title: 'مستشار جيسو الذكي',
      subtitle: 'توصيات مبنية على الكتالوج والمنطقة',
      inputPlaceholder: 'اسأل عن المشاكل الجلدية أو التوفر أو مقارنة المنتجات…',
      startOver: 'ابدأ من جديد',
      typing: 'يفكر الذكاء الاصطناعي…',
      suggested: 'أسئلة مقترحة',
    },
    adminAi: {
      title: 'مساعد العمليات الذكي',
      description: 'إنشاء وصف منتجات وترجمات ونصوص تسويقية واقتراح الوسوم من بيانات الكتالوج.',
      generator: 'إنشاء الوصف',
      translator: 'إنشاء الترجمة',
      marketer: 'إعادة صياغة فاخرة',
      tagging: 'مساعد الوسوم والتصنيف',
      draft: 'مسودة',
      final: 'نهائي',
      apply: 'تطبيق',
    },
    translationCenter: {
      title: 'مركز الترجمة',
      description: 'إدارة النص الأصلي ومسودات الذكاء والمراجعة والاعتماد والمعاينة.',
      search: 'ابحث في الحقول…',
      source: 'المصدر',
      target: 'الهدف',
      generate: 'إنشاء ترجمة',
      improve: 'تحسين النبرة الفاخرة',
      approve: 'اعتماد',
      saveDraft: 'حفظ مسودة',
      preview: 'معاينة',
    },
  },
  fr: {
    aiCustomer: {
      title: 'Consultant IA JISOO',
      subtitle: 'Recommandations basées sur le catalogue et la région',
      inputPlaceholder: 'Posez une question sur les besoins peau, la disponibilité ou une comparaison…',
      startOver: 'Recommencer',
      typing: 'JISOO IA réfléchit…',
      suggested: 'Questions suggérées',
    },
    adminAi: {
      title: 'Copilote IA Opérations',
      description: 'Générez descriptions, traductions, copies marketing et tags depuis le catalogue local.',
      generator: 'Générateur de description',
      translator: 'Générateur de traduction',
      marketer: 'Réécriture ton luxe',
      tagging: 'Assistant tags & catégories',
      draft: 'Brouillon',
      final: 'Final',
      apply: 'Appliquer',
    },
    translationCenter: {
      title: 'Centre de Traduction',
      description: 'Gérez source, brouillons IA, édition, approbation et aperçu.',
      search: 'Rechercher des champs…',
      source: 'Source',
      target: 'Cible',
      generate: 'Générer la traduction',
      improve: 'Améliorer le ton luxe',
      approve: 'Approuver',
      saveDraft: 'Enregistrer brouillon',
      preview: 'Aperçu',
    },
  },
  de: {
    aiCustomer: {
      title: 'JISOO KI-Berater',
      subtitle: 'Empfehlungen basierend auf Katalog und Region',
      inputPlaceholder: 'Frage zu Hautthemen, Verfügbarkeit oder Produktvergleich…',
      startOver: 'Neu starten',
      typing: 'JISOO KI denkt nach…',
      suggested: 'Vorgeschlagene Fragen',
    },
    adminAi: {
      title: 'KI Operations Copilot',
      description: 'Erzeuge Produkttexte, Übersetzungen, Marketing-Copy und Tags aus Katalogdaten.',
      generator: 'Beschreibungs-Generator',
      translator: 'Übersetzungs-Generator',
      marketer: 'Luxury-Ton Umschreiben',
      tagging: 'Tag- & Kategorie-Assistent',
      draft: 'Entwurf',
      final: 'Final',
      apply: 'Anwenden',
    },
    translationCenter: {
      title: 'Übersetzungszentrum',
      description: 'Verwalte Quelltext, KI-Entwürfe, Bearbeitung, Freigabe und Vorschau.',
      search: 'Felder suchen…',
      source: 'Quelle',
      target: 'Ziel',
      generate: 'Übersetzung generieren',
      improve: 'Luxury-Ton verbessern',
      approve: 'Freigeben',
      saveDraft: 'Entwurf speichern',
      preview: 'Vorschau',
    },
  },
}

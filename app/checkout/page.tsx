"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronRight, 
  Lock, 
  CreditCard, 
  Truck, 
  Gift,
  Check,
  ArrowLeft
} from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";
import { useRegion } from "@/components/providers/region-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocale } from "@/components/providers/locale-provider";
import { localizeHref } from "@/lib/i18n";
import { resolveImageSrc } from "@/lib/image-fallbacks";

type CheckoutStep = "information" | "shipping" | "payment";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { formatPrice, region, currency } = useRegion();
  const { locale, dictionary } = useLocale();
  const c = dictionary.common;
  const copy = {
    information: locale === 'ar' ? 'المعلومات' : locale === 'fr' ? 'Informations' : locale === 'de' ? 'Informationen' : locale === 'ko' ? '정보' : locale === 'tr' ? 'Bilgiler' : 'Information',
    shipping: dictionary.cart.shipping,
    payment: locale === 'ar' ? 'الدفع' : locale === 'fr' ? 'Paiement' : locale === 'de' ? 'Zahlung' : locale === 'ko' ? '결제' : locale === 'tr' ? 'Ödeme' : 'Payment',
    contactInfo: locale === 'ar' ? 'معلومات التواصل' : locale === 'fr' ? 'Coordonnées' : locale === 'de' ? 'Kontaktinformationen' : locale === 'ko' ? '연락처 정보' : locale === 'tr' ? 'İletişim Bilgileri' : 'Contact Information',
    shippingAddress: c.shippingAddress,
    continueShipping: locale === 'ar' ? 'متابعة إلى الشحن' : locale === 'fr' ? 'Continuer vers la livraison' : locale === 'de' ? 'Weiter zum Versand' : locale === 'ko' ? '배송 단계로 계속' : locale === 'tr' ? 'Kargoya devam et' : 'Continue to Shipping',
    shippingMethod: locale === 'ar' ? 'طريقة الشحن' : locale === 'fr' ? 'Mode de livraison' : locale === 'de' ? 'Versandart' : locale === 'ko' ? '배송 방법' : locale === 'tr' ? 'Kargo Yöntemi' : 'Shipping Method',
    continuePayment: locale === 'ar' ? 'متابعة إلى الدفع' : locale === 'fr' ? 'Continuer vers le paiement' : locale === 'de' ? 'Weiter zur Zahlung' : locale === 'ko' ? '결제 단계로 계속' : locale === 'tr' ? 'Ödemeye devam et' : 'Continue to Payment',
    orderSummary: dictionary.cart.orderSummary,
    subtotal: dictionary.cart.subtotal,
    estimatedTax: locale === 'ar' ? 'ضريبة تقديرية' : locale === 'fr' ? 'Taxe estimée' : locale === 'de' ? 'Geschätzte Steuer' : locale === 'ko' ? '예상 세금' : locale === 'tr' ? 'Tahmini Vergi' : 'Estimated Tax',
    free: locale === 'ar' ? 'مجاني' : locale === 'fr' ? 'Gratuit' : locale === 'de' ? 'Kostenlos' : locale === 'ko' ? '무료' : locale === 'tr' ? 'Ücretsiz' : 'Free',
    processing: locale === 'ar' ? 'جارٍ المعالجة...' : locale === 'fr' ? 'Traitement...' : locale === 'de' ? 'Wird verarbeitet...' : locale === 'ko' ? '처리 중...' : locale === 'tr' ? 'İşleniyor...' : 'Processing...',
    securePayment: locale === 'ar' ? 'معلومات الدفع آمنة ومشفرة' : locale === 'fr' ? 'Vos informations de paiement sont sécurisées et chiffrées' : locale === 'de' ? 'Deine Zahlungsdaten sind sicher und verschlüsselt' : locale === 'ko' ? '결제 정보는 안전하게 암호화됩니다' : locale === 'tr' ? 'Ödeme bilgileriniz güvenli ve şifrelenmiştir' : 'Your payment information is secure and encrypted',
    freeShippingBenefit: locale === 'ar' ? 'شحن مجاني للطلبات فوق 50$' : locale === 'fr' ? 'Livraison gratuite dès 50$' : locale === 'de' ? 'Kostenloser Versand ab 50$' : locale === 'ko' ? '50달러 이상 무료배송' : locale === 'tr' ? '50$ üzeri ücretsiz kargo' : 'Free shipping on orders over $50',
    freeSamplesBenefit: locale === 'ar' ? 'عينات مجانية مع كل طلب' : locale === 'fr' ? 'Échantillons gratuits à chaque commande' : locale === 'de' ? 'Kostenlose Proben bei jeder Bestellung' : locale === 'ko' ? '모든 주문에 무료 샘플 제공' : locale === 'tr' ? 'Her siparişte ücretsiz numune' : 'Free samples with every order',
    thankYou: locale === 'ar' ? 'شكرًا لك!' : locale === 'fr' ? 'Merci !' : locale === 'de' ? 'Vielen Dank!' : locale === 'ko' ? '감사합니다!' : locale === 'tr' ? 'Teşekkürler!' : 'Thank You!',
    orderPlaced: locale === 'ar' ? 'تم تقديم طلبك بنجاح.' : locale === 'fr' ? 'Votre commande a été passée avec succès.' : locale === 'de' ? 'Deine Bestellung wurde erfolgreich aufgegeben.' : locale === 'ko' ? '주문이 성공적으로 완료되었습니다.' : locale === 'tr' ? 'Siparişiniz başarıyla oluşturuldu.' : 'Your order has been placed successfully.',
    orderLabel: locale === 'ar' ? 'الطلب' : locale === 'fr' ? 'Commande' : locale === 'de' ? 'Bestellung' : locale === 'ko' ? '주문' : locale === 'tr' ? 'Sipariş' : 'Order',
    confirmMail: locale === 'ar' ? 'أرسلنا رسالة تأكيد تحتوي على تفاصيل الطلب ومعلومات التتبع.' : locale === 'fr' ? 'Nous avons envoyé un e-mail de confirmation avec les détails et le suivi.' : locale === 'de' ? 'Wir haben eine Bestätigungs-E-Mail mit Bestell- und Trackingdetails gesendet.' : locale === 'ko' ? '주문 상세 및 배송 추적 정보가 포함된 확인 이메일을 보냈습니다.' : locale === 'tr' ? 'Sipariş detayları ve takip bilgileriyle bir onay e-postası gönderdik.' : 'We&apos;ve sent a confirmation email with your order details and tracking information.',
    emailMe: locale === 'ar' ? 'أرسلوا لي الأخبار والعروض عبر البريد' : locale === 'fr' ? 'M’envoyer des actualités et offres par e-mail' : locale === 'de' ? 'Per E-Mail über Neuigkeiten und Angebote informieren' : locale === 'ko' ? '이메일로 뉴스/혜택 받기' : locale === 'tr' ? 'Bana e-posta ile haber ve teklifler gönderin' : 'Email me with news and offers',
    firstName: locale === 'ar' ? 'الاسم الأول' : locale === 'fr' ? 'Prénom' : locale === 'de' ? 'Vorname' : locale === 'ko' ? '이름' : locale === 'tr' ? 'Ad' : 'First Name',
    lastName: locale === 'ar' ? 'اسم العائلة' : locale === 'fr' ? 'Nom' : locale === 'de' ? 'Nachname' : locale === 'ko' ? '성' : locale === 'tr' ? 'Soyad' : 'Last Name',
    address: locale === 'ar' ? 'العنوان' : locale === 'fr' ? 'Adresse' : locale === 'de' ? 'Adresse' : locale === 'ko' ? '주소' : locale === 'tr' ? 'Adres' : 'Address',
    apartment: locale === 'ar' ? 'شقة/جناح (اختياري)' : locale === 'fr' ? 'Appartement, suite, etc. (optionnel)' : locale === 'de' ? 'Wohnung, Suite usw. (optional)' : locale === 'ko' ? '아파트/호수 (선택)' : locale === 'tr' ? 'Daire, site vb. (isteğe bağlı)' : 'Apartment, suite, etc. (optional)',
    city: locale === 'ar' ? 'المدينة' : locale === 'fr' ? 'Ville' : locale === 'de' ? 'Stadt' : locale === 'ko' ? '도시' : locale === 'tr' ? 'Şehir' : 'City',
    state: locale === 'ar' ? 'المنطقة/الولاية' : locale === 'fr' ? 'État/Région' : locale === 'de' ? 'Bundesland' : locale === 'ko' ? '시/도' : locale === 'tr' ? 'Eyalet/Bölge' : 'State',
    zip: locale === 'ar' ? 'الرمز البريدي' : locale === 'fr' ? 'Code postal' : locale === 'de' ? 'PLZ' : locale === 'ko' ? '우편번호' : locale === 'tr' ? 'Posta Kodu' : 'ZIP Code',
    phone: locale === 'ar' ? 'الهاتف' : locale === 'fr' ? 'Téléphone' : locale === 'de' ? 'Telefon' : locale === 'ko' ? '전화번호' : locale === 'tr' ? 'Telefon' : 'Phone',
    backInfo: locale === 'ar' ? 'العودة إلى المعلومات' : locale === 'fr' ? 'Retour aux informations' : locale === 'de' ? 'Zurück zu Informationen' : locale === 'ko' ? '정보 단계로 돌아가기' : locale === 'tr' ? 'Bilgilere geri dön' : 'Return to information',
    backShipping: locale === 'ar' ? 'العودة إلى الشحن' : locale === 'fr' ? 'Retour à la livraison' : locale === 'de' ? 'Zurück zum Versand' : locale === 'ko' ? '배송 단계로 돌아가기' : locale === 'tr' ? 'Kargoya geri dön' : 'Return to shipping',
    standardShipping: locale === 'ar' ? 'شحن قياسي' : locale === 'fr' ? 'Livraison standard' : locale === 'de' ? 'Standardversand' : locale === 'ko' ? '일반 배송' : locale === 'tr' ? 'Standart Kargo' : 'Standard Shipping',
    expressShipping: locale === 'ar' ? 'شحن سريع' : locale === 'fr' ? 'Livraison express' : locale === 'de' ? 'Expressversand' : locale === 'ko' ? '빠른 배송' : locale === 'tr' ? 'Hızlı Kargo' : 'Express Shipping',
    overnightShipping: locale === 'ar' ? 'شحن لليوم التالي' : locale === 'fr' ? 'Livraison en 24h' : locale === 'de' ? 'Overnight-Versand' : locale === 'ko' ? '익일 배송' : locale === 'tr' ? 'Ertesi Gün Kargo' : 'Overnight Shipping',
    businessDays57: locale === 'ar' ? '5-7 أيام عمل' : locale === 'fr' ? '5-7 jours ouvrés' : locale === 'de' ? '5-7 Werktage' : locale === 'ko' ? '영업일 기준 5-7일' : locale === 'tr' ? '5-7 iş günü' : '5-7 business days',
    businessDays23: locale === 'ar' ? '2-3 أيام عمل' : locale === 'fr' ? '2-3 jours ouvrés' : locale === 'de' ? '2-3 Werktage' : locale === 'ko' ? '영업일 기준 2-3일' : locale === 'tr' ? '2-3 iş günü' : '2-3 business days',
    nextBusinessDay: locale === 'ar' ? 'يوم العمل التالي' : locale === 'fr' ? 'Jour ouvré suivant' : locale === 'de' ? 'Nächster Werktag' : locale === 'ko' ? '다음 영업일' : locale === 'tr' ? 'Sonraki iş günü' : 'Next business day',
    creditCard: locale === 'ar' ? 'بطاقة ائتمان' : locale === 'fr' ? 'Carte bancaire' : locale === 'de' ? 'Kreditkarte' : locale === 'ko' ? '신용카드' : locale === 'tr' ? 'Kredi Kartı' : 'Credit Card',
    cardNumber: locale === 'ar' ? 'رقم البطاقة' : locale === 'fr' ? 'Numéro de carte' : locale === 'de' ? 'Kartennummer' : locale === 'ko' ? '카드 번호' : locale === 'tr' ? 'Kart Numarası' : 'Card Number',
    nameOnCard: locale === 'ar' ? 'الاسم على البطاقة' : locale === 'fr' ? 'Nom sur la carte' : locale === 'de' ? 'Name auf Karte' : locale === 'ko' ? '카드 명의자' : locale === 'tr' ? 'Kart Üzerindeki İsim' : 'Name on Card',
    expiryDate: locale === 'ar' ? 'تاريخ الانتهاء' : locale === 'fr' ? 'Date d’expiration' : locale === 'de' ? 'Ablaufdatum' : locale === 'ko' ? '만료일' : locale === 'tr' ? 'Son Kullanma Tarihi' : 'Expiration Date',
    securityCode: locale === 'ar' ? 'رمز الأمان' : locale === 'fr' ? 'Code de sécurité' : locale === 'de' ? 'Sicherheitscode' : locale === 'ko' ? '보안 코드' : locale === 'tr' ? 'Güvenlik Kodu' : 'Security Code',
    guestCheckoutInfo: locale === 'ar' ? 'الدفع كضيف متاح. أنشئ حسابًا بعد الشراء لبدء حفظ نقاط المكافآت.' : locale === 'fr' ? 'Le paiement invité est disponible. Créez un compte après achat pour cumuler des points.' : locale === 'de' ? 'Gast-Checkout ist verfügbar. Erstelle nach dem Kauf ein Konto, um Punkte zu sammeln.' : locale === 'ko' ? '비회원 결제가 가능합니다. 구매 후 계정을 만들어 리워드 포인트를 적립하세요.' : locale === 'tr' ? 'Misafir ödeme kullanılabilir. Satın alma sonrası hesap açarak puan biriktirin.' : 'Guest checkout is available. Create an account after purchase to start saving JISOO rewards points.',
    pay: locale === 'ar' ? 'ادفع' : locale === 'fr' ? 'Payer' : locale === 'de' ? 'Bezahlen' : locale === 'ko' ? '결제' : locale === 'tr' ? 'Öde' : 'Pay',
  }
  const [step, setStep] = useState<CheckoutStep>("information");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [placedOrderNumber, setPlacedOrderNumber] = useState<string | null>(null);

  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const steps: { key: CheckoutStep; label: string }[] = [
    { key: "information", label: copy.information },
    { key: "shipping", label: copy.shipping },
    { key: "payment", label: copy.payment },
  ];

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          region,
          currency,
          cartItems: items,
          paymentProvider: 'paypal',
        }),
      })

      if (!response.ok) {
        throw new Error('Checkout failed')
      }

      const payload = await response.json()
      setPlacedOrderNumber(payload.order.id)
      setOrderComplete(true)
      clearCart()
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background pt-32 pb-20">
        <div className="container max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-16"
          >
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-primary flex items-center justify-center">
              <Check className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="font-serif text-4xl mb-4">{copy.thankYou}</h1>
            <p className="text-muted-foreground mb-2">
              {copy.orderPlaced}
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              {copy.orderLabel} #{placedOrderNumber ?? "JIS-PENDING"}
            </p>
            <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
              {copy.confirmMail}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" className="rounded-none">
                <Link href={localizeHref('/account/orders', locale)}>{c.viewOrder}</Link>
              </Button>
              <Button asChild className="rounded-none">
                <Link href={localizeHref('/shop', locale)}>{c.continueShopping}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-32 pb-20">
        <div className="container max-w-2xl mx-auto px-4 text-center">
          <h1 className="font-serif text-3xl mb-4">{dictionary.cart.emptyTitle}</h1>
          <p className="text-muted-foreground mb-8">
            {dictionary.cart.emptyBody}
          </p>
          <Button asChild className="rounded-none">
            <Link href={localizeHref('/shop', locale)}>{c.shopNow}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-8">
          <Link href={localizeHref('/cart', locale)} className="text-muted-foreground hover:text-foreground transition-colors">
            {dictionary.cart.title}
          </Link>
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <button
                onClick={() => {
                  const currentIndex = steps.findIndex((st) => st.key === step);
                  if (i <= currentIndex) setStep(s.key);
                }}
                className={`${
                  step === s.key
                    ? "text-foreground font-medium"
                    : steps.findIndex((st) => st.key === step) > i
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-muted-foreground/50 cursor-not-allowed"
                } transition-colors`}
                disabled={steps.findIndex((st) => st.key === step) < i}
              >
                {s.label}
              </button>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div>
            <AnimatePresence mode="wait">
              {step === "information" && (
                <motion.div
                  key="information"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <h2 className="font-serif text-2xl mb-6">{copy.contactInfo}</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">{dictionary.footer.emailPlaceholder}</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="rounded-none mt-1"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="newsletter" />
                      <label htmlFor="newsletter" className="text-sm text-muted-foreground">
                        {copy.emailMe}
                      </label>
                    </div>
                  </div>

                  <h2 className="font-serif text-2xl mt-10 mb-6">{copy.shippingAddress}</h2>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">{copy.firstName}</Label>
                        <Input id="firstName" className="rounded-none mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">{copy.lastName}</Label>
                        <Input id="lastName" className="rounded-none mt-1" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">{copy.address}</Label>
                      <Input id="address" className="rounded-none mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="apartment">{copy.apartment}</Label>
                      <Input id="apartment" className="rounded-none mt-1" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">{copy.city}</Label>
                        <Input id="city" className="rounded-none mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="state">{copy.state}</Label>
                        <Input id="state" className="rounded-none mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="zip">{copy.zip}</Label>
                        <Input id="zip" className="rounded-none mt-1" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">{copy.phone}</Label>
                      <Input id="phone" type="tel" className="rounded-none mt-1" />
                    </div>
                  </div>

                  <Button
                    onClick={() => setStep("shipping")}
                    className="w-full rounded-none mt-8"
                    size="lg"
                  >
                    {copy.continueShipping}
                  </Button>
                </motion.div>
              )}

              {step === "shipping" && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <button
                    onClick={() => setStep("information")}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {copy.backInfo}
                  </button>

                  <h2 className="font-serif text-2xl mb-6">{copy.shippingMethod}</h2>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 border border-primary bg-primary/5 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{copy.standardShipping}</p>
                          <p className="text-sm text-muted-foreground">{copy.businessDays57}</p>
                        </div>
                      </div>
                      <span>{shipping === 0 ? copy.free : formatPrice(shipping)}</span>
                    </label>
                    <label className="flex items-center justify-between p-4 border border-border hover:border-muted-foreground cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                        <div>
                          <p className="font-medium">{copy.expressShipping}</p>
                          <p className="text-sm text-muted-foreground">{copy.businessDays23}</p>
                        </div>
                      </div>
                      <span>{formatPrice(12.99)}</span>
                    </label>
                    <label className="flex items-center justify-between p-4 border border-border hover:border-muted-foreground cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                        <div>
                          <p className="font-medium">{copy.overnightShipping}</p>
                          <p className="text-sm text-muted-foreground">{copy.nextBusinessDay}</p>
                        </div>
                      </div>
                      <span>{formatPrice(24.99)}</span>
                    </label>
                  </div>

                  <Button
                    onClick={() => setStep("payment")}
                    className="w-full rounded-none mt-8"
                    size="lg"
                  >
                    {copy.continuePayment}
                  </Button>
                </motion.div>
              )}

              {step === "payment" && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <button
                    onClick={() => setStep("shipping")}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {copy.backShipping}
                  </button>

                  <h2 className="font-serif text-2xl mb-6">{copy.payment}</h2>
                  <div className="border border-border p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <CreditCard className="w-5 h-5" />
                      <span className="font-medium">{copy.creditCard}</span>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">{copy.cardNumber}</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          className="rounded-none mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardName">{copy.nameOnCard}</Label>
                        <Input id="cardName" className="rounded-none mt-1" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">{copy.expiryDate}</Label>
                          <Input
                            id="expiry"
                            placeholder="MM / YY"
                            className="rounded-none mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">{copy.securityCode}</Label>
                          <Input
                            id="cvv"
                            placeholder="CVV"
                            className="rounded-none mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-6 text-sm text-muted-foreground">
                    <Lock className="w-4 h-4" />
                    <span>{copy.securePayment}</span>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {copy.guestCheckoutInfo}
                  </p>

                  <Button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="w-full rounded-none mt-8"
                    size="lg"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                        />
                        {copy.processing}
                      </span>
                    ) : (
                      `${copy.pay} ${formatPrice(total)}`
                    )}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:pl-12 lg:border-l border-border">
            <h2 className="font-serif text-xl mb-6">{copy.orderSummary}</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.variant?.id || "default"}`}
                  className="flex gap-4"
                >
                  <div className="relative w-16 h-16 bg-muted rounded-sm overflow-hidden flex-shrink-0">
                    <Image
                      src={resolveImageSrc(item.product.images[0]?.src)}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-background text-xs rounded-full flex items-center justify-center">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex-1 flex justify-between">
                    <div>
                      <p className="text-sm font-medium">{item.product.name}</p>
                      {item.variant && (
                        <p className="text-xs text-muted-foreground">
                          {item.variant.name}
                        </p>
                      )}
                    </div>
                    <p className="text-sm">
                      {formatPrice(
                        (item.variant?.price || item.product.price) * item.quantity
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{copy.subtotal}</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{dictionary.cart.shipping}</span>
                <span>{shipping === 0 ? copy.free : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{copy.estimatedTax}</span>
                <span>{formatPrice(tax)}</span>
              </div>
            </div>

            <div className="flex justify-between py-6 border-t border-border mt-6 font-medium text-lg">
              <span>{dictionary.cart.total}</span>
              <span>{formatPrice(total)}</span>
            </div>

            {/* Benefits */}
            <div className="mt-6 pt-6 border-t border-border space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Truck className="w-4 h-4 flex-shrink-0" />
                <span>{copy.freeShippingBenefit}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Gift className="w-4 h-4 flex-shrink-0" />
                <span>{copy.freeSamplesBenefit}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

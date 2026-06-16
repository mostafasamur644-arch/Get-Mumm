import { useLanguage } from "@/contexts/LanguageContext";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import { HeartHandshake, TrendingUp, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function PartnerPage() {
  const { t, isRtl } = useLanguage();

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-24 md:py-32 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-6">
              {t("Become a Partner", "انضم كشريك")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
              {t("Turn your kitchen into a business.", "حوّل مطبخك إلى مشروع تجاري.")}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {t("Are you passionate about cooking? Join our network of home chefs and start earning from home while doing what you love.", "هل أنت شغوف بالطبخ؟ انضم إلى شبكة طهاتنا المنزلية وابدأ في كسب المال من المنزل أثناء القيام بما تحب.")}
            </p>
            <div className="flex items-center gap-4">
              <Button size="lg" className="rounded-full px-8 h-14 text-lg">
                {t("Apply Now", "قدم الآن")}
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
              <img src="/chef1.png" alt="Chef Partner" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mt-32">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">{t("Financial Independence", "الاستقلال المالي")}</h3>
            <p className="text-muted-foreground">
              {t("Earn a sustainable income by selling your signature dishes to thousands of customers.", "احصل على دخل مستدام من خلال بيع أطباقك المميزة لآلاف العملاء.")}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">{t("Flexible Schedule", "جدول مرن")}</h3>
            <p className="text-muted-foreground">
              {t("You decide when to cook and how many orders to accept. Work around your family's needs.", "أنت من يقرر متى تطبخ وعدد الطلبات التي تقبلها. اعمل بما يتناسب مع احتياجات عائلتك.")}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <HeartHandshake className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">{t("Full Support", "دعم كامل")}</h3>
            <p className="text-muted-foreground">
              {t("We handle marketing, customer service, and delivery. You focus on what you do best: cooking.", "نحن نتولى التسويق وخدمة العملاء والتوصيل. أنت تركز على ما تفعله بشكل أفضل: الطبخ.")}
            </p>
          </div>
        </div>

        <div className="mt-32 bg-card border rounded-[3rem] p-12 text-center shadow-lg">
          <h2 className="text-3xl font-serif font-bold mb-6">
            {t("Ready to share your recipes with the world?", "مستعد لمشاركة وصفاتك مع العالم؟")}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("Our team will guide you through hygiene certification, menu planning, and packaging to ensure your success.", "سيرشدك فريقنا خلال شهادات النظافة وتخطيط قائمة الطعام والتعبئة والتغليف لضمان نجاحك.")}
          </p>
          <Button size="lg" className="rounded-full px-12 h-14 text-lg">
            {t("Start Your Journey", "ابتدئ رحلتك")}
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}

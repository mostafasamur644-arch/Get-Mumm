import { useLanguage } from "@/contexts/LanguageContext";
import { PageWrapper, fadeInUp } from "@/components/layout/PageWrapper";
import { useGetSiteSummary } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Heart, Users, Utensils, Globe } from "lucide-react";

export default function AboutPage() {
  const { t, isRtl } = useLanguage();
  const { data: summary } = useGetSiteSummary();

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-destructive" />,
      title: t("Made with Love", "صُنع بحب"),
      desc: t("Every meal is crafted by a mother or skilled home chef with care.", "كل وجبة يتم تحضيرها بعناية على يد أم أو طاهية منزلية ماهرة.")
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: t("Empowering Women", "تمكين المرأة"),
      desc: t("We create sustainable income opportunities for women and refugees.", "نخلق فرص دخل مستدامة للنساء واللاجئات.")
    },
    {
      icon: <Utensils className="w-8 h-8 text-secondary" />,
      title: t("Authentic Taste", "مذاق أصيل"),
      desc: t("Preserving Egyptian culinary heritage through traditional recipes.", "الحفاظ على التراث الأصيل للمطبخ المصري من خلال الوصفات التقليدية.")
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-500" />,
      title: t("Community Impact", "أثر مجتمعي"),
      desc: t("Building a supportive network of chefs, families, and businesses.", "بناء شبكة داعمة من الطهاة والعائلات والشركات.")
    }
  ];

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="py-24 bg-card border-b border-border">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <motion.h1 
            {...fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6"
          >
            {t("More than just food.", "أكثر من مجرد طعام.")} <br/>
            <span className="text-primary">{t("We are a movement.", "نحن حركة مجتمعية.")}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground leading-relaxed mx-auto max-w-3xl"
          >
            {t(
              "Get Mumm was founded to solve two problems: busy people missing real, homemade food, and talented women needing flexible, dignified work from home.",
              "تأسست ممم لحل مشكلتين: الأشخاص المشغولون الذين يفتقدون الطعام المنزلي الحقيقي، والنساء الموهوبات اللاتي يحتجن إلى عمل مرن وكريم من المنزل."
            )}
          </motion.p>
        </div>
      </section>

      {/* Story with Image */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative">
              <img 
                src="/family_dining.png" 
                alt="Family Dining" 
                className="rounded-3xl shadow-xl w-full"
              />
              <div className="absolute -bottom-8 -right-8 w-64 p-6 bg-card border rounded-2xl shadow-lg hidden md:block">
                <p className="text-sm font-bold text-primary mb-1">{t("Our Mission", "مهمتنا")}</p>
                <p className="text-muted-foreground leading-tight">
                  {t("To empower women by turning their passion for cooking into a sustainable business.", "تمكين النساء من خلال تحويل شغفهن بالطبخ إلى عمل مستدام.")}
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <h2 className="text-3xl font-serif font-bold">{t("Our Story", "قصتنا")}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t(
                  "It started with a simple craving for mom's food. Fast food was fast, restaurants were expensive, but nothing felt like home. Meanwhile, thousands of talented women in Cairo—including refugees looking for a fresh start—were cooking incredible meals for their families every day.",
                  "بدأ الأمر برغبة بسيطة في تذوق طعام الأم. الوجبات السريعة كانت سريعة، والمطاعم كانت باهظة الثمن، ولكن لا شيء يشبه طعام المنزل. في الوقت نفسه، كانت آلاف النساء الموهوبات في القاهرة - بما في ذلك اللاجئات اللاتي يبحثن عن بداية جديدة - يطبخن وجبات مذهلة لعائلاتهن كل يوم."
                )}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t(
                  "We built Get Mumm to connect these two worlds. A platform where anyone can order hygienic, authentic, homemade meals, and where women can become independent micro-entrepreneurs right from their own kitchens.",
                  "أنشأنا ممم للربط بين هذين العالمين. منصة حيث يمكن لأي شخص طلب وجبات منزلية صحية وأصيلة، وحيث يمكن للنساء أن يصبحن رائدات أعمال مستقلات من مطابخهن الخاصة."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      {summary && (
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-5xl font-bold mb-2">{summary.mealsDelivered.toLocaleString()}+</p>
                <p className="font-medium opacity-90">{t("Meals Delivered", "وجبة تم توصيلها")}</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">{summary.chefsEmpowered}+</p>
                <p className="font-medium opacity-90">{t("Chefs Empowered", "شيف تم دعمها")}</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">{summary.yearsOfService}</p>
                <p className="font-medium opacity-90">{t("Years Serving Cairo", "سنوات من الخدمة في القاهرة")}</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">{summary.avgRating}</p>
                <p className="font-medium opacity-90">{t("Average Rating", "متوسط التقييم")}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Values */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-16">{t("Our Values", "قيمنا")}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {values.map((v, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                <p className="text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

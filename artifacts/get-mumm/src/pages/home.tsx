import { useLanguage } from "@/contexts/LanguageContext";
import { PageWrapper, fadeInUp, staggerContainer, staggerItem } from "@/components/layout/PageWrapper";
import { useGetFeaturedItems, useListCategories, useListTestimonials } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Star, ArrowRight, ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { t, isRtl } = useLanguage();
  const { data: featuredItems, isLoading: isFeaturedLoading } = useGetFeaturedItems();
  const { data: categories, isLoading: isCategoriesLoading } = useListCategories();
  const { data: testimonials, isLoading: isTestimonialsLoading } = useListTestimonials();

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <img 
            src="/koshari.png" 
            alt="Delicious Egyptian Food" 
            className="w-full h-full object-cover opacity-20 dark:opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center mt-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-foreground mb-6"
          >
            {t("Homemade Meals Delivered with Love", "وجبات منزلية بنكهة الحب")}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto"
          >
            {t(
              "Experience the warmth of a grandmother's kitchen, delivered fresh to your door in Cairo and Giza. Support local women and enjoy authentic Egyptian flavors.",
              "استمتع بدفء مطبخ الجدة، يصلك طازجاً إلى باب منزلك في القاهرة والجيزة. ادعم النساء المحليات واستمتع بالنكهات المصرية الأصيلة."
            )}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/menu">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl">
                {t("Explore Menu", "تصفح المنيو")}
              </Button>
            </Link>
            <Link href="/for-offices">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 rounded-full border-2 bg-background/50 backdrop-blur-sm">
                {t("For Offices", "للشركات")}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Stats Strip */}
      <section className="bg-primary/5 border-y border-border py-12">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { value: "10K+", label: t("Meals Delivered", "وجبة تم توصيلها") },
              { value: "50+", label: t("Chefs Empowered", "شيف تم دعمها") },
              { value: "5K+", label: t("Happy Customers", "عميل سعيد") },
              { value: "4.9", label: t("Average Rating", "متوسط التقييم") },
            ].map((stat, i) => (
              <motion.div key={i} variants={staggerItem} className="flex flex-col">
                <span className="text-4xl font-bold text-primary mb-2">{stat.value}</span>
                <span className="text-muted-foreground font-medium">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">{t("Featured Dishes", "الأطباق المميزة")}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("Taste the authenticity of our most loved homemade recipes.", "تذوق أصالة وصفاتنا المنزلية الأكثر شعبية.")}
            </p>
          </motion.div>

          {isFeaturedLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-[2rem]" />
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredItems?.slice(0, 3).map((item) => (
                <Link key={item.id} href={`/menu/${item.id}`}>
                  <motion.div 
                    whileHover={{ y: -10 }}
                    className="group bg-card border rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col"
                  >
                    <div className="relative h-64 overflow-hidden bg-muted">
                      <img 
                        src={item.imageUrl || "/koshari.png"} 
                        alt={isRtl ? item.nameAr : item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'} bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold`}>
                        {isRtl ? item.categoryNameAr : item.categoryName}
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-xl leading-tight">{isRtl ? item.nameAr : item.name}</h3>
                        <span className="font-bold text-primary whitespace-nowrap ml-2 bg-primary/10 px-2 py-1 rounded-lg">
                          {item.price} {t("EGP", "ج.م")}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-6 flex-1">
                        {isRtl ? item.descriptionAr : item.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border pt-4">
                        <span className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[10px] text-white font-bold">
                            {(isRtl ? item.chefNameAr : item.chefName).charAt(0)}
                          </span>
                          {isRtl ? item.chefNameAr : item.chefName}
                        </span>
                        {item.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{item.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link href="/menu">
              <Button variant="outline" size="lg" className="rounded-full px-8">
                {t("View Full Menu", "عرض القائمة كاملة")}
                {isRtl ? <ArrowLeft className="mr-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">{t("Browse by Category", "تصفح بالتصنيفات")}</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {isCategoriesLoading ? (
              Array(4).fill(0).map((_, i) => <Skeleton key={i} className="aspect-square rounded-[2rem]" />)
            ) : (
              categories?.slice(0, 4).map((cat) => (
                <Link key={cat.id} href={`/menu?category=${cat.id}`}>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="relative aspect-square rounded-[2rem] overflow-hidden group cursor-pointer"
                  >
                    <img src={cat.imageUrl || "/mahshi.png"} alt={isRtl ? cat.nameAr : cat.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
                      <h3 className="text-2xl md:text-3xl font-bold font-serif mb-2">{isRtl ? cat.nameAr : cat.name}</h3>
                      <p className="text-sm opacity-80">{cat.itemCount} {t("items", "أطباق")}</p>
                    </div>
                  </motion.div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">{t("What They Say", "ماذا يقولون عنا")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {isTestimonialsLoading ? (
              Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-64 rounded-3xl" />)
            ) : (
              testimonials?.slice(0, 3).map((testimonial) => (
                <div key={testimonial.id} className="bg-primary/5 rounded-[2rem] p-8 border border-border">
                  <div className="flex gap-1 mb-6 text-yellow-500">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-lg mb-8 italic text-muted-foreground leading-relaxed">
                    "{isRtl ? testimonial.quoteAr : testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img src={testimonial.avatarUrl || "/chef2.png"} alt={isRtl ? testimonial.nameAr : testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <h4 className="font-bold">{isRtl ? testimonial.nameAr : testimonial.name}</h4>
                      {testimonial.role && (
                        <p className="text-sm text-muted-foreground">{isRtl ? testimonial.roleAr : testimonial.role}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* For Offices Teaser */}
      <section className="py-24 bg-secondary text-secondary-foreground overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
                {t("Elevate Your Office Lunch", "ارتقِ بغداء شركتك")}
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-lg">
                {t("Treat your team to real, healthy, homemade food. Flexible corporate subscriptions and catering options available.", "قدم لفريقك طعاماً حقيقياً وصحياً منزلي الصنع. باقات مرنة للشركات وخيارات تقديم طعام متنوعة.")}
              </p>
              <Link href="/for-offices">
                <Button size="lg" variant="secondary" className="rounded-full px-8 bg-white text-secondary hover:bg-white/90">
                  {t("Learn More", "اعرف المزيد")}
                </Button>
              </Link>
            </div>
            <div className="hidden lg:block relative">
              <img src="/office_catering.png" alt="Office Catering" className="rounded-[3rem] shadow-2xl rotate-3 scale-105" />
            </div>
          </div>
        </div>
      </section>

      {/* Download App CTA */}
      <section className="py-32 bg-background border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">{t("Get the App", "حمل التطبيق")}</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            {t("Order your favorite homemade meals faster and track your delivery in real-time.", "اطلب وجباتك المنزلية المفضلة بشكل أسرع وتتبع التوصيل في الوقت الفعلي.")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="h-16 px-8 rounded-2xl bg-black text-white hover:bg-black/80 flex items-center gap-3">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.88 3.5-.8 1.48.06 2.65.65 3.37 1.72-2.91 1.78-2.45 5.56.35 6.78-.65 1.63-1.46 3.2-2.3 4.47M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25"/></svg>
              <div className="text-left">
                <div className="text-xs opacity-80">Download on the</div>
                <div className="font-bold text-lg leading-none">App Store</div>
              </div>
            </Button>
            <Button size="lg" className="h-16 px-8 rounded-2xl bg-black text-white hover:bg-black/80 flex items-center gap-3">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a1.986 1.986 0 0 1-.505-1.309V3.123c0-.495.188-.95.504-1.309zM14.54 12.748l2.616 2.616-12.213 7.052 9.597-9.668zm.725-.725l4.575-2.641a1.217 1.217 0 0 1 1.157 2.12l-4.575 2.641-1.157-2.12zm-1.156-2.12L4.512 2.85l12.213 7.053-2.616 2.616z"/></svg>
              <div className="text-left">
                <div className="text-xs opacity-80">GET IT ON</div>
                <div className="font-bold text-lg leading-none">Google Play</div>
              </div>
            </Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

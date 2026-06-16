import { useLanguage } from "@/contexts/LanguageContext";
import { PageWrapper, fadeInUp, staggerContainer, staggerItem } from "@/components/layout/PageWrapper";
import { useListChefs } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";

export default function ChefsPage() {
  const { t, isRtl } = useLanguage();
  const { data: chefs, isLoading } = useListChefs();

  return (
    <PageWrapper>
      <div className="bg-secondary/10 pt-32 pb-20 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-secondary-foreground mb-6">
            {t("Meet Our Chefs", "تعرف على طهاتنا")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t(
              "The heart and soul of Get Mumm. Talented women crafting authentic meals from their homes to yours.",
              "قلب وروح ممم. نساء موهوبات يجهزن وجبات أصيلة من منازلهن إليكم."
            )}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {Array(6).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-96 w-full rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {chefs?.map((chef) => (
              <div key={chef.id} className="group relative bg-card border rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="aspect-square overflow-hidden bg-muted">
                  <img 
                    src={chef.imageUrl || "/chef1.png"} 
                    alt={isRtl ? chef.nameAr : chef.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-serif font-bold">{isRtl ? chef.nameAr : chef.name}</h3>
                    <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-500 px-2 py-1 rounded-lg text-sm font-bold">
                      <Star className="w-4 h-4 fill-current" />
                      {chef.rating}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {isRtl ? chef.bioAr : chef.bio}
                  </p>
                  <div className="pt-6 border-t border-border">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                      {t("Specialties", "أشهر الأطباق")}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(isRtl ? chef.specialtiesAr : chef.specialties).map((spec, i) => (
                        <span key={i} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

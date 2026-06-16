import { useLanguage } from "@/contexts/LanguageContext";
import { PageWrapper, fadeInUp, staggerContainer, staggerItem } from "@/components/layout/PageWrapper";
import { useListMenuItems, useListCategories } from "@workspace/api-client-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function MenuPage() {
  const { t, isRtl } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const { data: categories, isLoading: isCategoriesLoading } = useListCategories();
  const { data: items, isLoading: isItemsLoading } = useListMenuItems({ 
    categoryId: activeCategory,
    search: search || null
  });

  return (
    <PageWrapper>
      <div className="bg-primary/5 pt-32 pb-16 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{t("Our Menu", "قائمة الطعام")}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            {t("Authentic, freshly prepared meals straight from our talented home chefs to your table.", "وجبات أصيلة وطازجة محضرة بأيدي أمهر طهاة المنزل، من مطبخهم إلى مائدتك.")}
          </p>
          
          <div className="max-w-md mx-auto relative">
            <Search className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5 ${isRtl ? 'right-4' : 'left-4'}`} />
            <Input 
              placeholder={t("Search for a dish...", "ابحث عن طبق...")} 
              className={`h-12 rounded-full pl-12 ${isRtl ? 'pr-12 pl-4' : ''}`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full md:w-64 space-y-8 flex-shrink-0">
            <div>
              <h3 className="font-bold text-lg mb-4">{t("Categories", "التصنيفات")}</h3>
              <div className="flex flex-col gap-2">
                <Button 
                  variant={activeCategory === null ? "default" : "ghost"} 
                  className={`justify-start ${activeCategory === null ? "" : "text-muted-foreground"}`}
                  onClick={() => setActiveCategory(null)}
                >
                  {t("All Items", "كل الأطباق")}
                </Button>
                {isCategoriesLoading ? (
                  Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)
                ) : (
                  categories?.map((cat) => (
                    <Button 
                      key={cat.id}
                      variant={activeCategory === cat.id ? "default" : "ghost"} 
                      className={`justify-start ${activeCategory === cat.id ? "" : "text-muted-foreground"}`}
                      onClick={() => setActiveCategory(cat.id)}
                    >
                      {isRtl ? cat.nameAr : cat.name}
                      <span className="ml-auto bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
                        {cat.itemCount}
                      </span>
                    </Button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="flex-1">
            {isItemsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-48 w-full rounded-2xl" />
                    <Skeleton className="h-6 w-2/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-10 w-1/3" />
                  </div>
                ))}
              </div>
            ) : items?.length === 0 ? (
              <div className="text-center py-24 bg-muted/30 rounded-2xl border border-dashed border-border">
                <h3 className="text-xl font-bold mb-2">{t("No items found", "لم يتم العثور على أطباق")}</h3>
                <p className="text-muted-foreground">{t("Try adjusting your filters or search term.", "حاول تغيير كلمات البحث أو التصفية.")}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items?.map((item) => (
                  <Link key={item.id} href={`/menu/${item.id}`}>
                    <div className="group bg-card border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="relative h-48 overflow-hidden bg-muted">
                        <img 
                          src={item.imageUrl || "/koshari.png"} 
                          alt={isRtl ? item.nameAr : item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {item.isFeatured && (
                          <span className={`absolute top-3 ${isRtl ? 'right-3' : 'left-3'} bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full shadow-sm`}>
                            {t("Popular", "الأكثر طلباً")}
                          </span>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg leading-tight">{isRtl ? item.nameAr : item.name}</h3>
                          <span className="font-bold text-primary whitespace-nowrap ml-2">
                            {item.price} {t("EGP", "ج.م")}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                          {isRtl ? item.descriptionAr : item.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-4">
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-secondary"></span>
                            {isRtl ? item.chefNameAr : item.chefName}
                          </span>
                          {item.prepTimeMinutes && (
                            <span>{item.prepTimeMinutes} {t("mins", "دقيقة")}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

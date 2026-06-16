import { useLanguage } from "@/contexts/LanguageContext";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { useListBlogPosts } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function BlogPage() {
  const { t, isRtl } = useLanguage();
  const [filter, setFilter] = useState<"all" | "blog" | "recipe">("all");
  
  const { data: posts, isLoading } = useListBlogPosts(
    filter === "all" ? undefined : { type: filter }
  );

  return (
    <PageWrapper>
      <div className="bg-primary/5 pt-32 pb-16 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            {t("Stories & Recipes", "قصص ووصفات")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {t("Dive into the rich culinary heritage of Egypt, learn from our chefs, and discover our favorite recipes.", "اكتشف التراث الغني للطبخ المصري، تعلم من طهاتنا، وتعرف على وصفاتنا المفضلة.")}
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button 
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className="rounded-full px-6"
            >
              {t("All", "الكل")}
            </Button>
            <Button 
              variant={filter === "blog" ? "default" : "outline"}
              onClick={() => setFilter("blog")}
              className="rounded-full px-6"
            >
              {t("Stories", "قصص")}
            </Button>
            <Button 
              variant={filter === "recipe" ? "default" : "outline"}
              onClick={() => setFilter("recipe")}
              className="rounded-full px-6"
            >
              {t("Recipes", "وصفات")}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-60 w-full rounded-2xl" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : posts?.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold mb-2">{t("No posts found", "لم يتم العثور على مقالات")}</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts?.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <div className="group h-full flex flex-col bg-card border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-60 overflow-hidden bg-muted">
                    <img 
                      src={post.imageUrl || "/koshari.png"} 
                      alt={isRtl ? post.titleAr : post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'} bg-background/90 backdrop-blur-sm text-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-sm`}>
                      {post.type === 'recipe' ? t("Recipe", "وصفة") : t("Story", "قصة")}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTimeMinutes} {t("min read", "دقائق للقراءة")}
                      </span>
                      <span>•</span>
                      <span>{new Date(post.publishedAt).toLocaleDateString(isRtl ? 'ar-EG' : 'en-US')}</span>
                    </div>
                    <h3 className="text-xl font-bold leading-tight mb-3 group-hover:text-primary transition-colors">
                      {isRtl ? post.titleAr : post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                      {isRtl ? post.excerptAr : post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm font-medium border-t border-border pt-4 mt-auto">
                      <span>{isRtl ? post.authorAr : post.author}</span>
                      <span className="text-primary group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1 inline-block">
                        {t("Read more →", "اقرأ المزيد ←")}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

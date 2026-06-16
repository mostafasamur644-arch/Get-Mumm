import { Link, useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Globe, User } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const { t, language, setLanguage, isRtl } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("Home", "الرئيسية") },
    { href: "/menu", label: t("Menu", "المنيو") },
    { href: "/for-offices", label: t("For Offices", "للشركات") },
    { href: "/about", label: t("About Us", "من نحن") },
    { href: "/blog", label: t("Blog", "المدونة") },
    { href: "/contact", label: t("Contact", "تواصل معنا") },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-md border-b shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex flex-col items-start z-50">
          <span className={`text-2xl font-serif font-bold text-primary tracking-tight`}>Get Mumm</span>
          <span className={`text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:block`}>
            {t("Homemade Meals Delivered with Love", "وجبات منزلية بنكهة الحب")}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary relative group ${
                location === link.href ? "text-primary" : "text-foreground"
              }`}
            >
              {link.label}
              {location === link.href && (
                <motion.div 
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 lg:gap-4 z-50">
          <Button variant="ghost" size="icon" onClick={toggleLanguage} className="rounded-full" aria-label="Toggle language">
            <Globe className="h-5 w-5" />
            <span className="sr-only">Toggle language</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full" aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <div className="hidden sm:block">
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Account">
              <User className="h-5 w-5" />
            </Button>
          </div>
          <Button className="hidden sm:inline-flex rounded-full bg-primary hover:bg-primary/90 text-primary-foreground">
            {t("Order Now", "اطلب الآن")}
          </Button>

          {/* Mobile Menu Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background z-40 lg:hidden flex flex-col pt-24 px-6 overflow-y-auto"
          >
            <nav className="flex flex-col gap-6 mt-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-serif ${
                    location === link.href ? "text-primary font-bold" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-border my-4" />
              <Button className="w-full rounded-full h-14 text-lg">
                {t("Order Now", "اطلب الآن")}
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

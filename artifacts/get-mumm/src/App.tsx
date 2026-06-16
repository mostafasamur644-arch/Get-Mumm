import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { CartProvider } from "@/contexts/CartContext";
import { pageVariants } from "@/lib/motion";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

import Home from "@/pages/home";
import MenuPage from "@/pages/menu";
import MenuItemPage from "@/pages/menu/[id]";
import ChefsPage from "@/pages/chefs";
import BlogPage from "@/pages/blog";
import BlogPostPage from "@/pages/blog/[slug]";
import ForOfficesPage from "@/pages/for-offices";
import AboutPage from "@/pages/about";
import SubscriptionsPage from "@/pages/subscriptions";
import ContactPage from "@/pages/contact";
import PrivacyPage from "@/pages/privacy";
import TermsPage from "@/pages/terms";
import DeliveryAreasPage from "@/pages/delivery-areas";
import PartnerPage from "@/pages/partner";
import CheckoutPage from "@/pages/checkout";
import OrderConfirmationPage from "@/pages/order-confirmation";
import OrderTrackingPage from "@/pages/order-tracking";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 2,
    },
  },
});

function AnimatedRoutes() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait" initial>
      <motion.div
        key={location}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        className="flex-1 flex flex-col"
        style={{ willChange: "opacity, transform, filter" }}
      >
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/menu" component={MenuPage} />
          <Route path="/menu/:id" component={MenuItemPage} />
          <Route path="/chefs" component={ChefsPage} />
          <Route path="/blog" component={BlogPage} />
          <Route path="/blog/:slug" component={BlogPostPage} />
          <Route path="/for-offices" component={ForOfficesPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/subscriptions" component={SubscriptionsPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/privacy" component={PrivacyPage} />
          <Route path="/terms" component={TermsPage} />
          <Route path="/delivery-areas" component={DeliveryAreasPage} />
          <Route path="/partner" component={PartnerPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/order-confirmation" component={OrderConfirmationPage} />
          <Route path="/order/:id" component={OrderTrackingPage} />
          <Route component={NotFound} />
        </Switch>
      </motion.div>
    </AnimatePresence>
  );
}

function Router() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 flex flex-col">
        <AnimatedRoutes />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="get-mumm:theme">
        <LanguageProvider>
          <CartProvider>
            <TooltipProvider>
              <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                <Router />
              </WouterRouter>
              <Toaster />
            </TooltipProvider>
          </CartProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

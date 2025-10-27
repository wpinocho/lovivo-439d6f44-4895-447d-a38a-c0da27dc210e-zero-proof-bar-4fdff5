import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/components/CartProvider";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { PixelProvider } from "@/contexts/PixelContext";
import { PostHogProvider } from "@/contexts/PostHogContext";
import { FaviconManager } from "@/components/FaviconManager";
import Index from "./pages/Index";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import MyOrders from "./pages/MyOrders";
import AboutUs from "./pages/AboutUs";
import Collections from "./pages/Collections";
import CollectionPage from "./pages/CollectionPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PostHogProvider>
      <SettingsProvider>
        <PixelProvider>
          <TooltipProvider>
            <CartProvider>
              <Toaster />
              <Sonner />
              <FaviconManager />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/products/:slug" element={<Product />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/thank-you/:orderId" element={<ThankYou />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/my-orders" element={<MyOrders />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/collections" element={<Collections />} />
                  <Route path="/collections/:handle" element={<CollectionPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </CartProvider>
          </TooltipProvider>
        </PixelProvider>
      </SettingsProvider>
    </PostHogProvider>
  </QueryClientProvider>
);

export default App;
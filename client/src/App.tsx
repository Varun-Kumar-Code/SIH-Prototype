import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Favorites from "@/pages/favorites";
import Categories from "@/pages/categories";
import Cart from "@/pages/cart";
import UserProfile from "@/pages/user";
import Product from "@/pages/product";
import Order from "@/pages/order";
import Payment from "@/pages/payment";
import Map from "@/pages/explore";
import JharkhandMonuments from "@/pages/jharkhand-monuments";
import LoginPage from "@/pages/login";
import SignUpPage from "@/pages/signup";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/categories" component={Categories} />
      <Route path="/cart" component={Cart} />
      <Route path="/user" component={UserProfile} />
      <Route path="/product/:id" component={Product} />
      <Route path="/order/:id" component={Order} />
      <Route path="/payment" component={Payment} />
      <Route path="/explore" component={Map} />
      <Route path="/jharkhand-monuments" component={JharkhandMonuments} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

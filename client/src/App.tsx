import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Favorites from "./pages/Favorites";
import Privacy from "./pages/Privacy";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Blog from "./pages/Blog";
import Rastreamento from "./pages/Rastreamento";
import LoadingScreen from "./components/LoadingScreen";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/product/:id"} component={ProductDetail} />
      <Route path={"/favoritos"} component={Favorites} />
      <Route path={"/privacidade"} component={Privacy} />
      <Route path={"/sobre"} component={About} />
      <Route path={"/termos"} component={Terms} />
      <Route path={"/404"} component={NotFound} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/rastreamento"} component={Rastreamento} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <LoadingScreen />
      <CartProvider>
        <FavoritesProvider>
          <ThemeProvider
            defaultTheme="light"
          >
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </ThemeProvider>
        </FavoritesProvider>
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;

import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AuthPage from "./pages/AuthPage";
import type { AuthResponse, CartItem, Product, User } from "./types";
import { getProducts } from "./services/productService";

// Browser storage keeps the cart and signed-in user available after a refresh.
const CART_KEY = "sen371-cart";
const USER_KEY = "sen371-user";

export default function App() {
  // App owns the shared state that more than one page needs to use.
  const [cart, setCart] = useState<CartItem[]>(() =>
    JSON.parse(localStorage.getItem(CART_KEY) || "[]"),
  );
  const [user, setUser] = useState<User | null>(() =>
    JSON.parse(localStorage.getItem(USER_KEY) || "null"),
  );
  const [products, setProducts] = useState<Product[]>([]);

  // Keep local storage in sync whenever the cart or signed-in user changes.
  useEffect(() => localStorage.setItem(CART_KEY, JSON.stringify(cart)), [cart]);
  useEffect(
    () =>
      user
        ? localStorage.setItem(USER_KEY, JSON.stringify(user))
        : localStorage.removeItem(USER_KEY),
    [user],
  );

  // Load the catalogue once from the backend, then pass it to the pages that display products.
  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((error) => console.error("Unable to load products:", error));
  }, []);

  // Add to cart merges duplicate products and never allows more than the available stock.
  const addToCart = (product: Product, quantity: number) =>
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      return existing
        ? current.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: Math.min(item.quantity + quantity, item.stock),
                }
              : item,
          )
        : [...current, { ...product, quantity }];
    });

  const setQuantity = (id: number, quantity: number) =>
    setCart((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(quantity, item.stock) }
          : item,
      ),
    );

  // Login saves the JWT separately because checkout needs it in the Authorization header.
  const handleLogin = (response: AuthResponse) => {
    localStorage.setItem("sen371-token", response.token);
    setUser(response.user);
  };

  const logout = () => {
    localStorage.removeItem("sen371-token");
    setUser(null);
  };

  return (
    <div className="app">
      <Navbar
        count={cart.reduce((sum, item) => sum + item.quantity, 0)}
        user={user}
        onLogout={logout}
      />

      {/* Routes connect each URL to a page and pass the shared state/functions it needs. */}
      <Routes>
        <Route path="/" element={<HomePage products={products} />} />
        <Route
          path="/products"
          element={<ProductsPage products={products} />}
        />
        <Route
          path="/products/:id"
          element={<ProductDetailsPage products={products} onAdd={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <CartPage
              items={cart}
              onQuantity={setQuantity}
              onRemove={(id) =>
                setCart((current) => current.filter((item) => item.id !== id))
              }
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <CheckoutPage
              items={cart}
              user={user}
              onComplete={() => setCart([])}
            />
          }
        />
        <Route path="/login" element={<AuthPage onLogin={handleLogin} />} />
      </Routes>

      <Footer />
    </div>
  );
}

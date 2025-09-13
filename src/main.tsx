// main.tsx ou index.tsx
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Buy } from "./pages/BuyPage";
import { ShoppingStore } from "./pages/ShoppingStorePage";
import { Layout } from "./layout/Layout";
import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById("root")!).render(
  <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/buy/:id" element={<Buy />} />
          <Route path="/shoppingstore" element={<ShoppingStore />} />
        </Route>
        <Route path="*" element={<p>Página não encontrada</p>} />
      </Routes>
    </BrowserRouter>
  </CartProvider>
);

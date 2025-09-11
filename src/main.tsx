import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { Buy } from "./pages/Buy.tsx";
import { ShoppingStore } from "./pages/ShoppingStore.tsx";
import { CartProvider } from "./context/CartContext.tsx";

createRoot(document.getElementById("root")!).render(
  <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<p>Página não encontrada</p>} />
        <Route path="/" element={<App />} />
        <Route path="/buy/:id" element={<Buy />} />
        <Route path="/shopping-store" element={<ShoppingStore />} />"
      </Routes>
    </BrowserRouter>
  </CartProvider>
);

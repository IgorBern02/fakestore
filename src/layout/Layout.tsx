// layout/Layout.tsx
import { useEffect, useState, type FormEvent } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { SidebarMenu } from "../components/Header/SidebarMenu";
import { getCategories } from "../services/api";
import { type Category } from "../services/types";

export function Layout() {
  const [openMenu, setOpenMenu] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  // carregar categorias
  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
  }, []);

  const resetFilters = () => {
    setQuery("");
    setCategory("");
    setPage(0);
    setSearch("");
  };

  return (
    <div className="bg-background text-text w-full min-h-screen flex flex-col">
      <Header
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        categories={categories}
        category={category}
        setCategory={setCategory}
        setQuery={setQuery}
        setPage={setPage}
        resetFilters={resetFilters} // <- AQUI o Header recebe a função
      />
      {/* Menu lateral mobile */}
      <SidebarMenu
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        setQuery={setQuery}
        category={category}
        setCategory={setCategory}
        setPage={setPage}
        setSearch={() => {}} // pode adaptar se usar busca
        categories={categories}
      />

      {/* Aqui entra a página atual */}
      <main className="flex-1 container mx-auto mt-5 min-h-screen">
        <Outlet
          context={{
            query,
            category,
            page,
            search,
            setQuery,
            setCategory,
            setPage,
            setSearch,
            resetFilters,
          }}
        />
      </main>
    </div>
  );
}

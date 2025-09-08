import { useEffect, useState } from "react";
import {
  getProducts,
  searchProducts,
  getCategories,
  getProductsByCategory,
} from "./services/api";

import { type Product, type Category } from "./services/types";
import { Header } from "./components/Header";
import { FiltersDesktop } from "./components/FiltersDesktop";
import { ProductGrid } from "./components/ProductGrid";
import { Pagination } from "./components/Pagination";
import { SidebarMenu } from "./components/SidebarMenu";

function App() {
  const [openMenu, setOpenMenu] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [total, setTotal] = useState(0);

  const limit = 12;

  // categorias
  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
  }, []);

  // produtos
  useEffect(() => {
    setLoading(true);

    let fetchData: ReturnType<typeof getProducts>;

    if (search) {
      fetchData = searchProducts(search, limit, page * limit);
    } else if (category) {
      fetchData = getProductsByCategory(category, limit, page * limit);
    } else {
      fetchData = getProducts(limit, page * limit);
    }

    fetchData
      .then((res) => {
        setProducts(res.data.products);
        setTotal(res.data.total);
      })
      .finally(() => setLoading(false));
  }, [page, search, category]);

  const totalPages = Math.ceil(total / limit);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    setSearch(query);
    setCategory("");
  };

  if (loading) return <main className="p-4">Carregando...</main>;

  return (
    <div className="bg-background text-text w-full min-h-screen flex flex-col">
      {/* Cabeçalho */}
      <Header openMenu={openMenu} setOpenMenu={setOpenMenu} />

      {/* Navegação lateral */}
      <aside>
        <SidebarMenu
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
          setPage={setPage}
          setSearch={setSearch}
          categories={categories}
        />
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 container mx-auto px-4 pt-10">
        {/* Filtros e busca */}
        <section aria-label="Filtros de produtos">
          <FiltersDesktop
            query={query}
            setQuery={setQuery}
            handleSubmit={handleSubmit}
            category={category}
            setCategory={setCategory}
            setPage={setPage}
            setSearch={setSearch}
            categories={categories}
          />
        </section>

        {/* Lista de produtos */}
        <section aria-label="Lista de produtos" className="mt-6">
          <ProductGrid products={products} />
        </section>

        {/* Paginação */}
        {total > limit && (
          <nav
            aria-label="Paginação de produtos"
            className="mt-8 flex justify-center"
          >
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
          </nav>
        )}
      </main>

      {/* Rodapé (se você criar depois) */}
      {/* <footer className="bg-gray-100 text-center py-4">...</footer> */}
    </div>
  );
}

export default App;

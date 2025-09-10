import { useEffect, useState, type FormEvent } from "react";
import {
  getProducts,
  searchProducts,
  getCategories,
  getProductsByCategory,
} from "./services/api";

import { type Product, type Category } from "./services/types";
import { Header } from "./components/Header";
import { Filters } from "./components/Filters";
import { ProductGrid } from "./components/ProductGrid";
import { Pagination } from "./components/Pagination";
import { SidebarMenu } from "./components/SidebarMenu";
import { Footer } from "./components/Footer";

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
  const [error, setError] = useState<string>("");

  const limit = 12;

  // carregar categorias
  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
  }, []);

  // carregar produtos
  useEffect(() => {
    setLoading(true);
    setError("");

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
        if (res.data.products.length === 0) {
          setError("Nenhum produto encontrado.");
        }
        setProducts(res.data.products);
        setTotal(res.data.total);
      })
      .catch(() => {
        setError("Erro ao buscar produtos. Tente novamente.");
      })
      .finally(() => setLoading(false));
  }, [page, search, category]);

  const totalPages = Math.ceil(total / limit);

  // busca manual (quando o usuário digita e envia o form)
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setPage(0);
    setCategory("");
    setSearch(query);
  };

  const resetFilters = () => {
    setQuery("");
    setSearch("");
    setCategory("");
    setPage(0);
  };

  if (loading) return <main className="p-4">Carregando...</main>;

  return (
    <div className="bg-background text-text w-full min-h-screen flex flex-col">
      {/* Cabeçalho */}
      <Header
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        categories={categories}
        category={category}
        setCategory={setCategory}
        setQuery={setQuery}
        setPage={setPage}
        resetFilters={resetFilters}
      />

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
          <Filters
            query={query}
            setQuery={setQuery}
            handleSubmit={handleSubmit}
            category={category}
            setCategory={setCategory}
            setPage={setPage}
            setSearch={setSearch}
            categories={categories}
            error={error}
          />
        </section>

        {/* Lista de produtos */}
        <section aria-label="Lista de produtos" className="mt-6">
          {error ? (
            <p className="text-center text-red-500 font-medium">{error}</p>
          ) : (
            <ProductGrid products={products} />
          )}
        </section>

        {/* Paginação */}
        {!error && total > limit && (
          <nav
            aria-label="Paginação de produtos"
            className="mt-8 flex justify-center"
          >
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
          </nav>
        )}
      </main>

      {/* Rodapé */}
      <Footer />
    </div>
  );
}

export default App;

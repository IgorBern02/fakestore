import { useEffect, useState, type FormEvent } from "react";
import {
  getProducts,
  searchProducts,
  getCategories,
  getProductsByCategory,
} from "./services/api";

import { type Product, type Category } from "./services/types";
import { Filters } from "./components/UI/Filters";
import { ProductGrid } from "./components/Product/ProductGrid";
import { Pagination } from "./components/UI/Pagination";
import { Footer } from "./components/Footer/Footer";
import { useOutletContext } from "react-router-dom";

type LayoutContext = {
  query: string;
  category: string;
  page: number;
  search: string;
  setQuery: (v: string) => void;
  setCategory: (v: string) => void;
  setPage: (v: number) => void;
  setSearch: (v: string) => void;
  resetFilters: () => void;
};

function App() {
  const { query, category, page, search, setCategory, setPage, setSearch } =
    useOutletContext<LayoutContext>();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
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

    let fetchData;

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

  // busca manual
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setPage(0);
    setCategory("");
    setSearch(query);
  };

  if (loading) return <main className="p-4">Carregando...</main>;

  return (
    <div className="bg-background text-text w-full min-h-screen flex flex-col overflow-x-hidden">
      <main className="flex-1 container mx-auto px-4 pt-10">
        <section aria-label="Filtros de produtos">
          <Filters handleSubmit={handleSubmit} />
        </section>

        <section aria-label="Lista de produtos" className="mt-6">
          {error ? (
            <p className="text-center text-red-500 font-medium">{error}</p>
          ) : (
            <ProductGrid products={products} />
          )}
        </section>

        {!error && total > limit && (
          <nav
            aria-label="Paginação de produtos"
            className="mt-8 flex justify-center"
          >
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
          </nav>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;

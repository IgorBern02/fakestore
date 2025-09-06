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

  if (loading) return <div className="p-4">Carregando...</div>;

  return (
    <div className="p-4 bg-red-600 text-white min-h-screen w-full flex flex-col items-center justify-center">
      <Header openMenu={openMenu} setOpenMenu={setOpenMenu} />

      <SidebarMenu
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        // query={query}
        setQuery={setQuery}
        // handleSubmit={handleSubmit}
        category={category}
        setCategory={setCategory}
        setPage={setPage}
        setSearch={setSearch}
        categories={categories}
      />

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

      <ProductGrid products={products} />

      {total > limit && (
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      )}
    </div>
  );
}

export default App;

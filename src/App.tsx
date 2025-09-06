import { useEffect, useState } from "react";
import {
  getProducts,
  searchProducts,
  getCategories,
  getProductsByCategory,
} from "./services/api";

import { type Product, type Category } from "./services/types";
import { ListIcon, XIcon } from "@phosphor-icons/react";

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

  // carregar categorias
  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
  }, []);

  // carregar produtos
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
      .catch((err) => console.error(err))
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
      <header className="w-screen p-3 flex justify-between items-center mb-6 bg-pink-500">
        <h1 className="text-3xl font-bold">Fake Store</h1>

        {/* Botão hamburguer - visível só no mobile */}
        <button
          className="sm:hidden px-3 py-2 border rounded bg-white text-pink-500"
          onClick={() => setOpenMenu(true)}
        >
          {openMenu ? <XIcon size={24} /> : <ListIcon size={24} />}
        </button>
      </header>

      {/* Overlay + Menu com animação */}
      <div
        className={`fixed inset-0 bg-black/70 bg-opacity-40 z-50 transition-opacity ${
          openMenu ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpenMenu(false)}
      />

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white text-black p-4 z-50 transform transition-transform duration-300 overflow-y-auto ${
          openMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="font-bold text-lg mb-2">Categorias</h2>
        <button
          onClick={() => {
            setCategory("");
            setSearch("");
            setQuery("");
            setPage(0);
            setOpenMenu(false);
          }}
          className={`block w-full text-left p-2 rounded hover:bg-pink-200 ${
            category === "" ? "bg-pink-300" : ""
          }`}
        >
          Todas as categorias
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => {
              setCategory(cat.slug);
              setSearch("");
              setQuery("");
              setPage(0);
              setOpenMenu(false);
            }}
            className={`block w-full text-left p-2 rounded hover:bg-pink-200 ${
              category === cat.slug ? "bg-pink-300" : ""
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Filtros desktop */}
      <div className="hidden sm:flex w-screen p-3 justify-between items-center mb-6 gap-4 bg-blue-400">
        {/* Form de busca */}
        <form onSubmit={handleSubmit} className="flex gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-md p-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300 text-black"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Buscar
          </button>
        </form>

        {/* Dropdown de categorias (desktop) */}
        <select
          value={category}
          onChange={(e) => {
            setPage(0);
            setCategory(e.target.value);
            setSearch("");
            setQuery("");
          }}
          className="p-2 border rounded shadow-sm text-black"
        >
          <option value="">Todas as categorias</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Grid de produtos */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="border p-4 rounded shadow hover:shadow-lg transition bg-white text-black"
          >
            <img
              src={p.thumbnail}
              alt={p.title}
              className="h-40 object-contain mx-auto"
            />
            <h2 className="mt-2 font-bold line-clamp-2">{p.title}</h2>
            <p className="text-gray-700">R$ {p.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Paginação */}
      {total > limit && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 text-black"
          >
            Anterior
          </button>
          <span className="px-2 py-1 text-gray-200">
            Página {page + 1} de {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
            disabled={page + 1 >= totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

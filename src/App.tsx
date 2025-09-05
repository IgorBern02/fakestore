import { useEffect, useState } from "react";
import {
  getProducts,
  searchProducts,
  getCategories,
  getProductsByCategory,
  type Product,
  type Category,
} from "./services/api";

function App() {
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
    <div className="p-4">
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        {/* Form de busca */}
        <form onSubmit={handleSubmit} className="flex gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-md p-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Buscar
          </button>
        </form>

        {/* Dropdown de categorias */}
        <select
          value={category}
          onChange={(e) => {
            setPage(0);
            setCategory(e.target.value);
            setSearch(""); // limpar busca se filtrar
            setQuery("");
          }}
          className="p-2 border rounded shadow-sm"
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
            className="border p-4 rounded shadow hover:shadow-lg transition"
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
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="px-2 py-1 text-gray-700">
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

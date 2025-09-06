import type { FormEvent } from "react";
import { type Category } from "../services/types";

interface FiltrosDesktopProps {
  query: string;
  setQuery: (value: string) => void;
  handleSubmit: (e: FormEvent) => void;
  category: string;
  setCategory: (value: string) => void;
  setPage: (value: number) => void;
  setSearch: (value: string) => void;
  categories: Category[];
}

export function FiltersDesktop({
  query,
  setQuery,
  handleSubmit,
  category,
  setCategory,
  setPage,
  setSearch,
  categories,
}: FiltrosDesktopProps) {
  return (
    <div className="hidden sm:flex w-screen p-3 justify-between items-center mb-6 gap-4 bg-blue-400">
      {/* Busca */}
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

      {/* Categorias */}
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
  );
}

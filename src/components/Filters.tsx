import { useState, type FormEvent } from "react";
import { type Category } from "../services/types";
import { Button } from "./Button";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { searchProducts } from "../services/api";

interface FiltersProps {
  query: string;
  setQuery: (value: string) => void;
  handleSubmit: (e: FormEvent) => void;
  category: string;
  setCategory: (value: string) => void;
  setPage: (value: number) => void;
  setSearch: (value: string) => void;
  categories: Category[];
  error?: string;
}

export function Filters({
  query,
  setQuery,
  handleSubmit,
  category,
  setCategory,
  setPage,
  setSearch,
  categories,
  error,
}: FiltersProps) {
  return (
    <div className="flex flex-col w-full p-3 justify-between items-center mb-6 gap-4 mt-18 ">
      {/* Busca */}
      <form
        onSubmit={handleSubmit}
        className="relative flex gap-2 w-full justify-center items-center lg:text-lg"
      >
        <div className="w-full flex items-center justify-center ">
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className=" w-full  max-w-md p-2  rounded shadow-sm focus:outline-none focus:ring focus:ring-secondary text-black"
          />
          {/* <Button
          text="Buscar"
          className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded"
        /> */}
          <MagnifyingGlassIcon size={22} className="absolute right-2 top-2" />
        </div>
      </form>

      {/* Categorias */}
      {/* <select
        value={category}
        onChange={(e) => {
          setPage(0);
          setCategory(e.target.value);
          setSearch("");
          setQuery("");
        }}
        className="hidden lg:flex p-2 border rounded shadow-sm text-black"
      >
        <option value="">Todas as categorias</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select> */}
    </div>
  );
}

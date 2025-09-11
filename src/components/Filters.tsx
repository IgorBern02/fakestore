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

export function Filters({ query, setQuery, handleSubmit }: FiltersProps) {
  return (
    <div className="flex flex-col w-full p-3 justify-between items-center mb-6 gap-4 mt-18 ">
      {/* Busca */}
      <form
        onSubmit={handleSubmit}
        className="relative flex gap-2 w-full lg:w-2/7 justify-center items-center  rounded shadow-sm focus:outline-none focus:ring focus:ring-secondary text-black"
      >
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className=" w-full p-2"
        />
        {/* <Button
          text="Buscar"
          className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded"
        /> */}
        <MagnifyingGlassIcon size={22} className="absolute right-2 top-2 " />
      </form>
    </div>
  );
}

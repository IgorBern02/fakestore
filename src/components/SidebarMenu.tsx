// import type { FormEvent } from "react";
import { type Category } from "../services/types";

interface SidebarMenuProps {
  openMenu: boolean;
  setOpenMenu: (value: boolean) => void;
  //   query: string;
  setQuery: (value: string) => void;
  //   handleSubmit: (e: FormEvent) => void;
  category: string;
  setCategory: (value: string) => void;
  setPage: (value: number) => void;
  setSearch: (value: string) => void;
  categories: Category[];
}

export function SidebarMenu({
  openMenu,
  setOpenMenu,
  //   query,
  setQuery,
  //   handleSubmit,
  category,
  setCategory,
  setPage,
  setSearch,
  categories,
}: SidebarMenuProps) {
  return (
    <>
      {/* Overlay (desfocar + escurecer o fundo) */}
      {openMenu && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setOpenMenu(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 w-64 h-full scrool-y-auto overflow-y-auto bg-white text-black shadow-lg transform transition-transform duration-300 z-50 ${
          openMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4 text-xl font-bold"
          onClick={() => setOpenMenu(false)}
        >
          ✕
        </button>

        {/* Categorias */}
        <ul className="flex flex-col gap-2">
          <li
            className={`p-2 mt-12 rounded hover:bg-gray-200 cursor-pointer ${
              category === "" ? "font-bold" : ""
            }`}
            onClick={() => {
              setCategory("");
              setSearch("");
              setQuery("");
              setPage(0);
              setOpenMenu(false);
            }}
          >
            Todas as categorias
          </li>
          {categories.map((cat) => (
            <li
              key={cat.slug}
              className={`p-2 rounded hover:bg-gray-200 cursor-pointer ${
                category === cat.slug ? "font-bold" : ""
              }`}
              onClick={() => {
                setCategory(cat.slug);
                setSearch("");
                setQuery("");
                setPage(0);
                setOpenMenu(false);
              }}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

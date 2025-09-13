import { useState } from "react";
import type { SidebarMenuProps } from "../../types";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ShoppingCartIcon,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export function SidebarMenu({
  openMenu,
  setOpenMenu,
  setQuery,
  category,
  setCategory,
  setPage,
  setSearch,
  categories,
}: SidebarMenuProps) {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <>
      {openMenu && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setOpenMenu(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 w-64 md:w-96 h-full overflow-y-auto bg-white text-black shadow-lg transform transition-transform duration-300 z-50 ${
          openMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Categorias */}
        <ul className="flex flex-col gap-5 mt-5 md:text-lg">
          {/* Dropdown "Todas as categorias" */}
          <li className="p-2 mt-4 rounded cursor-pointer">
            <div
              className="flex justify-center items-center gap-10"
              onClick={() => setOpenDropdown((prev) => !prev)}
            >
              <span>Todas as categorias</span>
              <span className="text-sm">
                {openDropdown ? (
                  <ArrowUpIcon size={22} />
                ) : (
                  <ArrowDownIcon size={22} />
                )}
              </span>
            </div>

            {/* Submenu */}
            {openDropdown && (
              <ul className="mt-2 flex flex-col gap-2">
                <li
                  className="p-2 rounded bg-primary cursor-pointer"
                  onClick={() => {
                    setCategory("");
                    setSearch("");
                    setQuery("");
                    setPage(0);
                    setOpenMenu(false);
                  }}
                >
                  Ver tudo
                </li>
                {categories.map((cat) => (
                  <li
                    key={cat.slug}
                    className={`w-full p-2 rounded hover:bg-primary cursor-pointer ${
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
            )}
          </li>
          <li>
            <Link to="/shoppingstore">
              <div className="flex justify-center items-center gap-23">
                <span>Meu carrinho</span>
                <span>
                  <ShoppingCartIcon size={22} />
                </span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

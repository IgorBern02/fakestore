import { useEffect, useState, useRef } from "react";
import { ListIcon, ShoppingCartIcon, XIcon } from "@phosphor-icons/react";
import { SubHeader } from "./SubHeader";
import { type Category } from "../../services/types";
import { Link } from "react-router-dom";

interface HeaderProps {
  openMenu: boolean;
  setOpenMenu: (value: boolean) => void;
  categories: Category[];
  category: string;
  setCategory: (value: string) => void;
  setQuery: (value: string) => void;
  setPage: (value: number) => void;
  resetFilters: () => void;
}

export function Header({
  openMenu,
  setOpenMenu,
  categories,
  category,
  setCategory,
  setQuery,
  setPage,
  resetFilters,
}: HeaderProps) {
  const [showSubHeader, setShowSubHeader] = useState(true);
  const [subHeaderHeight, setSubHeaderHeight] = useState(0);
  const subHeaderRef = useRef<HTMLDivElement>(null);

  // Esconde o SubHeader ao rolar
  useEffect(() => {
    const handleScroll = () => {
      setShowSubHeader(window.scrollY <= 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Descobre a altura real do SubHeader
  useEffect(() => {
    if (subHeaderRef.current) {
      setSubHeaderHeight(subHeaderRef.current.offsetHeight);
    }
  }, [showSubHeader]);

  return (
    <>
      {/* SubHeader */}
      {showSubHeader && (
        <SubHeader
          text="DOS MESMOS CRIADORES DO Rock In Rio"
          ref={subHeaderRef}
        />
      )}

      {/* Header */}
      <header
        className={`w-full fixed left-0 z-50 flex justify-between items-center transition-all
        ${openMenu ? "bg-transparent shadow-none" : "bg-secondary"} h-16 px-4`}
        style={{ top: showSubHeader ? subHeaderHeight : 0 }}
      >
        {!openMenu && (
          <>
            <Link to="/" onClick={resetFilters}>
              <h1 className="text-3xl md:text-4xl font-story text-white">
                Fake Store
              </h1>
            </Link>

            {/* Menu Desktop */}
            {/* Menu Desktop */}
            <div className="hidden lg:flex items-center relative h-full">
              {/* Botão Todas as categorias */}
              <div className="relative group flex items-center h-full px-4 cursor-pointer hover:bg-red-600 transition duration-300">
                <span className="text-white font-medium">
                  Todas as categorias
                </span>

                <ul
                  className="absolute top-full left-0 w-64 max-h-96 overflow-auto 
                 rounded-2xl bg-white shadow-lg ring-1 ring-black/10 z-50 p-3
                 hidden group-hover:block"
                >
                  {categories.map((cat) => (
                    <li
                      key={cat.slug}
                      className={`px-4 py-2 text-gray-700 text-sm font-medium rounded-xl 
                      hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500 hover:text-white
                      transition-all duration-200 ease-out cursor-pointer
                      ${
                        category === cat.slug
                          ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                          : ""
                      }`}
                      onClick={() => {
                        setCategory(cat.slug);
                        setQuery("");
                        setPage(0);
                      }}
                    >
                      {cat.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Carrinho */}
              <Link
                to="/shoppingstore"
                className="relative flex items-center hover:bg-red-600 transition duration-300  h-full px-4 gap-2 cursor-pointer "
              >
                <span className="text-white font-medium">Meu carrinho</span>
                <ShoppingCartIcon size={22} color="white" />
              </Link>
            </div>
          </>
        )}

        {/* Botão Mobile */}
        <button
          className="lg:hidden px-3 py-2 text-black ml-auto"
          onClick={() => setOpenMenu(!openMenu)}
        >
          {openMenu ? (
            <XIcon size={28} color="white" />
          ) : (
            <ListIcon size={28} />
          )}
        </button>
      </header>
    </>
  );
}

import { useEffect, useState, useRef } from "react";
import { ListIcon, ShoppingCartIcon, XIcon } from "@phosphor-icons/react";
import { SubHeader } from "./SubHeader";
import { type Category } from "../services/types";

interface HeaderProps {
  openMenu: boolean;
  setOpenMenu: (value: boolean) => void;
  categories: Category[];
  category: string;
  setCategory: (value: string) => void;
  setQuery: (value: string) => void;
  setPage: (value: number) => void;
}

export function Header({
  openMenu,
  setOpenMenu,
  categories,
  category,
  setCategory,
  setQuery,
  setPage,
}: HeaderProps) {
  const [showSubHeader, setShowSubHeader] = useState(true);
  const [subHeaderHeight, setSubHeaderHeight] = useState(0);
  const subHeaderRef = useRef<HTMLDivElement>(null);
  const [openDropdown, setOpenDropdown] = useState(false);

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
            <h1 className="text-3xl md:text-4xl font-story text-white">
              Fake Store
            </h1>

            {/* Menu Desktop */}
            <div className="hidden lg:flex items-center gap-6 relative h-full">
              {/* Botão Todas as categorias */}
              <div
                className="relative flex items-center h-full px-4 bg-red-500 cursor-pointer"
                onMouseEnter={() => setOpenDropdown(true)}
                onMouseLeave={() => setOpenDropdown(false)}
              >
                <span className="text-white font-medium">
                  Todas as categorias
                </span>

                {openDropdown && (
                  <ul className="absolute top-full left-0 mt-1 bg-white text-black shadow-lg rounded w-48 z-50">
                    <li
                      className="p-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                      onClick={() => {
                        setCategory("");
                        setQuery("");
                        setPage(0);
                        setOpenDropdown(false);
                      }}
                    >
                      Ver tudo
                    </li>
                    {categories.map((cat) => (
                      <li
                        key={cat.slug}
                        className={`p-2 hover:bg-blue-500 hover:text-white cursor-pointer ${
                          category === cat.slug ? "font-bold" : ""
                        }`}
                        onClick={() => {
                          setCategory(cat.slug);
                          setQuery("");
                          setPage(0);
                          setOpenDropdown(false);
                        }}
                      >
                        {cat.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Carrinho */}
              <div className="flex items-center gap-2 text-white cursor-pointer">
                <span>Meu carrinho</span>
                <ShoppingCartIcon size={22} />
              </div>
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

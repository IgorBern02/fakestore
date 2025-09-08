import { ListIcon, XIcon } from "@phosphor-icons/react";

interface HeaderProps {
  openMenu: boolean;
  setOpenMenu: (value: boolean) => void;
}

export function Header({ openMenu, setOpenMenu }: HeaderProps) {
  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 shadow p-3 flex justify-between items-center transition-colors
      ${openMenu ? "bg-transparent shadow-none" : "bg-white"}`}
    >
      {/* Só mostra o título se o menu NÃO estiver aberto */}
      {!openMenu && (
        <h1 className="text-3xl md:text-4xl font-story">Fake Store</h1>
      )}

      {/* Botão de abrir/fechar menu */}
      <button
        className="lg:hidden px-3 py-2 text-black ml-auto"
        onClick={() => setOpenMenu(!openMenu)}
      >
        {openMenu ? <XIcon size={28} color="white" /> : <ListIcon size={28} />}
      </button>
    </header>
  );
}

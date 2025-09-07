import { ListIcon, XIcon } from "@phosphor-icons/react";

interface HeaderProps {
  openMenu: boolean;
  setOpenMenu: (value: boolean) => void;
}

export function Header({ openMenu, setOpenMenu }: HeaderProps) {
  return (
    <header className="w-screen p-3 flex justify-between items-center text-center ">
      <h1 className="text-3xl font-story">Fake Store</h1>

      <button
        className="sm:hidden px-3 py-2 border rounded bg-white text-pink-500"
        onClick={() => setOpenMenu(!openMenu)}
      >
        {openMenu ? <XIcon size={24} /> : <ListIcon size={24} />}
      </button>
    </header>
  );
}

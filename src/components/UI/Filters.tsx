import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useOutletContext } from "react-router-dom";
import type { LayoutContext, FiltersProps } from "../../types";

export function Filters({ handleSubmit }: FiltersProps) {
  const { query, setQuery } = useOutletContext<LayoutContext>();

  return (
    <div className="flex flex-col w-full p-3 justify-between items-center mb-6 gap-4 mt-18">
      {/* Busca */}
      <form
        onSubmit={handleSubmit}
        className="relative flex gap-2 w-full lg:w-2/7 justify-center items-center rounded shadow-sm focus:outline-none text-black"
      >
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 focus:outline-none"
        />
        <MagnifyingGlassIcon size={22} className="absolute right-2 top-2" />
      </form>
    </div>
  );
}

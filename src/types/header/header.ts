import type { Category } from "..";

export interface HeaderProps {
  openMenu: boolean;
  setOpenMenu: (value: boolean) => void;
  categories: Category[];
  category: string;
  setCategory: (value: string) => void;
  setQuery: (value: string) => void;
  setPage: (value: number) => void;
  resetFilters: () => void;
}

import type { Category } from "..";

export interface SidebarMenuProps {
  openMenu: boolean;
  setOpenMenu: (value: boolean) => void;
  setQuery: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  setPage: (value: number) => void;
  setSearch: (value: string) => void;
  categories: Category[];
}

export type LayoutContext = {
  query: string;
  category: string;
  page: number;
  search: string;
  setQuery: (v: string) => void;
  setCategory: (v: string) => void;
  setPage: (v: number) => void;
  setSearch: (v: string) => void;
  resetFilters: () => void;
};

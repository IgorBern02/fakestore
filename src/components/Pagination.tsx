interface PaginationProps {
  page: number;
  setPage: (value: number) => void;
  totalPages: number;
}

export function Pagination({ page, setPage, totalPages }: PaginationProps) {
  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        onClick={() => setPage(Math.max(page - 1, 0))}
        disabled={page === 0}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 text-black"
      >
        Anterior
      </button>
      <span className="px-2 py-1 text-gray-200">
        Página {page + 1} de {totalPages}
      </span>
      <button
        onClick={() => setPage(Math.min(page + 1, totalPages - 1))}
        disabled={page + 1 >= totalPages}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Próxima
      </button>
    </div>
  );
}

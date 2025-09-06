import { type Product } from "../services/types";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <div
          key={p.id}
          className="border p-4 rounded shadow hover:shadow-lg transition bg-white text-black"
        >
          <img
            src={p.thumbnail}
            alt={p.title}
            className="h-40 object-contain mx-auto"
          />
          <h2 className="mt-2 font-bold line-clamp-2">{p.title}</h2>
          <p className="text-gray-700">R$ {p.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}

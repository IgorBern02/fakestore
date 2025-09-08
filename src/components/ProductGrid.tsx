import { type Product } from "../services/types";
import { Card } from "./Card";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="container mx-auto px-4">
      <Card products={products} />
    </div>
  );
}

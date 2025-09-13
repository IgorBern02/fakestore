import type { ProductGridProps } from "../../types";
import { Card } from "./Card";

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="container mx-auto px-4">
      <Card products={products} />
    </div>
  );
}

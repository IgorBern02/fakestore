import { Link } from "react-router";
import { Button } from "./Button";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

type Products = Product[];

interface CardProps {
  products: Products;
}

export const Card = ({ products }: CardProps) => {
  return (
    <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:text-lg">
      {products.map((p) => (
        <Link to={`/buy/${p.id}`} key={p.id}>
          <div className="relative rounded-3xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-300 group">
            {/* Imagem de fundo */}
            <img
              src={p.thumbnail}
              alt={p.title}
              className="w-full h-64 object-cover "
            />

            {/* Conteúdo */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-text-primary">
              <h2 className="font-bold text-lg line-clamp-2">{p.title}</h2>
              <p className="text-sm text-destaque">R$ {p.price.toFixed(2)}</p>

              <div className="mt-3">
                <Button
                  text="Comprar"
                  className="w-full px-4 py-2 rounded-xl text-text-primary bg-primary hover:opacity-90 hover:bg-primary-hover transition"
                />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

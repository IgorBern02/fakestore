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
        <div
          key={p.id}
          className="relative rounded-3xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-300 group"
        >
          {/* Imagem de fundo */}
          <img
            src={p.thumbnail}
            alt={p.title}
            className="w-full h-64 object-cover"
          />

          {/* Overlay com degradê */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Conteúdo */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h2 className="font-bold text-lg line-clamp-2">{p.title}</h2>
            <p className="text-sm text-gray-200">R$ {p.price.toFixed(2)}</p>

            <div className="mt-3">
              <Button
                text="Comprar"
                className="w-full px-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

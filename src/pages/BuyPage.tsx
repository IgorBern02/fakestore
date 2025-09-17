import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Button } from "../components/UI/Button";
import { Link } from "react-router-dom";
import type { Product } from "../types";

export const Buy = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10">Carregando...</p>;
  if (!product)
    return <p className="text-center mt-10">Produto não encontrado</p>;

  return (
    <div className=" min-h-screen flex flex-col lg:flex-row items-center justify-center p-3 text-center text-white">
      <div className="relative flex flex-col lg:flex-row lg:w-3/5 gap-8 items-center justify-center text-text-primary mt-20">
        {/* Imagem do produto */}

        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-80 object-cover rounded-2xl shadow-lg"
        />

        {/* Detalhes */}
        <div>
          <h1 className="text-2xl font-bold mb-3">{product.title}</h1>
          <p className="text-gray-700 mb-4">
            {product.description || "Sem descrição."}
          </p>
          <p className="text-xl font-semibold mb-6 text-destaque">
            R$ {product.price.toFixed(2)}
          </p>
          <Link to={`/checkout/${product.id}`}>
            <Button
              text="Finalizar Compra"
              className="w-full lg:w-3/5 px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

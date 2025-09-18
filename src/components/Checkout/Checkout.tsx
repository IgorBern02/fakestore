import { useEffect, useState } from "react";
import type { Product } from "../../types";
import { useParams } from "react-router";
import { ConfirmData } from "../ConfirmData/ConfirmData";

export const Checkout = () => {
  // const [payment, setPayment] = useState("pix");
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!id) return;

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
    <div className="min-h-screen bg-background flex flex-col items-center py-10 px-4 mt-15">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-6">
        {/* Título */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Finalizar Compra
        </h1>

        {/* Produto escolhido */}
        <div className="flex flex-col md:flex-row items-center gap-6 border-b pb-6">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-32 h-32 object-contain rounded-lg shadow"
          />
          <div>
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-sm text-gray-600">
              {product.description || "Sem descrição."}
            </p>
            <p className="text-xl font-bold text-orange-600 mt-2">
              R$ {(product?.price ?? 0).toFixed(2)}
            </p>
          </div>
        </div>

        <ConfirmData />

        {/* Botão finalizar */}
        <div className="mt-8">
          <button
            onClick={() => setShowModal(true)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Confirmar Pedido
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-96 text-center shadow-lg">
              <h2 className="text-xl font-semibold mb-4">
                Pedido Confirmado 🎉
              </h2>
              <p className="text-gray-600 mb-6">
                Obrigado pela sua compra! Em breve você receberá mais
                informações no seu e-mail.
              </p>

              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

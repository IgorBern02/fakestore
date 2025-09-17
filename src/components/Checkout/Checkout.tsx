import { useEffect, useState } from "react";
import type { Product } from "../../types";
import { useParams } from "react-router";

export const Checkout = () => {
  const [payment, setPayment] = useState("pix");
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

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
    <div className="min-h-screen bg-yellow-100 flex flex-col items-center py-10 px-4 mt-15">
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

        {/* Formulário */}
        <div className="mt-6 space-y-6">
          {/* Dados do cliente */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Seus dados</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nome completo"
                className="w-full border rounded-md p-2 focus:border-orange-500 outline-none"
              />
              <input
                type="email"
                placeholder="E-mail"
                className="w-full border rounded-md p-2 focus:border-orange-500 outline-none"
              />
              <input
                type="text"
                placeholder="Endereço"
                className="w-full border rounded-md p-2 focus:border-orange-500 outline-none"
              />
              <input
                type="text"
                placeholder="CEP"
                className="w-full border rounded-md p-2 focus:border-orange-500 outline-none"
              />
              <input
                type="text"
                placeholder="Cidade"
                className="w-full border rounded-md p-2 focus:border-orange-500 outline-none"
              />
            </div>
          </div>

          {/* Métodos de pagamento */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Pagamento</h3>
            <div className="flex gap-4">
              <button
                onClick={() => setPayment("pix")}
                className={`px-4 py-2 rounded-md border cursor-pointer ${
                  payment === "pix" ? "bg-orange-500 text-white" : "bg-white"
                }`}
              >
                Pix
              </button>
              <button
                onClick={() => setPayment("cartao")}
                className={`px-4 py-2 rounded-md border cursor-pointer ${
                  payment === "cartao" ? "bg-orange-500 text-white" : "bg-white"
                }`}
              >
                Cartão
              </button>
              <button
                onClick={() => setPayment("boleto")}
                className={`px-4 py-2 rounded-md border cursor-pointer ${
                  payment === "boleto" ? "bg-orange-500 text-white" : "bg-white"
                }`}
              >
                Boleto
              </button>
            </div>

            {payment === "cartao" && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Número do cartão"
                  className="border rounded-md p-2 focus:border-orange-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="Nome no cartão"
                  className="border rounded-md p-2 focus:border-orange-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="Validade (MM/AA)"
                  className="border rounded-md p-2 focus:border-orange-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="border rounded-md p-2 focus:border-orange-500 outline-none"
                />
              </div>
            )}
          </div>
        </div>

        {/* Botão finalizar */}
        <div className="mt-8">
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition">
            Confirmar Pedido
          </button>
        </div>
      </div>
    </div>
  );
};

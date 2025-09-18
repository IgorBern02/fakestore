import { useState } from "react";

export const ConfirmData = () => {
  const [payment, setPayment] = useState("pix");

  const data = [
    { id: 1, name: "Nome completo" },
    { id: 2, name: "E-mail" },
    { id: 3, name: "Endereço" },
    { id: 4, name: "CEP" },
    { id: 5, name: "Cidade" },
  ];

  const paymentMethods = [
    { id: 1, label: "Pix", value: "pix" },
    { id: 2, label: "Cartão", value: "cartao" },
    { id: 3, label: "Boleto", value: "boleto" },
  ];

  const dataCart = [
    { id: 1, name: "Nome no cartão" },
    { id: 2, name: "Número do cartão" },
    { id: 3, name: "Validade (MM/AA)" },
    { id: 4, name: "CVV" },
  ];

  return (
    <div className="mt-6 space-y-6">
      {/* Dados do cliente */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Seus dados</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {data.map((item) => (
            <div key={item.id}>
              <label className="block mb-1 font-medium">{item.name}</label>
              <input
                required
                type="text"
                placeholder="Digite aqui"
                className="w-full border rounded-md p-2 focus:border-orange-500 outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Métodos de pagamento */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Pagamento</h3>
        <div className="flex gap-4">
          {/* Botões de pagamento */}
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              type="button"
              onClick={() => setPayment(method.value as any)}
              className={`px-4 py-2 rounded-md border cursor-pointer ${
                payment === method.value
                  ? "bg-orange-500 text-white"
                  : "bg-white "
              }`}
            >
              {method.label}
            </button>
          ))}
        </div>

        {payment === "cartao" && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {dataCart.map((item) => (
              <div key={item.id}>
                <label className="block mb-1 font-medium">{item.name}</label>
                <input
                  type="text"
                  required
                  placeholder="Digite aqui"
                  className="w-full border rounded-md p-2 focus:border-orange-500 outline-none"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

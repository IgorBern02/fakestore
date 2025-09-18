// pages/ShoppingStore.tsx
import { useCart } from "../context/CartContext";
import { Button } from "../components/UI/Button";
import { PlusIcon, MinusIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useState } from "react";

export const ShoppingStore = () => {
  const {
    cart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<number | null>(null);

  const handleRemoveClick = (id: number) => {
    setItemToRemove(id); // guarda o id do produto
    setShowModal(true); // abre modal
  };

  const confirmRemove = () => {
    if (itemToRemove !== null) {
      removeFromCart(itemToRemove);
      setItemToRemove(null);
    }
    setShowModal(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen p-3 pt-6">
      <ul className="w-full h-auto mt-20 overflow-y-auto flex flex-col lg:grid grid-cols-5 items-center justify-start p-3 text-center gap-3">
        {cart.length === 0 ? (
          <p className=" text-black w-full flex items-center justify-center">
            Seu carrinho está vazio
          </p>
        ) : (
          cart.map((item) => (
            <li
              key={item.id}
              className="w-full flex flex-col items-center gap-3 p-3 bg-white shadow-lg rounded-lg text-black"
            >
              <section className="w-full flex items-center justify-between p-3 rounded">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-35 h-35 object-cover rounded"
                />
                <div className="flex flex-col items-start flex-1">
                  <span className="font-semibold">{item.title}</span>
                  <span className="text-gray-700 mt-2">
                    R$ {(item.price * item.quantity).toFixed(2)} (
                    {item.quantity}x)
                  </span>
                </div>
              </section>

              <section className="w-full flex items-center justify-center p-3 rounded">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="text-white p-2 bg-primary rounded hover:bg-secondary cursor-pointer transition duration-300"
                  >
                    <MinusIcon size={18} />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="text-white p-2 bg-primary rounded hover:bg-secondary cursor-pointer transition duration-300"
                  >
                    <PlusIcon size={19} />
                  </button>
                </div>
              </section>

              <Button
                text="Remover"
                className="text-white w-full p-2 bg-primary rounded hover:bg-secondary cursor-pointer transition duration-300"
                // onClick={() => removeFromCart(item.id)}
                onClick={() => handleRemoveClick(item.id)}
              />
            </li>
          ))
        )}
      </ul>

      <div className="w-full flex flex-col items-center justify-center p-3 rounded">
        {cart.length > 0 && (
          <div className="w-full mt-6 text-black text-lg font-semibold">
            Total: R$ {total.toFixed(2)}
          </div>
        )}

        <Link
          to="/checkoutall"
          className="w-full flex items-center justify-center"
        >
          <Button
            text="Finalizar Compra"
            disabled={cart.length === 0}
            className=" w-4/5 lg:w-1/5 px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition mt-6 cursor-pointer disabled:opacity-50"
          />
        </Link>
      </div>

      {/* Modal de confirmação */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 text-center shadow-lg">
            {itemToRemove ? (
              <>
                <h2 className="text-xl font-semibold mb-4">
                  Remover item do carrinho?
                </h2>
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={confirmRemove}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition"
                  >
                    Remover
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition"
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

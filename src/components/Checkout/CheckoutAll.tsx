import { MinusIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react";
import { useCart } from "../../context/CartContext";
import { Button } from "../UI/Button";
import { ConfirmData } from "../ConfirmData/ConfirmData";
import { useRemoveItem } from "../../hooks/useRemoveItem";

export const CheckoutAll = () => {
  const { cart, updateQuantity, removeFromCart, total } = useCart();

  // // controla o modal e o item selecionado
  // const [showModal, setShowModal] = useState(false);
  // const [itemToRemove, setItemToRemove] = useState<number | null>(null);

  // const handleRemoveClick = (id: number) => {
  //   setItemToRemove(id); // guarda o id do produto
  //   setShowModal(true); // abre modal
  // };

  // const confirmRemove = () => {
  //   if (itemToRemove !== null) {
  //     removeFromCart(itemToRemove);
  //     setItemToRemove(null);
  //   }
  //   setShowModal(false);
  // };

  const {
    showModal,
    setShowModal,
    handleRemoveClick,
    confirmRemove,
    itemToRemove,
  } = useRemoveItem();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-10 px-4 mt-20">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Finalizar Compra
        </h1>

        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center gap-6 border-b pb-6 mb-4 relative"
          >
            {window.innerWidth <= 768 && (
              <button
                onClick={() => handleRemoveClick(item.id)}
                className="absolute right-10 ml-4 px-2 py-1 rounded"
              >
                <TrashIcon size={30} color="black" />
              </button>
            )}

            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-45 h-45 lg:w-32 lg:h-32 object-contain rounded-lg shadow"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-base text-gray-600">{item.description}</p>
              <p className="text-black/60 mt-2 ">
                R$ {(item.price * item.quantity).toFixed(2)} ({item.quantity}x)
              </p>

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() =>
                    updateQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                  className="p-2 lg:p-1 bg-orange-500 text-white rounded cursor-pointer"
                >
                  <MinusIcon size={14} weight="bold" />
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-2 lg:p-1 bg-orange-500 text-white rounded cursor-pointer"
                >
                  <PlusIcon size={14} weight="bold" />
                </button>

                {window.innerWidth >= 768 && (
                  <Button
                    text="Remover"
                    onClick={() => handleRemoveClick(item.id)}
                    className="ml-4 p-1 bg-red-500 text-white rounded cursor-pointer"
                  />
                )}
              </div>
            </div>
          </div>
        ))}

        <ConfirmData />

        <div className="text-right font-bold text-xl mt-4">
          Total: R$ {total.toFixed(2)}
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg mt-6 cursor-pointer transition duration-300"
        >
          Confirmar Pedido
        </button>

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
    </div>
  );
};

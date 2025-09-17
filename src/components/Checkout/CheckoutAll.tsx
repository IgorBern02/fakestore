// CheckoutAll.tsx
import { useCart } from "../../context/CartContext";

export const CheckoutAll = () => {
  const { cart, updateQuantity, removeFromCart, total } = useCart();

  return (
    <div className="min-h-screen bg-yellow-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Finalizar Compra
        </h1>

        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center gap-6 border-b pb-6 mb-4"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-32 h-32 object-contain rounded-lg shadow"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-orange-600 font-bold mt-2">
                R$ {(item.price * item.quantity).toFixed(2)} ({item.quantity}x)
              </p>

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() =>
                    updateQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                  className="px-2 py-1 bg-orange-500 text-white rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 bg-orange-500 text-white rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 px-2 py-1 bg-red-500 text-white rounded"
                >
                  Remover
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="text-right font-bold text-xl mt-4">
          Total: R$ {total.toFixed(2)}
        </div>

        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg mt-6">
          Confirmar Pedido
        </button>
      </div>
    </div>
  );
};

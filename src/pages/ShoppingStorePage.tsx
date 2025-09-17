// pages/ShoppingStore.tsx
import { useCart } from "../context/CartContext";
import { Button } from "../components/UI/Button";
import { PlusIcon, MinusIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export const ShoppingStore = () => {
  const {
    cart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
                onClick={() => removeFromCart(item.id)}
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
    </div>
  );
};

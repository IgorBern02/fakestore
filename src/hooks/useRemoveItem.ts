// hooks/useRemoveItem.ts
import { useState } from "react";
import { useCart } from "../context/CartContext";

export function useRemoveItem() {
  const { removeFromCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<number | null>(null);

  const handleRemoveClick = (id: number) => {
    setItemToRemove(id);
    setShowModal(true);
  };

  const confirmRemove = () => {
    if (itemToRemove !== null) {
      removeFromCart(itemToRemove);
      setItemToRemove(null);
    }
    setShowModal(false);
  };

  return {
    showModal,
    setShowModal,
    itemToRemove,
    handleRemoveClick,
    confirmRemove,
  };
}

import { useState } from "react";

export const ModalConfirmOrder = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="px-4 py-2 bg-orange-500 text-white rounded-md"
      >
        Confirmar Pedido
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-11/12 md:w-1/2 lg:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Pedido Confirmado!</h2>
            <p className="mb-4">Obrigado por sua compra.</p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-orange-500 text-white rounded-md"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

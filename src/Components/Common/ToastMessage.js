import React, { useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { LanguageContext } from "../Context/LanguageContext";

const translations = {
  product_added: {
    TR: "Ürün sepete eklendi",
    EN: "Item added to cart",
  },
  cart_empty: {
    TR: "Sepetiniz boş",
    EN: "Your cart is empty",
  },
  // buraya diğer mesajlar da eklenebilir
};

const ToastMessage = ({ messageKey, onClose }) => {
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const localizedMessage = translations[messageKey]?.[language] || messageKey;

  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        top: "5vh",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#062c2c",
        color: "white",
        padding: "10px 20px",
        borderRadius: "24px",
        fontSize: "14px",
        fontWeight: "bold",
        zIndex: 999999,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        maxWidth: "90vw",
        whiteSpace: "nowrap",
        textAlign: "center",
        pointerEvents: "none",
      }}
    >
      {localizedMessage}
    </div>,
    document.body
  );
};

export default ToastMessage;

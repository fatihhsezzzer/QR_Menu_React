import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import { useCart } from "../Context/CartContext";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { LanguageContext } from "../Context/LanguageContext"; // ✅ eklendi

const CartModal = ({ show, handleClose }) => {
  const { cartItems, removeItem, clearCart, addItem } = useCart();
  const { language } = useContext(LanguageContext); // ✅ dil bilgisi alındı

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      addItem({ ...item, quantity: -1 });
    } else {
      removeItem(item.productId);
    }
  };

  const increaseQuantity = (item) => {
    addItem({ ...item, quantity: 1 });
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{language === "TR" ? "Sepetim" : "My Cart"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cartItems.length === 0 ? (
          <p>{language === "TR" ? "Sepetiniz boş" : "Your cart is empty"}</p>
        ) : (
          <ul className="list-group">
            {cartItems.map((item) => (
              <li
                key={item.productId}
                className="list-group-item d-flex flex-wrap align-items-center justify-content-between"
                style={{ padding: "10px", borderRadius: "8px", gap: "10px" }}
              >
                {/* Görsel */}

                {/* İsim & Fiyat */}
                <div style={{ flex: "1 1 auto", minWidth: "120px" }}>
                  <div style={{ fontWeight: "600", fontSize: "14px" }}>
                    {language === "TR" ? item.name_TR : item.name_EN}
                  </div>
                  <div style={{ fontSize: "13px", color: "#666" }}>
                    {item.price.toFixed(2)} ₺
                  </div>
                </div>

                {/* Butonlar */}
                <div
                  className="d-flex align-items-center"
                  style={{ gap: "6px" }}
                >
                  <button
                    onClick={() => decreaseQuantity(item)}
                    style={btnStyle}
                  >
                    <FaMinus size={12} />
                  </button>
                  <div style={{ minWidth: "20px", textAlign: "center" }}>
                    {item.quantity}
                  </div>
                  <button
                    onClick={() => increaseQuantity(item)}
                    style={btnStyle}
                  >
                    <FaPlus size={12} />
                  </button>
                  <button
                    onClick={() => removeItem(item.productId)}
                    style={btnDangerStyle}
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Modal.Body>

      <Modal.Footer className="d-flex flex-wrap justify-content-between">
        <div className="mb-2">
          <strong>
            {language === "TR" ? "Toplam" : "Total"}: {totalPrice.toFixed(2)} ₺
          </strong>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

const btnStyle = {
  backgroundColor: "#e9ecef",
  border: "1px solid #ced4da",
  color: "#212529",
  borderRadius: "4px",
  width: "28px",
  height: "28px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
};

const btnDangerStyle = {
  ...btnStyle,
  backgroundColor: "#f8d7da",
  border: "1px solid #f5c6cb",
  color: "#721c24",
};

export default CartModal;

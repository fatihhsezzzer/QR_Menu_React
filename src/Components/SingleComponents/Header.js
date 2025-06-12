import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LanguageContext } from "../Context/LanguageContext";
import { useCart } from "../Context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import CartModal from "./CartModal";

const Header = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);
  const { cartItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);

  const isCategoryPage = location.pathname.startsWith("/kategori/");

  const handleClose = () => setShowCart(false);
  const handleShow = () => setShowCart(true);

  return (
    <header>
      <nav
        className="navbar navbar-expand-lg navbar-default"
        style={{
          backgroundColor: "#a3c49e",
          padding: "10px 15px",
          position: "fixed",
          top: 0,
          width: "100%",
          height: "50px",
          zIndex: 999,
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        }}
      >
        <div className="container d-flex justify-content-between align-items-center">
          {/* Sol taraf: Logo veya Menü */}
          <div className="navbar-header">
            {isCategoryPage ? (
              <div
                onClick={() => navigate("/menunew")}
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "16px",
                  cursor: "pointer",
                  marginLeft: "5px",
                }}
              >
                {"< Menü"}
              </div>
            ) : (
              <Link className="navbar-brand" to="/">
                <img
                  src="assets/img/mazina.png"
                  alt="Logo"
                  style={{ height: "60px", width: "60px", marginLeft: "40px" }}
                />
              </Link>
            )}
          </div>

          {/* Sağ Menü */}
          <div className="d-flex align-items-center">
            {/* Sepet Butonu */}
            <button
              onClick={handleShow}
              className="position-relative me-3 d-flex align-items-center justify-content-center"
              style={{
                color: "#fff",
                borderRadius: "20px",
                padding: "4px 10px",
                fontSize: "13px",
                fontWeight: "bold",
                outline: "none",
                boxShadow: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              <FaShoppingCart size={14} />
              <span className="ms-2">
                {language === "TR" ? "Sepet" : "Cart"}
              </span>

         
              {cartItems.length > 0 && (
                <span
                  className="position-absolute"
                  style={{
                    bottom: 0,
                    right: 7,
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "50%",
                    width: "12px",
                    height: "12px",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                  }}
                >
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Alerjenler */}
            <Link
              to="/allergens"
              className="text-white me-3"
              style={{
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              {language === "TR" ? "Alerjenler" : "Allergens"}
            </Link>

            {/* Dil Değiştirici */}
            <div
              className="d-flex align-items-center"
              onClick={toggleLanguage}
              style={{ cursor: "pointer" }}
            >
              <img
                src={`assets/img/flag-${language === "TR" ? "en" : "tr"}.png`}
                alt={language === "TR" ? "English" : "Türkçe"}
                style={{
                  width: "13px",
                  height: "13px",
                  marginRight: "5px",
                }}
              />
              <span
                className="text-white"
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {language === "TR" ? "English" : "Türkçe"}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Sepet Modal */}
      <CartModal show={showCart} handleClose={handleClose} />
    </header>
  );
};

export default Header;

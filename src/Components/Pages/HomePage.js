import React, { useState } from "react";
import { Link } from "react-router-dom";

const FullScreenModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Modalı aç/kapat
  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <div style={styles.container}>
      {/* Resme tıklayınca modal açılır */}
      <img
        src="/assets/img/Home-mazina.jpg"
        alt="Açılır görsel"
        style={styles.image}
        onClick={toggleModal}
      />

  
      <div style={styles.startText} onClick={toggleModal}>
        Menü için buraya tıklayın!
      </div>

      {/* Modal Açıkken */}
      {isOpen && (
        <div style={styles.modalOverlay} onClick={toggleModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {/* KAPATMA BUTONU */}
            <div
              onClick={() => setIsOpen(false)}
              style={{
                position: "absolute",
                top: "-10px",
                right: "-12px",
                background: "rgba(0,0,0,0.7)",
                color: "white",
                border: "none",
                borderRadius: "50%", 
                width: "31px !important", 
                height: "31px !important",
                minWidth: "31px", 
                minHeight: "31px",
                maxWidth: "31px",
                maxHeight: "31px",
                fontSize: "22px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✖
            </div>

         
            <Link to="/menu" style={styles.linkButton}>
              <button style={styles.mainButton}>MENÜ</button>
            </Link>

      
            <Link to="/feedback">
              <button style={styles.secondaryButton}>
                Bizi Değerlendirin / Review Us
              </button>
            </Link>

 

            <p style={styles.agreementText}>
              Platformumuzu kullanarak{" "}
              <Link
                to="/kullanici-sozlesmesi"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.agreementLink}
              >
                Kullanıcı Sözleşmesi
              </Link>{" "}
              ve{" "}
              <Link
                to="/aydinlatma-metni"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.agreementLink}
              >
                Aydınlatma Metni
              </Link>
              'ni okuduğunuzu ve kabul ettiğinizi beyan etmiş olursunuz.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// **CSS Tarzı Stiller**
const styles = {
  container: {
    width: "100vw",
    height: "100dvh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    position: "relative", 
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    cursor: "pointer",
  },
  startText: {
    position: "absolute",
    bottom: "55%", 
    width: "100%",
    textAlign: "center",
    fontSize: "28px", 
    fontFamily: "'Roboto', sans-serif", 
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: "2px",
    zIndex: 1, 
    animation: "growShrink 3s ease-in-out infinite",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    width: "80%",
    maxWidth: "400px",
    position: "relative",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "15px",
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
  },
  linkButton: {
    textDecoration: "none", 
  },
  mainButton: {
    width: "100%",
    padding: "15px",
    marginBottom: "10px",
    backgroundColor: "#a3c49e",
    color: "#fff",
    border: "none",
    borderRadius: "15px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  secondaryButton: {
    width: "100%",
    padding: "15px",
    marginBottom: "20px",
    backgroundColor: "#a3c49e",
    color: "#fff",
    border: "none",
    borderRadius: "15px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "3px",
    transition: "background-color 0.3s",
  },
  softanaText: {
    marginTop: "20px",
    fontSize: "15px",
    color: "#333",
    lineHeight: "1.6",
    textAlign: "center",
    padding: "0 10px",
  },

  softanaLink: {
    color: "#2F2C6A",
    fontWeight: "bold",
    textDecoration: "underline",
    transition: "color 0.3s ease",
  },

  agreementText: {
    marginTop: "12px",
    fontSize: "13px",
    color: "#666",
    lineHeight: "1.5",
    textAlign: "center",
    padding: "0 15px",
  },

  agreementLink: {
    color: "#2F2C6A",
    textDecoration: "underline",
    fontWeight: "500",
    transition: "color 0.3s ease",
  },

  businessText: {
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
  footerText: {
    fontSize: "12px",
    color: "#6c757d",
  },
};

export default FullScreenModal;

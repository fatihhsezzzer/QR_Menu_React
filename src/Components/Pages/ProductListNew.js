import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { LanguageContext } from "../Context/LanguageContext";
import Preloader from "../SingleComponents/Preloader";
import { Modal } from "react-bootstrap";

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replaceAll("ç", "c")
    .replaceAll("ğ", "g")
    .replaceAll("ı", "i")
    .replaceAll("ö", "o")
    .replaceAll("ş", "s")
    .replaceAll("ü", "u")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};

const CategoryDetail = () => {
  const { slug } = useParams();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  const fetchCategoryAndProducts = async () => {
    try {
      const categoryResponse = await axios.get(
        "https://api.mazina.com.tr/api/Category"
      );
      const allCategories = categoryResponse.data.$values || [];
      setCategories(allCategories);

      const matchedCategory = allCategories.find((cat) => {
        const name = language === "TR" ? cat.name_TR : cat.name_EN;
        return slugify(name) === slug;
      });

      if (matchedCategory) {
        setCategory(matchedCategory);

        const productResponse = await axios.get(
          "https://api.mazina.com.tr/api/Product"
        );
        const filteredProducts = (productResponse.data.$values || []).filter(
          (product) => product.categoryID === matchedCategory.categoryID
        );
        setProducts(filteredProducts);
      } else {
        setCategory(null);
        setProducts([]);
      }
    } catch (error) {
      console.error("Veriler alınırken hata oluştu:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchCategoryAndProducts().then(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <Preloader />;
  }

  const currentIndex = category
    ? categories.findIndex((c) => c.categoryID === category.categoryID)
    : -1;

  const prevCategory = currentIndex > 0 ? categories[currentIndex - 1] : null;
  const nextCategory =
    currentIndex < categories.length - 1 ? categories[currentIndex + 1] : null;

  const handlePrevCategory = () => {
    if (prevCategory) {
      const prevSlug = slugify(
        language === "TR" ? prevCategory.name_TR : prevCategory.name_EN
      );
      navigate(`/kategori/${prevSlug}`);
    }
  };

  const handleNextCategory = () => {
    if (nextCategory) {
      const nextSlug = slugify(
        language === "TR" ? nextCategory.name_TR : nextCategory.name_EN
      );
      navigate(`/kategori/${nextSlug}`);
    }
  };

  return (
    <div style={{ padding: "20px", marginTop: "20px" }}>
      {/* Üst Menü: Önceki - Mevcut - Sonraki */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "10px",
          backgroundColor: "#f8f8f8",
          padding: "8px 16px",
          borderRadius: "8px",
        }}
      >
        <button
          onClick={handlePrevCategory}
          style={{
            background: "none",
            border: "none",
            fontSize: "9px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            paddingLeft: "2px",
          }}
          disabled={!prevCategory}
        >
          {"< "}
          {prevCategory
            ? language === "TR"
              ? prevCategory.name_TR
              : prevCategory.name_EN
            : ""}
        </button>

        <span
          style={{ fontWeight: "bold", fontSize: "12px", marginLeft: "20px" }}
        >
          {category
            ? language === "TR"
              ? category.name_TR
              : category.name_EN
            : ""}
        </span>

        <button
          onClick={handleNextCategory}
          style={{
            background: "none",
            border: "none",
            fontSize: "9px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            paddingRight: "2px",
          }}
          disabled={!nextCategory}
        >
          {nextCategory
            ? language === "TR"
              ? nextCategory.name_TR
              : nextCategory.name_EN
            : ""}
          {" >"}
        </button>
      </div>

      {/* Ürün Listesi */}
      {category?.is_Drink ? (
        // İçecekler için liste
        <ul
          style={{
            paddingLeft: 0,
            listStyle: "none",
            marginTop: "20px",
          }}
        >
          {products.map((item) => (
            <li
              key={item.productId}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 16px",
                borderBottom: "1px solid #eee",
                background: "#fff",
                borderRadius: "6px",
                marginBottom: "10px",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              <span>{language === "TR" ? item.name_TR : item.name_EN}</span>
              <span style={{ fontWeight: "bold" }}>{item.price} ₺</span>
            </li>
          ))}
        </ul>
      ) : (
        // Yiyecekler için kart grid görünüm
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            marginTop: "20px",
            justifyContent: "center",
          }}
        >
          {products.map((item) => (
            <div
              key={item.productId}
              style={{
                width: "calc(50% - 6px)",
                backgroundColor: "#fff",
                borderRadius: "12px",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              onClick={() => {
                setSelectedFood(item);
                setShowModal(true);
              }}
            >
              <div
                style={{ width: "100%", height: "120px", overflow: "hidden" }}
              >
                <img
                  src={`https://api.mazina.com.tr${item.imagePath}`}
                  alt={language === "TR" ? item.name_TR : item.name_EN}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <div style={{ padding: "10px" }}>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  }}
                >
                  {language === "TR" ? item.name_TR : item.name_EN}
                </h3>

                <p
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    marginBottom: "5px",
                    minHeight: "40px",
                  }}
                >
                  {language === "TR"
                    ? item.description_TR
                    : item.description_EN}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  {Array.isArray(item.productAllergens?.$values) &&
                    item.productAllergens.$values.map((allergen, index) => (
                      <img
                        key={index}
                        src={`https://api.mazina.com.tr${allergen.imagePath}`}
                        alt={
                          language === "TR"
                            ? allergen.name_TR
                            : allergen.name_EN
                        }
                        title={
                          language === "TR"
                            ? allergen.name_TR
                            : allergen.name_EN
                        }
                        style={{
                          width: "20px",
                          height: "20px",
                          marginRight: "5px",
                          borderRadius: "50%",
                          border: "1px solid #ddd",
                          padding: "2px",
                          backgroundColor: "#f8f8f8",
                        }}
                      />
                    ))}
                </div>

                <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                  {item.price} ₺
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        {selectedFood && (
          <>
            <Modal.Body
              style={{ padding: "0", borderRadius: "10px", overflow: "hidden" }}
            >
              {/* ÜST KISIM: TAM GENİŞLİKTE GÖRSEL */}
              <div
                style={{ width: "100%", height: "250px", overflow: "hidden" }}
              >
                <img
                  src={`https://api.mazina.com.tr${selectedFood.imagePath}`}
                  alt={
                    language === "TR"
                      ? selectedFood.name_TR
                      : selectedFood.name_EN
                  }
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* ALT KISIM: ÜRÜN BİLGİLERİ */}
              <div
                style={{
                  padding: "20px",
                  textAlign: "center",
                  backgroundColor: "#fff",
                }}
              >
                <h3
                  style={{
                    fontWeight: "bold",
                    marginBottom: "10px",
                    color: "#333",
                  }}
                >
                  {language === "TR"
                    ? selectedFood.name_TR
                    : selectedFood.name_EN}
                </h3>

                <p
                  style={{
                    fontSize: "16px",
                    color: "#666",
                    marginBottom: "15px",
                  }}
                >
                  {language === "TR"
                    ? selectedFood.description_TR
                    : selectedFood.description_EN}
                </p>

                {/* ALERJEN BİLGİLERİ */}
                <div className="allergens" style={{ marginBottom: "15px" }}>
                  {Array.isArray(selectedFood.productAllergens?.$values) &&
                  selectedFood.productAllergens.$values.length > 0 ? (
                    selectedFood.productAllergens.$values.map(
                      (allergen, index) => (
                        <span
                          key={index}
                          style={{ display: "inline-block", margin: "5px" }}
                        >
                          <img
                            src={`https://api.mazina.com.tr${allergen.imagePath}`}
                            alt={
                              language === "TR"
                                ? allergen.name_TR
                                : allergen.name_EN
                            }
                            title={
                              language === "TR"
                                ? allergen.name_TR
                                : allergen.name_EN
                            }
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              border: "1px solid #ddd",
                              padding: "3px",
                              backgroundColor: "#f8f8f8",
                            }}
                          />
                        </span>
                      )
                    )
                  ) : (
                    <p style={{ fontSize: "14px", color: "#999" }}>
                      {language === "TR"
                        ? "Alerjen bilgisi yok."
                        : "No allergen information."}
                    </p>
                  )}
                </div>

                {/* FİYAT BİLGİSİ */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "15px",
                    paddingLeft: "10px",
                  }}
                >
                  <strong
                    style={{
                      fontSize: "20px",
                      background: "#062c2c",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      display: "inline-block",
                      fontWeight: "bold",
                      boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    {selectedFood.price} ₺
                  </strong>
                </div>
              </div>
            </Modal.Body>

            {/* KAPATMA BUTONU */}
            <div
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "rgba(0,0,0,0.7)",
                color: "white",
                border: "none",
                borderRadius: "50%", // TAM YUVARLAK OLMASI İÇİN
                width: "40px !important", // Genişliği zorlamak için
                height: "40px !important", // Yüksekliği zorlamak için
                minWidth: "40px", // Başka bir CSS dosyasından genişlik almasını önlemek için
                minHeight: "40px",
                maxWidth: "40px",
                maxHeight: "40px",
                fontSize: "22px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✖
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default CategoryDetail;

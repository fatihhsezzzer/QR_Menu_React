import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { LanguageContext } from "../Context/LanguageContext";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Modal } from "react-bootstrap"; // React Bootstrap Modal bileşeni
import { useCart } from "../Context/CartContext";
import ToastMessage from "../Common/ToastMessage"; // doğru yolu gir
import Preloader from "./Preloader";

const FoodCategory = () => {
  const [categories, setCategories] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const categoryRefs = useRef({});
  const { addItem, cartItems } = useCart();

  const { language } = useContext(LanguageContext);

  const sectionRef = useRef(null);

  const scrollToContent = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  // Kategorileri çek
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://api.mazina.com.tr/api/Category"
      );
      const sortedCategories = (response.data.$values || [])
        .filter((category) => category.is_Active)
        .sort((a, b) => a.sortOrder - b.sortOrder);
      setCategories(sortedCategories);
    } catch (error) {
      console.error("Kategoriler alınırken hata oluştu:", error);
    }
  };
  const getCombinedProducts = () => {
    const full = foodCategories.filter((p) => !p.halfPortionOf && !p.whatOf); // Ne yarım ne alternatif
    const half = foodCategories.filter((p) => p.halfPortionOf);
    const alternatives = foodCategories.filter((p) => p.whatOf); // Alternatif ürünler

    return full.map((item) => {
      const matchedHalf = half.find(
        (h) => Number(h.halfPortionOf) === Number(item.productId)
      );
      const matchedAlternatives = alternatives.filter(
        (alt) => Number(alt.whatOf) === Number(item.productId)
      );
      return {
        ...item,
        halfPortionPrice: matchedHalf?.price || null,
        alternatives: matchedAlternatives,
      };
    });
  };

  // Ürünleri çek
  const fetchFoodCategories = async () => {
    try {
      const response = await axios.get(
        "https://api.mazina.com.tr/api/Product/active"
      );
      const sortedProducts = (response.data.$values || []).sort(
        (a, b) => a.sortOrder - b.sortOrder
      );
      setFoodCategories(sortedProducts);
    } catch (error) {
      console.error("Ürünler alınırken hata oluştu:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCategories();
        await fetchFoodCategories();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleCategory = (categoryId) => {
    setOpenCategory((prevCategory) => {
      const newCategory = prevCategory === categoryId ? null : categoryId;

 
      setTimeout(() => {
        if (newCategory && categoryRefs.current[newCategory]) {
          categoryRefs.current[newCategory].scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

        
          setTimeout(() => {
            window.scrollBy({
              top: -50, 
              behavior: "smooth",
            });
          }, 400); 
        }
      }, 100);
      return newCategory;
    });
  };

  const openFoodModal = (food) => {
    setSelectedFood(food);
    setShowModal(true);
  };
  if (loading) {
    return <Preloader></Preloader>;
  }

  return (
    <div className="food-category-area default-padding bottom-less">
      {toastVisible && (
        <ToastMessage
          messageKey={toastMessage}
          onClose={() => setToastVisible(false)}
        />
      )}

      {/* === MENÜ İÇERİĞİ === */}
      <div
        ref={sectionRef}
        className="container"
        style={{ paddingTop: "80px" }}
      >
        {categories.map((category) => (
          <div
            key={category.categoryID}
            ref={(el) => (categoryRefs.current[category.categoryID] = el)}
          >
            <div
              className="category-header"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "12px",
                height:
                  openCategory === category.categoryID ? "200px" : "100px", // 👈 burada değişim oluyor

                cursor: "pointer",
                padding: "20px",
                borderBottom: "1px solid #ddd",
                fontWeight: "bold",
                backgroundImage: `url(https://api.mazina.com.tr${category.imagePath})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                color: "white",
                textShadow: "0px 0px 10px black",
                borderRadius: "10px",
              }}
              onClick={() => toggleCategory(category.categoryID)}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                {category.is_New && (
                  <span
                    style={{
                      fontStyle: "italic",
                      fontWeight: "bold",
                      color: "lightgray",
                    }}
                  >
                    {language === "TR" ? "yeni" : "new"}
                  </span>
                )}
                <span>
                  {language === "TR" ? category.name_TR : category.name_EN}
                </span>
              </div>
              {openCategory === category.categoryID ? (
                <FaChevronUp size={20} />
              ) : (
                <FaChevronDown size={20} />
              )}
            </div>

            {openCategory === category.categoryID &&
              (category.is_Drink ? (
                // İçecekler için basit liste
                <ul
                  className="drink-list"
                  style={{ paddingLeft: 0, listStyle: "none" }}
                >
                  {foodCategories
                    .filter((item) => item.categoryID === category.categoryID)
                    .map((item) => (
                      <li
                        key={item.productId}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "12px 16px",
                          borderBottom: "1px solid #eee",
                          background: "#fff",
                          borderRadius: "6px",
                          marginBottom: "10px",
                        }}
                      >
                     
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <span style={{ fontWeight: "bold" }}>
                            {language === "TR" ? item.name_TR : item.name_EN}
                          </span>
                          <span style={{ fontWeight: "bold" }}>
                            {item.price} ₺
                          </span>
                        </div>

                        {/* Alt satır: Açıklama + Buton */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: "4px",
                            flexWrap: "wrap",
                            gap: "10px",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "13px",
                              color: "#666",
                              margin: 0,
                              flex: 1,
                            }}
                          >
                            {language === "TR"
                              ? item.description_TR
                              : item.description_EN}
                          </p>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addItem({
                                productId: item.productId,
                                name_TR: item.name_TR,
                                name_EN: item.name_EN,
                                price: item.price,
                                imagePath: item.imagePath,
                                quantity: 1,
                              });
                              setToastMessage("product_added");
                              setToastVisible(true);
                            }}
                            style={{
                              backgroundColor: "#a3c49e",
                              color: "#fff",
                              border: "none",
                              borderRadius: "20px",
                              padding: "6px 14px",
                              fontSize: "14px",
                              fontWeight: "bold",
                              cursor: "pointer",
                              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                            }}
                          >
                            {language === "TR" ? "Ekle" : "Add to Cart"}
                          </button>
                        </div>
                      </li>
                    ))}
                </ul>
              ) : (
                // Yiyecekler için grid kart görünümü
                <div className="row">
                  {getCombinedProducts()
                    .filter((item) => item.categoryID === category.categoryID)
                    .map((item) => (
                      <div
                        className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6"
                        key={item.productId}
                      >
                        <div
                          className="food-category-item"
                          style={{ position: "relative", cursor: "pointer" }}
                        >
                          <div className="thumb">
                            <img
                              loading="lazy"
                              src={`https://api.mazina.com.tr${item.imagePath}`}
                              alt={
                                language === "TR" ? item.name_TR : item.name_EN
                              }
                              onClick={() => openFoodModal(item)} // Resme tıklanınca modal açılıyor
                              style={{
                                width: "100%", // Veya sabit bir piksel değeri
                              }}
                            />
                          </div>

                          <div className="info">
                            <h3 className="marcellus-title">
                              {language === "TR" ? item.name_TR : item.name_EN}
                            </h3>
                            <p>
                              {language === "TR"
                                ? item.description_TR
                                : item.description_EN}
                            </p>

                            <div className="allergens">
                              {Array.isArray(item.productAllergens?.$values) &&
                              item.productAllergens.$values.length > 0 ? (
                                item.productAllergens.$values.map(
                                  (allergen, index) => (
                                    <span
                                      key={index}
                                      className="allergen"
                                      style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        marginRight: "0px",
                                      }}
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
                                          width: "23px",
                                          height: "23px",
                                          marginRight: "5px",
                                          borderRadius: "50%",
                                        }}
                                      />
                                    </span>
                                  )
                                )
                              ) : (
                                <p>
                                  {language === "TR"
                                    ? "Alerjen bilgisi yok."
                                    : "No allergen information."}
                                </p>
                              )}
                            </div>

                            <div className="price">
                              {item.halfPortionPrice ? (
                                <>
                                  <div
                                    style={{ fontSize: "14px", color: "#000" }}
                                  >
                                    <strong>
                                      {item.price} ₺
                                      {language === "TR"
                                        ? " : Tam Porsiyon"
                                        : " : Full Portion"}{" "}
                                    </strong>
                                  </div>
                                  <div
                                    style={{
                                      fontSize: "14px",
                                      color: "#000",
                                      marginTop: "4px",
                                    }}
                                  >
                                    <strong>
                                      {item.halfPortionPrice} ₺
                                      {language === "TR"
                                        ? " : Yarım Porsiyon"
                                        : " : Half Portion"}{" "}
                                    </strong>
                                  </div>
                                </>
                              ) : (
                                <strong
                                  style={{ fontSize: "14px", color: "#000" }}
                                >
                                  {item.price} ₺
                                </strong>
                              )}
                            </div>
                            {item.alternatives &&
                              item.alternatives.length > 0 && (
                                <>
                                  {item.alternatives.map((alt, index) => (
                                    <div
                                      key={index}
                                      style={{
                                        fontSize: "14px",
                                        color: "#000",
                                        marginTop: "4px",
                                      }}
                                    >
                                      <strong>
                                        {alt.price} ₺{" "}
                                        {language === "TR"
                                          ? `: ${alt.whatIs_TR}`
                                          : `: ${alt.whatIs_EN}`}
                                      </strong>
                                    </div>
                                  ))}
                                </>
                              )}
                            <div
                              style={{ marginTop: "10px", textAlign: "center" }}
                            >
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addItem({
                                    productId: item.productId,
                                    name_TR: item.name_TR,
                                    name_EN: item.name_EN,
                                    price: item.price,
                                    imagePath: item.imagePath,
                                    quantity: 1,
                                  });
                                  setToastMessage("product_added");
                                  setToastVisible(true);
                                }}
                                style={{
                                  backgroundColor: "#a3c49e",
                                  color: "#fff",
                                  border: "none",
                                  borderRadius: "20px",
                                  padding: "6px 14px",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  cursor: "pointer",
                                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                                }}
                              >
                                {language === "TR" ? "Ekle" : "Add to Cart"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
          </div>
        ))}
      </div>

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

             
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "20px",
                    padding: "0 20px",
                    gap: "10px",
                  }}
                >
                  <strong
                    style={{
                      fontSize: "20px",
                      background: "#062c2c",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      fontWeight: "bold",
                      boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    {selectedFood.price} ₺
                  </strong>

                  <button
                    onClick={() => {
                      addItem({
                        productId: selectedFood.productId,
                        name_TR: selectedFood.name_TR,
                        name_EN: selectedFood.name_EN,
                        price: selectedFood.price,
                        imagePath: selectedFood.imagePath,
                        quantity: 1,
                      });
                      setToastMessage("product_added");
                      setToastVisible(true);
                      setShowModal(false); // opsiyonel
                    }}
                    style={{
                      backgroundColor: "#062c2c",
                      color: "#fff",
                      border: "none",
                      borderRadius: "20px",
                      padding: "8px 16px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    {language === "TR" ? "Sepete Ekle" : "Add to Cart"}
                  </button>
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
                background: "#fff", 
                color: "#000", 
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                fontSize: "22px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)", 
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

export default FoodCategory;

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { LanguageContext } from "../Context/LanguageContext";

const AllergenList = () => {
  const { language } = useContext(LanguageContext); // Dil bilgisini al
  const [allergens, setAllergens] = useState([]);

  // Alerjenleri backend'den çek
  const fetchAllergens = async () => {
    try {
      const response = await axios.get(
        "https://api.mazina.com.tr/api/Allergen"
      );
      setAllergens(response.data.$values || []);
    } catch (error) {
      console.error("Alerjenler alınırken hata oluştu:", error);
    }
  };

  useEffect(() => {
    fetchAllergens();
  }, []);

  return (
    <div style={{ paddingBottom: "50px" }} className="container mt-5">
      <h2 style={{ fontWeight: "bold", marginBottom: "20px" }}>
        {language === "TR" ? "ALERJEN TABLOSU" : "ALLERGEN TABLE"}
      </h2>
      <p style={{ marginBottom: "30px", fontSize: "16px", color: "#555" }}>
        {language === "TR"
          ? "Siparişinizi verirken, sağlığınızın güvenliği için ürünlerin yanında yer alan alerjen ikonlarını dikkate almanız rica ederiz."
          : "When placing your order, please pay attention to the allergen icons next to the products for your safety."}
      </p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {allergens.map((allergen) => (
          <li
            key={allergen.allergenId}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <img
              src={`https://api.mazina.com.tr${allergen.imagePath}`} // Resim yolu
              alt={language === "TR" ? allergen.name_TR : allergen.name_EN}
              style={{
                width: "40px",
                height: "40px",
                marginRight: "15px",
                borderRadius: "50%",
              }}
            />
            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
              {language === "TR" ? allergen.name_TR : allergen.name_EN}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllergenList;

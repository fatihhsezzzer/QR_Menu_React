import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../Context/LanguageContext";
import Preloader from "../SingleComponents/Preloader";

// küçük bir slugify fonksiyonu
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
    .replace(/\s+/g, "-") // sadece tek \ olacak!
    .replace(/[^a-z0-9-]/g, "");
};

const FoodCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);

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

  useEffect(() => {
    const fetchData = async () => {
      await fetchCategories();
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          height: "50vh",
          width: "100%",
          backgroundImage: "url('/assets/img/banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textShadow: "0 0 10px black",
          marginBottom: "20px",
        }}
      ></div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        {categories.map((category) => {
          const size = category.size || 1;
          const width =
            size === 1
              ? "calc(50% - 6px)"
              : size === 2
              ? "100%"
              : size === 4
              ? "100%"
              : "calc(50% - 6px)";
          const height = size === 4 ? "200px" : "110px";

          // SLUG oluştur
          const slug = slugify(
            language === "TR" ? category.name_TR : category.name_EN
          );

          return (
            <div
              key={category.categoryID}
              style={{
                width,
                borderRadius: "12px",
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
                transition: "transform 0.3s ease",
                height,
              }}
              onClick={() => navigate(`/kategori/${slug}`)}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.02)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img
                src={`https://api.mazina.com.tr${category.imagePath}`}
                alt={language === "TR" ? category.name_TR : category.name_EN}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(70%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "16px",
                  textAlign: "center",
                }}
              >
                {language === "TR" ? category.name_TR : category.name_EN}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FoodCategory;

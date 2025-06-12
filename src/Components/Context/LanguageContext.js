import React, { createContext, useState } from "react";

// Context oluşturma
export const LanguageContext = createContext();

// Context Provider
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("TR"); // Varsayılan dil: Türkçe

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "TR" ? "EN" : "TR")); // TR ve EN arasında geçiş
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

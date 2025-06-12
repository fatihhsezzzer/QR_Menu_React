import React, { createContext, useState } from "react";


export const LanguageContext = createContext();


export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("TR"); 

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "TR" ? "EN" : "TR")); 
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

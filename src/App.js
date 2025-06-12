import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Menu from "./Components/Pages/Menu";
import AllergenList from "./Components/Pages/Allergens";
import { LanguageProvider } from "./Components/Context/LanguageContext"; // Context'i import edin
import { CartProvider } from "./Components/Context/CartContext";
import Header from "./Components/SingleComponents/Header";
import HomePage from "./Components/Pages/HomePage";
import FeedbackPage from "./Components/Pages/FeedbackPage";
import LegalDocuments from "./Components/Pages/LeagalDoc";
import AydinlatmaMetni from "./Components/Pages/AydinlatmaMetni";

import MenuNew from "./Components/Pages/MenuNew";
import ProductListNew from "./Components/Pages/ProductListNew";

function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        {" "}
        {/* ✅ CartProvider'ı da dahil ettik */}
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </LanguageProvider>
  );
}

function AppContent() {
  const location = useLocation(); // Mevcut URL yolunu almak için

  return (
    <div className="App bg-light">
      {/* Eğer "/"" değilse Header'ı göster */}
      {location.pathname !== "/" && <Header />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/allergens" element={<AllergenList />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/kullanici-sozlesmesi" element={<LegalDocuments />} />
        <Route path="/aydinlatma-metni" element={<AydinlatmaMetni />} />
        <Route path="/menunew" element={<MenuNew />} />
        <Route path="/kategori/:slug" element={<ProductListNew />} />
      </Routes>
    </div>
  );
}

export default App;

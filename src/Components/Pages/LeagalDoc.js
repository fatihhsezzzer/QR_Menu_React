import React from "react";

const LegalDocuments = () => {
  return (
    <div
      style={{
        marginTop: "50px",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        color: "#333",
      }}
    >
      <h2 style={{ color: "#2F2C6A" }}>Kullanıcı Sözleşmesi</h2>
      <p>
        <strong>Yürürlük Tarihi:</strong> 09.04.2025
      </p>

      <p>
        Lütfen bu platformu kullanmadan önce aşağıdaki kullanıcı sözleşmesini
        dikkatlice okuyunuz. Bu platforma erişiminiz ve kullanmanız, bu
        sözleşmeyi okuduğunuz ve kabul ettiğiniz anlamına gelir.
      </p>

      <h4>1. Taraflar</h4>
      <p>
        İşbu Kullanıcı Sözleşmesi ("Sözleşme"), [SOFTANA] ("Hizmet Sağlayıcı")
        ile platforma erişen kullanıcı ("Kullanıcı") arasında akdedilmiştir.
      </p>

      <h4>2. Hizmet Tanımı</h4>
      <p>
        Hizmet Sağlayıcı, kullanıcılara QR kod aracılığıyla dijital menü hizmeti
        sunmaktadır. İşletmeler, menülerini bu sistem üzerinde oluşturabilir,
        güncelleyebilir ve müşterilerle paylaşabilir.
      </p>

      <h4>3. Kullanım Koşulları</h4>
      <ul>
        <li>Kullanıcılar, sağladıkları bilgilerin doğruluğundan sorumludur.</li>
        <li>QR menü hizmeti yalnızca yasal amaçlar için kullanılabilir.</li>
        <li>
          Platformun işleyişine zarar verecek herhangi bir faaliyette
          bulunulamaz.
        </li>
      </ul>

      <h4>4. Fikri Mülkiyet Hakları</h4>
      <p>
        Tüm içerikler (yazılım, tasarım, logo, metin vb.), Hizmet Sağlayıcıya
        aittir. İzinsiz kopyalanamaz ve kullanılamaz.
      </p>

      <h4>5. Sözleşme Değişiklikleri</h4>
      <p>
        Hizmet Sağlayıcı, sözleşme hükümlerini dilediği zaman güncelleyebilir.
        Değişiklikler, platformda yayınlandığı tarihten itibaren geçerlidir.
      </p>

      <h4>6. Yürürlük</h4>
      <p>
        Bu sözleşme, kullanıcı tarafından kabul edilmesiyle yürürlüğe girer.
      </p>
    </div>
  );
};

export default LegalDocuments;

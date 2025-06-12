import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const googleReviewUrl = "https://g.page/r/CSTQwsl9WegHEBE/review"; // Google yorum linkin

  const submitFeedback = async () => {
    if (rating === 0) return alert("Lütfen bir memnuniyet derecesi seçin.");

    try {
      await axios.post("https://api.mazina.com.tr/api/feedback", {
        rating,
        phoneNumber: phone,
        comment,
      });
      setSubmitted(true);

      if (rating === 4) {
        window.location.href = googleReviewUrl;
      }
    } catch (err) {
      alert("Bir hata oluştu.");
    }
  };

  const handleGoogleReviewClick = () => {
    window.location.href = googleReviewUrl;
  };

  if (submitted)
    return (
      <div className="feedback-success">
        <h2>Teşekkürler!</h2>
        <p>Geri bildiriminiz kaydedildi.</p>

        <Link
          to="/"
          className="submit-btn"
          style={{ marginTop: "20px", display: "inline-block" }}
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    );

  return (
    <div className="feedback-container">
      <h2 className="feedback-title">
        ALDIĞINIZ HİZMETTEN MEMNUN KALDINIZ MI?
      </h2>
      <div className="emoji-row">
        {[1, 2, 3, 4].map((num) => (
          <button
            key={num}
            className={`emoji-btn ${rating === num ? "selected" : ""}`}
            onClick={() => setRating(num)}
          >
            {["😠", "😐", "🙂", "😄"][num - 1]}
          </button>
        ))}
      </div>

      {rating > 0 && (
        <p className="feedback-label">
          {
            [
              "Hiç memnun kalmadım!",
              "Memnun kalmadım",
              "Memnunum",
              "Çok memnunum",
            ][rating - 1]
          }
        </p>
      )}

      {/* 1-2-3 seçildiyse inputlar görünür */}
      {rating > 0 && rating < 4 && (
        <>
          <input
            type="tel"
            className="feedback-input"
            placeholder="Cep Telefonu Numaranız (Geri Dönüş İçin)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <textarea
            className="feedback-textarea"
            placeholder="Görüşlerinizi bizimle paylaşın."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </>
      )}

      <button onClick={submitFeedback} className="submit-btn">
        DEĞERLENDİRMEYİ GÖNDER
      </button>
    </div>
  );
};

export default FeedbackForm;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ThankYou.css";

const ThankYou = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate("/"), 5000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <section className="thankyou-section">
      <div className="thankyou-container">
        <h2>Thank You!</h2>
        <p>Your complaint has been submitted successfully.</p>
        <p>Our team will review it and assign a worker shortly. You'll be notified about the progress.</p>
      </div>
    </section>
  );
};

export default ThankYou;

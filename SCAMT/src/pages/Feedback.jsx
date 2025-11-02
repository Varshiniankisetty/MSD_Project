import React, { useState } from "react";
import axios from "axios";
import "./Feedback.css";

const Feedback = () => {
  const [form, setForm] = useState({
    name: "",
    flat: "",
    block: "",
    rating: "",
    message: "",
  });
  const [charCount, setCharCount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.rating) {
      alert("Please select a rating.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("You must be logged in to submit feedback.");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/feedback",
        {
          message: form.message,
          rating: form.rating,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Feedback saved:", res.data);
      alert("✅ Feedback submitted. Thank you!");
      setForm({ name: "", flat: "", block: "", rating: "", message: "" });
      setCharCount(0);
    } catch (err) {
      console.error("Feedback submission error:", err);
      alert("❌ Failed to submit feedback. Please try again.");
    }
  };

  return (
    <section className="feedback-section">
      <div className="feedback-container">
        <h2>Share Your Feedback</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Your Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="input-group">
            <label>Flat Number</label>
            <input
              value={form.flat}
              onChange={(e) => setForm({ ...form, flat: e.target.value })}
              required
            />
          </div>

          <div className="input-group">
            <label>Block</label>
            <input
              value={form.block}
              onChange={(e) => setForm({ ...form, block: e.target.value })}
              required
            />
          </div>

          <div className="input-group">
            <label>Rate Our Service</label>
            <select
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
              required
            >
              <option value="">-- Select Rating --</option>
              <option value="5">Excellent</option>
              <option value="4">Good</option>
              <option value="3">Average</option>
              <option value="2">Poor</option>
              <option value="1">Very Poor</option>
            </select>
          </div>

          <div className="input-group">
            <label>Your Feedback</label>
            <textarea
              value={form.message}
              onChange={(e) => {
                setForm({ ...form, message: e.target.value });
                setCharCount(e.target.value.length);
              }}
              maxLength={250}
              required
            />
            <div className="char-count">{charCount} / 250</div>
          </div>

          <button className="btn-submit" type="submit">
            Submit Feedback
          </button>
        </form>
      </div>
    </section>
  );
};

export default Feedback;

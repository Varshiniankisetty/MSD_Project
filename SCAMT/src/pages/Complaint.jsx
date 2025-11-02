import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Complaint.css";

const Complaint = () => {
  const [form, setForm] = useState({
    flat: "",
    service: "",
    other: "",
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file only.');
        return;
      }
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB.');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken"); // user auth token
      if (!token) {
        alert("You must be logged in to file a complaint.");
        return;
      }

      const formData = new FormData();
      formData.append('flat', form.flat);
      formData.append('service', form.service);
      if (form.service === 'other') {
        formData.append('other', form.other);
      }
      formData.append('description', form.description);
      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      const res = await axios.post(
        "http://localhost:5000/api/complaints",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Complaint saved:", res.data);

      // Optional progress animation
      let p = 0;
      const id = setInterval(() => {
        p += 10;
        setProgress(p);
        if (p >= 100) {
          clearInterval(id);
          alert("✅ Complaint submitted successfully!");
          setForm({ flat: "", service: "", other: "", description: "" });
          setSelectedFile(null);
          setProgress(0);
          navigate("/thankyou");
        }
      }, 100);
    } catch (err) {
      console.error("Complaint submission error:", err);
      alert("❌ Failed to submit complaint. Please try again.");
    }
  };

  return (
    <section className="complaint-section">
      <div className="complaint-container">
        <h2>File a Complaint</h2>
        <form id="complaint-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Flat Number</label>
            <input
              value={form.flat}
              onChange={(e) => setForm({ ...form, flat: e.target.value })}
              required
            />
          </div>

          <div className="input-group">
            <label>Complaint Type</label>
            <select
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              required
            >
              <option value="">-- Select Complaint Type --</option>
              <option value="plumbing">Plumbing Work</option>
              <option value="electrical">Electrical Work</option>
              <option value="carpentry">Carpentry Work</option>
              <option value="cleaning">Cleaning</option>
              <option value="security">Security Issue</option>
              <option value="other">Other</option>
            </select>
          </div>

          {form.service === "other" && (
            <div className="input-group">
              <label>If Other, Specify</label>
              <input
                value={form.other}
                onChange={(e) => setForm({ ...form, other: e.target.value })}
                required
              />
            </div>
          )}

          <div className="input-group">
            <label>Description</label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            />
          </div>

          <div className="input-group">
            <label>Upload Image (Optional)</label>
            <div className="file-upload-container">
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
              />
              <label htmlFor="file-upload" className="file-upload-label">
                {selectedFile ? selectedFile.name : "Choose an image file"}
              </label>
              {selectedFile && (
                <div className="file-preview">
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Preview"
                    className="image-preview"
                  />
                  <button
                    type="button"
                    className="remove-file"
                    onClick={() => setSelectedFile(null)}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
            <small className="file-hint">Supported formats: JPG, PNG, GIF. Max size: 5MB</small>
          </div>

          <button type="submit" className="btn-submit">
            Submit Complaint
          </button>
        </form>

        <div className="static-progress">
          <h3>Worker Assignment</h3>
          <p>
            Worker will be assigned after submission and progress will be
            updated by admin.
          </p>
          <div
            className="progress-bar"
            style={{
              background: "#ddd",
              width: "100%",
              height: "20px",
              borderRadius: 5,
            }}
          >
            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "green",
                borderRadius: 5,
              }}
            ></div>
          </div>
          <p>{progress}% Completed</p>
        </div>
      </div>
    </section>
  );
};

export default Complaint;

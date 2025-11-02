import React, { useState, useEffect } from "react";
import { getServices } from '../utils/apiUtils';
import { useNavigate } from 'react-router-dom';
import "./Services.css";

const Services = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getServices();
        setServices(data);
      } catch (err) {
        setError('Failed to load services. Please try again later.');
        console.error('Error fetching services:', err);
        // Fallback to hardcoded services if API fails
        setServices([
          {
            title: "Complaint Management",
            desc: "Register, track, and resolve complaints with real-time updates and auto-assignment.",
            path: "/complaint"
          },
          {
            title: "Maintenance Scheduling",
            desc: "Plan preventive maintenance to keep your community facilities in top condition."
          },
          {
            title: "Voice Call Alerts",
            desc: "Send automated voice updates for workers and residents who prefer calls over messages.",
            path: "/VoiceCallAlerts"
          },
          {
            title: "Analytics Dashboard",
            desc: "Gain insights into complaints, staff performance, and service timelines with reports."
          },
          {
            title: "Role-Based Access",
            desc: "Secure and simple login tailored for residents, workers, and administrators."
          },
          {
            title: "QR Code Access",
            desc: "Scan QR codes placed in your building to instantly lodge complaints without hassle."
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section className="services-section">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div className="loading-spinner">Loading services...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error && services.length === 0) {
    return (
      <section className="services-section">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="services-section">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">
          Simplifying community living with smart solutions
        </p>
        <div className="services-grid">
          {services.map((s, i) => (
            <div
              className="service-card"
              key={i}
              onClick={() => {
                if (s.path) {
                  navigate(s.path);
                } else {
                  alert(`No page set for "${s.title}" yet`);
                }
              }}
            >
              <div className="service-icon">⚡</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

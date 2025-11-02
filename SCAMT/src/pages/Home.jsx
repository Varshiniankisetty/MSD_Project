import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Home.css";

const Home = () => {
  const text = "Welcome to CommUnityCare";
  const [typed, setTyped] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    text.split("").forEach((char, i) => {
      setTimeout(() => {
        setTyped(prev => prev + char);
      }, 100 * i);
    });
  }, [text]);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/services");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <section className="hero-section">
        <div className="hero-overlay">
          <h2 id="welcome-text" className="typing">{typed}</h2>
          <p>
            A modern apartment management platform that connects residents, management,
            and maintenance teams for seamless community living and efficient issue resolution.
          </p>
          <button className="get-started-btn" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </section>

      <section className="about-section">
        <h2>Building Better Communities</h2>
        <p>
          CommUnityCare transforms apartment living by providing a comprehensive platform
          for residents to report issues, track maintenance requests, and stay connected
          with their community. Our smart system ensures that every concern is addressed
          promptly and efficiently.
        </p>
        <p>
          Property managers benefit from streamlined workflows, automated notifications,
          and detailed analytics that help optimize building operations. Maintenance teams
          receive real-time alerts and can update residents instantly on progress.
        </p>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 style={{textAlign: 'center', marginBottom: '3rem', color: 'var(--apartment-slate)'}}>
            Why Choose CommUnityCare?
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '2rem'
          }}>
            <div className="feature-card">
              <div style={{
                background: 'linear-gradient(135deg, var(--secondary-color) 0%, var(--apartment-sage) 100%)',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <span style={{color: 'white', fontSize: '1.5rem'}}>🏠</span>
              </div>
              <h3>Smart Home Management</h3>
              <p>Effortlessly manage apartment maintenance requests, complaints, and community announcements from a single dashboard.</p>
            </div>

            <div className="feature-card">
              <div style={{
                background: 'linear-gradient(135deg, var(--apartment-terracotta) 0%, var(--accent-color) 100%)',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <span style={{color: 'white', fontSize: '1.5rem'}}>⚡</span>
              </div>
              <h3>Real-Time Updates</h3>
              <p>Get instant notifications when your requests are updated, ensuring you're always in the loop about your community's maintenance needs.</p>
            </div>

            <div className="feature-card">
              <div style={{
                background: 'linear-gradient(135deg, var(--success-color) 0%, var(--apartment-sage) 100%)',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <span style={{color: 'white', fontSize: '1.5rem'}}>👥</span>
              </div>
              <h3>Community Connection</h3>
              <p>Build stronger community bonds through transparent communication and collaborative problem-solving.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

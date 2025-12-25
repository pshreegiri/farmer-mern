// src/components/Landing.jsx
import "./Landing.css";
import { useNavigate } from "react-router-dom";

// import farmer image
import farmerImg from "../assets/images/farmer.jpg";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-left">
          <h1 className="hero-title">
            🌾 Farmer AI Compliance And Disease Alert System (F-ACDA)
          </h1>

          <p className="hero-subtitle">
            AI-powered Crop Disease Detection aligned with Government Advisory
          </p>

          <p className="hero-text">
            F-ACDA helps farmers detect crop diseases at an early stage using
            Artificial Intelligence. By uploading a crop image, farmers receive
            disease insights, risk levels, and <strong>government-approved
            preventive measures</strong> in simple and understandable language.
          </p>

          <button className="hero-btn" onClick={() => navigate("/home")}>
            Get Started 🚀
          </button>
        </div>

        <div className="hero-right">
          <img
            src={farmerImg}
            alt="Farmer using mobile technology"
            className="hero-image"
          />
          <p className="hero-image-caption">
            Trusted AI guidance for safe and compliant farming
          </p>
        </div>
      </section>

      {/* WHY F-ACDA */}
      <section className="section light">
        <h2 className="section-title">Why Farmers Need F-ACDA</h2>

        <div className="info-grid">
          <div className="info-card">✔ Early disease detection to reduce crop loss</div>
          <div className="info-card">✔ Recommendations aligned with government guidelines</div>
          <div className="info-card">✔ Avoids unsafe or unverified farming practices</div>
          <div className="info-card">✔ Easy to use for non-technical farmers</div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section dark">
        <h2 className="section-title">How F-ACDA Works</h2>

        <div className="steps">
          <div className="step-card">
            <span className="step-icon">📸</span>
            <h3>Step 1: Upload Crop Image</h3>
            <p>
              The farmer uploads a clear photo of the affected crop leaf.
              This image is used for disease identification.
            </p>
          </div>

          <div className="step-card">
            <span className="step-icon">🧠</span>
            <h3>Step 2: AI Disease Detection</h3>
            <p>
              The AI model analyzes visual symptoms like spots,
              discoloration, or fungal patterns.
            </p>
          </div>

          <div className="step-card">
            <span className="step-icon">📜</span>
            <h3>Step 3: Government Advisory Validation</h3>
            <p>
              The detected disease is matched with official agricultural
              advisory rules to ensure safe and approved guidance.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT FARMER RECEIVES */}
      <section className="section light">
        <h2 className="section-title">What the Farmer Receives</h2>

        <div className="info-grid">
          <div className="info-card">
            <h4>🦠 Disease Status</h4>
            <p>
              Shows whether a disease is detected and highlights possible causes.
            </p>
          </div>

          <div className="info-card">
            <h4>⚠ Risk Level</h4>
            <p>
              Displays Low, Medium, or High risk for timely decision making.
            </p>
          </div>

          <div className="info-card">
            <h4>🌱 Approved Actions</h4>
            <p>
              Step-by-step preventive and corrective measures aligned with
              government agricultural advisory.
            </p>
          </div>

          <div className="info-card">
            <h4>🛡 Safe Farming Guidance</h4>
            <p>
              Ensures compliance with verified and safe farming practices.
            </p>
          </div>
        </div>

        <p className="trust-line">
          Designed for farmers • Based on official agricultural advisory • Safe & reliable
        </p>
      </section>

      {/* FINAL CTA */}
      <section className="footer-cta">
        <h2>Start Safe & Smart Farming Today</h2>
        <p>
          Upload your crop image and receive AI-driven disease analysis
          aligned with trusted government agricultural guidelines.
        </p>

        <button className="hero-btn" onClick={() => navigate("/home")}>
          Analyze My Crop 🌿
        </button>
      </section>

    </div>
  );
}

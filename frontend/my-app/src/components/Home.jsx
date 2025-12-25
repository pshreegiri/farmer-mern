import { useState } from "react";
import "./Home.css";
import { analyzeCrop } from "./analyze";

function Home() {
  const [result, setResult] = useState(null);
  const [englishResult, setEnglishResult] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("en");
  const [isTranslating, setIsTranslating] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setEnglishResult(null);
      setError(null);
      setLanguage("en");
    }
  };

  const handleAnalyze = async () => {
    await analyzeCrop(
      (data) => {
        setEnglishResult(data); // base English
        setResult(data);        // display
        setLanguage("en");
      },
      setError,
      setLoading
    );
  };

  const handleTranslate = async () => {
    if (!englishResult) return;

    // Switch back to English instantly
    if (language !== "en") {
      setResult(englishResult);
      setLanguage("en");
      return;
    }

    setIsTranslating(true);

    try {
      const res = await fetch("http://localhost:5000/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          analysis: englishResult,
          targetLanguage: "Hindi"
        })
      });

      const translated = await res.json();
      setResult(translated);
      setLanguage("hi");
    } catch (err) {
      alert("Translation failed. Please try again.");
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="container">
      <h1>Farmer AI Compliance & Disease Alert Agent (F-ACDA)</h1>
      <p className="subtitle">
        Upload a crop image to get instant disease & compliance guidance
      </p>

      <label>Crop Image</label>
      <div className="file-box">
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      {preview && (
        <div className="image-preview">
          <img src={preview} alt="Crop Preview" />
        </div>
      )}

      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Crop"}
      </button>

      {error && <p className="error-message">❌ {error}</p>}

      {result && (
        <div id="result">
          <h3>Disease: {result.disease || "Not detected"}</h3>

          <p>
            Risk Level:{" "}
            <span
              className={`risk ${
                englishResult?.risk?.toLowerCase() || "unknown"
              }`}
            >
              {result.risk || "Unknown"}
            </span>
          </p>

          <ul>
            {result.actions && result.actions.length > 0 ? (
              result.actions.map((action, index) => (
                <li key={index}>{action}</li>
              ))
            ) : (
              <li>No actions suggested</li>
            )}
          </ul>

          <div className="warning">
            ⚠️ {result.warning || "AI analysis unavailable."}
          </div>

          <button
            onClick={handleTranslate}
            disabled={isTranslating}
            style={{ marginTop: "15px" }}
          >
            {isTranslating
              ? "Translating..."
              : language === "en"
              ? "Translate to Hindi"
              : "View in English"}
          </button>
        </div>
      )}

      <div className="footer">
        Powered by Gemini • Vertex AI
      </div>
    </div>
  );
}

export default Home;

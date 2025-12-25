const express = require("express");
// const fetch = require("node-fetch");

const router = express.Router();

router.post("/", async (req, res) => {
  const { analysis, targetLanguage } = req.body;

  if (!analysis || !targetLanguage) {
    return res.status(400).json({ error: "Invalid request" });
  }

  if (targetLanguage === "en") {
    return res.json(analysis);
  }

  const prompt = `
Translate the following agricultural advisory JSON into ${targetLanguage}.

Rules:
- Keep JSON structure EXACTLY the same
- Translate ONLY values, not keys
- Use simple farmer-friendly language
- Do NOT add explanations
- Do NOT add markdown
- Output JSON ONLY

JSON:
${JSON.stringify(analysis, null, 2)}
`.trim();

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const raw = await response.text();

    if (!response.ok) {
      console.error("❌ Translation error:", raw);
      return res.status(500).json({ error: "Translation failed" });
    }

    const parsed = JSON.parse(raw);
    const translatedText =
      parsed?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!translatedText) {
      return res.status(500).json({ error: "Invalid translation response" });
    }

    const translatedJSON = JSON.parse(translatedText);
    res.json(translatedJSON);

  } catch (err) {
    console.error("❌ Translation exception:", err.message);
    res.status(500).json({ error: "Translation failed" });
  }
});

module.exports = router;

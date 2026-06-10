const express = require("express");
const router = express.Router();

router.get("/test-embedding", async (req, res) => {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-embedding-001:embedContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: {
          parts: [{ text: "sambal matah" }],
        },
      }),
    }
  );

  const data = await response.json();
  res.json(data);
});

module.exports = router;
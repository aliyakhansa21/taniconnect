const express = require("express");
const router = express.Router();

router.get("/test-gemini", async (req, res) => {
  try {
    const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models?key=${process.env.GEMINI_API_KEY}`
    );

    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));

    res.json(data);

    // const data = await response.json();
    // res.json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;
const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (optional — if you have a public folder)
app.use(express.static("public"));

// Stealth proxy route
app.get("/proxy", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send("Missing URL");

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://google.com",
        "Origin": "https://google.com"
      }
    });

    const contentType = response.headers.get("content-type");
    res.setHeader("Content-Type", contentType);
    const buffer = await response.buffer();
    res.send(buffer);
  } catch (error) {
    res.status(500).send("Proxy failed.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Stealth proxy running on port ${PORT}`);
});

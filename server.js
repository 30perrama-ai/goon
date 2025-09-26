const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/proxy', async (req, res) => {
  const target = req.query.url;
  if (!target) return res.status(400).send("Missing URL");

  try {
    const response = await axios.get(target, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    res.send(response.data);
  } catch (err) {
    res.status(500).send("Proxy failed.");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const BASE_URL = "https://animepahe.ru";

app.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: "Missing search query" });
  }

  try {
    const apiUrl = `${BASE_URL}/api?m=search&q=${encodeURIComponent(query)}`;
    const response = await axios.get(apiUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/119 Safari/537.36",
      },
    });

    return res.json(response.data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Failed to fetch from AnimePahe" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

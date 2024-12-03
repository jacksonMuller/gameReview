const { onRequest } = require("firebase-functions/v2/https");
const axios = require("axios");
const cors = require("cors")({ origin: true });
require("dotenv").config();

const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
let accessToken = "";

const getAccessToken = async () => {
  const url = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`;
  const response = await axios.post(url);
  return response.data.access_token;
};

exports.searchGames = onRequest(async (req, res) => {
  cors(req, res, async () => {
    const { query } = req.body;

    if (!query) {
      return res
        .status(400)
        .json({ error: "Bad Request: Query parameter is required" });
    }

    if (!accessToken) {
      accessToken = await getAccessToken();
    }

    const url = "https://api.igdb.com/v4/games";
    const searchQuery = `fields name, genres.name, cover.url; search "${query}"; limit 10;`;

    try {
      const response = await axios.post(url, searchQuery, {
        headers: {
          "Client-ID": CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "text/plain",
        },
      });

      return res.status(200).json(response.data);
    } catch (error) {
      console.error("API error", error);
      res.status(500).send({ error: "Internal Server Error", error });
    }
  });
});

require("dotenv").config();
const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3001;

app.get("/", (req, res) => {
  res.send("Hello noob");
});

const spotifyApi = new SpotifyWebApi({
  redirectUri: process.env.REDIRECT_URI,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

app.post("/login", (req, res) => {
  const code = req.body.code;

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      spotifyApi.setAccessToken(data.body["access_token"]);
      spotifyApi.setRefreshToken(data.body["refresh_token"]);

      res.send({ token: data.body["access_token"] });
    })
    .catch((err) => {
      console.log("Something went wrong!", err);
    });
});

app.post("/search", (req, res) => {
  spotifyApi
    .searchTracks(req.body.search)
    .then((data) => {
      const { items } = data.body.tracks;

      res.send(items);
    })
    .catch((err) => console.log("errr", err));
});

app.post("/refreshToken", (req, res) => {
  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      console.log("access token refreshed");
      spotifyApi.setAccessToken(data.body["access_token"]);
    })
    .catch((err) => {
      console.log("error refreshing token", err);
    });
});

app.listen(PORT, () => {
  console.log(`Listening at localhost ${PORT}`);
});

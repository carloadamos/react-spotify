require('dotenv').config();
const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3001;

app.get('/', (req, res) => {
  res.send('Hello noob');
});

const spotifyApi = new SpotifyWebApi({
  redirectUri: process.env.REDIRECT_URI,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

app.post('/login', (req, res) => {
  const code = req.body.code;

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      spotifyApi.setAccessToken(data.body['access_token']);
      spotifyApi.setRefreshToken(data.body['refresh_token']);

      res.send({ token: data.body['access_token'] });
    })
    .catch((err) => {
      console.log('Something went wrong!', err);
    });
});

app.post('/search', (req, res) => {
  spotifyApi
    .searchTracks(req.body.search)
    .then((data) => {
      const { items } = data.body.tracks;

      res.send(items);
    })
    .catch((err) => console.log('errr', err));
});

app.post('/refreshToken', (req, res) => {
  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      console.log('access token refreshed');
      spotifyApi.setAccessToken(data.body['access_token']);
    })
    .catch((err) => {
      console.log('error refreshing token', err);
    });
});

app.get('/getCategories', (req, res) => {
  spotifyApi
    .getCategories({
      limit: 20,
      offset: 0,
      country: 'PH',
      locale: 'en_PH',
    })
    .then((data) => {
      res.send(data.body.categories);
    })
    .catch((err) => {
      console.log('Something went wrong!', err);
    });
});

app.post('/getPlaylistsForCategory', async (req, res) => {
  const id = req.body.id;
  const playlists = await getPlaylists(id);

  res.send(playlists);
});

app.post('/getPlaylistTracks', async (req, res) => {
  const playlistId = req.body.playlistId;

  spotifyApi
    .getPlaylistTracks(playlistId, {
      offset: 0,
      limit: 20,
      field: 'items',
    })
    .then((data) => {
      res.send({ tracks: data.body.items });
    })
    .catch((error) => {
      console.log('error', error);
    });
});

function getPlaylists(id) {
  return spotifyApi
    .getPlaylistsForCategory(id, {
      country: 'PH',
      locale: 'en_PH',
    })
    .then((data) => {
      const playlist = data.body.playlists.items.map((item) => {
        return {
          id: item.id,
          name: item.name,
          description: item.description,
          imageUrl: item.images[0].url,
          owner: item.owner,
          totalTracks: item.tracks.total ?? 0,
        };
      });

      return playlist;
    })
    .catch((err) => {
      console.log('Something went wrong!', err);
    });
}

app.listen(PORT, () => {
  console.log(`Listening at localhost ${PORT}`);
});

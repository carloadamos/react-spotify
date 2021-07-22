import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  clearSelectedTrack,
  getSelectedTrack,
  selectTrack,
} from '../state/reducer/trackReducer';
import { getToken } from '../state/reducer/tokenReducer';

import axios from 'axios';
import Track from '../Track';
import Player from '../Player';

const useStyles = makeStyles({
  root: {
    background: '#121212',
    padding: '10px',
  },
});

export default function PlaylistTracks() {
  const dispatch = useDispatch();
  const styles = useStyles();
  const location = useLocation();
  const { playlistId } = location.state ?? {};
  const [tracks, setTracks] = useState([]);
  const authToken = useSelector(getToken);

  const hasSelectedTrack = useSelector(getSelectedTrack);

  useEffect(() => {
    axios
      .post('http://localhost:3001/getPlaylistTracks', { playlistId })
      .then(({ data }) => {
        const trackResult = data.tracks.map(({ track }) => {
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images.reduce((smallest, image) => {
              if (image.height < smallest.height) return image;

              return smallest;
            }, track.album.images[1]).url,
          };
        });

        // console.log('setTrack')
        setTracks(trackResult);
        dispatch(clearSelectedTrack());
      })
      .catch((error) => console.log('error', error));
  }, [playlistId, dispatch]);

  return (
    <Box className={styles.root}>
      <Typography className={styles.title}>Tracks</Typography>
      <Box className={styles.tracks}>
        {tracks && tracks.length
          ? tracks.map((track) => {
              console.log('track', track);
              return (
                <Track
                  key={track.uri}
                  track={track}
                  handleClick={() => dispatch(selectTrack(track.uri))}
                />
              );
            })
          : 'No tracks found'}
      </Box>
      <Box>{hasSelectedTrack.length !== 0 && <Player token={authToken} />}</Box>
    </Box>
  );
}

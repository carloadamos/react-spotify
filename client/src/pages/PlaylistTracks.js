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
  },
  header: {
    background: '#1DB954',
    display: 'flex',
    flexDirection: 'row',
    padding: '10px',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  headerLeft: {
    marginRight: '20px',
  },
  playlistImage: {
    height: '230px',
    width: '230px',
  },
  playlist: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  tracks: {
    padding: '10px',
  },
  subTitle: {
    color: '#FFFFFF',
    opacity: 0.9,
  },
  owner: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default function PlaylistTracks() {
  const dispatch = useDispatch();
  const styles = useStyles();
  const location = useLocation();
  const authToken = useSelector(getToken);
  const hasSelectedTrack = useSelector(getSelectedTrack);

  const [tracks, setTracks] = useState([]);
  const { playlist } = location.state ?? {};

  useEffect(() => {
    axios
      .post('http://localhost:3001/getPlaylistTracks', {
        playlistId: playlist.id,
      })
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

        setTracks(trackResult);
        dispatch(clearSelectedTrack());
      })
      .catch((error) => console.log('error', error));
  }, [playlist, dispatch]);

  return (
    <Box className={styles.root}>
      <Box className={styles.header}>
        <Box className={styles.headerLeft}>
          <img
            className={styles.playlistImage}
            src={playlist.imageUrl}
            alt={playlist.name}
          />
        </Box>
        <Box className={styles.headerRight}>
          <Typography variant='subtitle1' className={styles.playlist}>
            PLAYLIST
          </Typography>
          <Typography variant='h3' className={styles.title}>
            {playlist.name}
          </Typography>
          <Typography variant='subtitle2' className={styles.subTitle}>
            {playlist.description}
          </Typography>
          <Typography variant='subtitle1' className={styles.owner}>
            {playlist.owner.display_name}
          </Typography>
        </Box>
      </Box>
      <Box className={styles.tracks}>
        {tracks && tracks.length
          ? tracks.map((track) => {
              return (
                <Track
                  key={track.uri}
                  track={track}
                  handleClick={() => dispatch(selectTrack(track.uri))}
                />
              );
            })
          : 'No tracks found'}
        <Box>
          {hasSelectedTrack.length !== 0 && <Player token={authToken} />}
        </Box>
      </Box>
    </Box>
  );
}

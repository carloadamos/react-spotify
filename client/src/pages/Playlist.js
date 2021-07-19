import React from 'react';
import { getPlaylists } from '../state/reducer/playlistReducer';
import { useSelector } from 'react-redux';

import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PlaylistCard from '../components/PlaylistCard';

// import { useLocation } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    background: '#121212',
    padding: '10px',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  title: {
    color: '#FFFFFF',
    padding: '10px',
  },
});

export default function Playlist() {
  const styles = useStyles();
  const playlists = useSelector(getPlaylists);
  // const location = useLocation();
  // const { playlistId } = location.state ?? {};

  return (
    <Box className={styles.root}>
      <Typography variant='h1' className={styles.title}>
        Playlist
      </Typography>
      <Box className={styles.grid}>
        {playlists.map((playlist) => {
          return <PlaylistCard key={playlist.id} playlist={playlist} />;
        })}
      </Box>
    </Box>
  );
}

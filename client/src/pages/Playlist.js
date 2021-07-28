import React from 'react';
import { getPlaylists } from '../state/reducer/playlistReducer';

import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PlaylistCard from '../components/PlaylistCard';

const useStyles = makeStyles({
  root: {
    background: '#121212',
  }, 
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  header: {
    background: '#1DB954'
  },
  title: {
    color: '#FFFFFF',
    padding: '10px',
  },
});

export default function Playlist() {
  const styles = useStyles();
  const playlists = useSelector(getPlaylists);
  const location = useLocation();
  const { category } = location.state ?? {};

  return (
    <Box className={styles.root}>
      <Box className={styles.header}>
        <Typography variant='h1' className={styles.title}>
          {category.name}
        </Typography>
      </Box>
      <Box className={styles.grid}>
        {playlists.map((playlist) => {
          return <PlaylistCard key={playlist.id} playlist={playlist} />;
        })}
      </Box>
    </Box>
  );
}

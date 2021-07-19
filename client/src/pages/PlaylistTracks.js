import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    background: '#121212',
    padding: '10px',
  },
  tracks: {
    background: 'orange',
  },
});

export default function PlaylistTracks({ playlist }) {
  const styles = useStyles();

  return (
    <Box className={styles.root}>
      <Typography className={styles.title}>{playlist.title}</Typography>
      <Box className={styles.tracks}></Box>
    </Box>
  );
}

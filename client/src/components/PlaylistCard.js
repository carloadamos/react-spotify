import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    background: '#181818',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '15px',
    width: '190px',
    '&:hover': {
      background: '#282828',
    },
  },
  imageWrapper: {
    marginTop: '15px',
  },
  image: {
    borderRadius: '5px',
    height: '160px',
  },
  textWrapper: {
    color: '#FFFFFF',
    flex: '1',
    overflow: 'hidden',
    padding: '15px',
    width: '100%',
    '& .MuiTypography-subtitle1': {
      fontWeight: 'bold',
      overflow: 'hidden',
    },
    '& .MuiTypography-subtitle2': {
      opacity: 0.8,
      overflow: 'hidden',
    },
  },
});

export default function PlaylistCard({ playlist }) {
  const styles = useStyles();
  const history = useHistory();

  const handleClick = (id) => {
    history.push('/playlistTracks', { playlistId: id });
  };

  return (
    <Box
      className={styles.root}
      my={1}
      onClick={() => handleClick(playlist.id)}
    >
      <Box className={styles.imageWrapper}>
        <img
          src={playlist.imageUrl}
          alt={playlist.name}
          className={styles.image}
        />
      </Box>
      <Box className={styles.textWrapper}>
        <Typography variant='subtitle1'>{playlist.name}</Typography>
        <Typography variant='subtitle2'>{playlist.description}</Typography>
      </Box>
    </Box>
  );
}

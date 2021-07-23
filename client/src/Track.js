import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    cursor: 'pointer',
    '&:hover': {
      background: '#282828',
    },
  },
  album: {
    height: '64px',
    width: '64px',
  },
  text: {
    color: '#FFF',
    '& .MuiTypography-subtitle1': {
      fontWeight: 'bold',
      overflow: 'hidden',
    },
  },
});

export default function Track({ track, handleClick }) {
  const styles = useStyles();

  return (
    <Box my={2} className={styles.root} onClick={() => handleClick()}>
      <img src={track.albumUrl} alt={track.title} className={styles.album} />
      <Box mx={2} className={styles.text}>
        <Typography variant='subtitle1'>{track.title}</Typography>
        <Typography variant='subtitle2'>{track.artist}</Typography>
      </Box>
    </Box>
  );
}

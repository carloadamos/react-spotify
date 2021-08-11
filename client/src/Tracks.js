import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    '&:hover': {
      background: '#282828',
    },
  },
  album: {
    height: '48px',
    width: '48px',
    margin: '10px',
  },
  count: {
    color: '#FFF',
    padding: '10px',
  },
  title: {
    flex: 1,
    color: '#FFF',
    '& .MuiTypography-subtitle1': {
      fontWeight: 'bold',
      overflow: 'hidden',
    },
  },
  albumText: {
    flex: 1,
    color: '#FFF',
  },
  durationText: {
    flex: 0.3,
    color: '#FFF',
  },
});
export default function Tracks({ tracks }) {
  const styles = useStyles();

  return (
    <div>
      <Box my={2} className={styles.root}>
        <Box className={styles.count}>
          <Typography variant='subtitle1'>#</Typography>
        </Box>
        <Box className={styles.title}>
          <Typography variant='subtitle1' noWrap={false}>
            Title
          </Typography>
        </Box>
        <Box className={styles.albumText}>
          <Typography variant='subtitle1'>Album</Typography>
        </Box>
        <Box className={styles.durationText}>
          <Typography variant='subtitle1'>Duration</Typography>
        </Box>
      </Box>

      {tracks.map((track, index) => {
        return (
          <Box my={2} className={styles.root} key={index}>
            <Box className={styles.count}>
              <Typography variant='subtitle1'>{index}</Typography>
            </Box>
            <img
              src={track.albumUrl}
              alt={track.title}
              className={styles.album}
            />
            <Box className={styles.title}>
              <Typography variant='subtitle1' noWrap={false}>
                {track.title}
              </Typography>
              <Typography variant='subtitle2'>{track.artist}</Typography>
            </Box>
            <Box className={styles.albumText}>
              <Typography variant='subtitle1'>{track.album.name}</Typography>
            </Box>
            <Box className={styles.durationText}>
              <Typography variant='subtitle1'>{track.duration}</Typography>
            </Box>
          </Box>
        );
      })}
    </div>
  );
}


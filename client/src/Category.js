import React from 'react';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { setPlaylists } from './state/reducer/playlistReducer';

import { useHistory } from 'react-router-dom';

// Material UI
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#181818',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '200px',
    padding: '15px',
    '&:hover': {
      background: '#282828',
    },
  },
  imageWrapper: {
    borderRadius: '5px',
    height: '170px',
    width: '170px',
    position: 'relative',
    display: 'inline-block',
    overflow: 'hidden',
  },
  image: {
    display: 'block',
    position: 'absolute',
    top: '50%',
    left: '50%',
    minHeight: '100%',
    maxWidth: '100%',
    transform: 'translate(-50%, -50%)',
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingTop: '15px',
  },
});

export default function Category({ category }) {
  const styles = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClick = (id) => {
    axios
      .post('http://localhost:3001/getPlaylistsForCategory', {
        id,
      })
      .then((response) => {
        dispatch(setPlaylists(response.data));
        history.push('/playlist', { category });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box
      mx={0.5}
      my={1}
      className={styles.root}
      onClick={() => handleClick(category.id)}
    >
      <Box className={styles.imageWrapper} boxShadow={3}>
        <img
          src={category.icons[0].url}
          alt={category.name}
          className={styles.image}
        />
      </Box>
      <Box className={styles.title}>{category.name}</Box>
    </Box>
  );
}

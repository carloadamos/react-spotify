// Core
import React, { useEffect, useState } from 'react';

// Components
import SearchForm from './SearchForm';
import SearchResult from './SearchResult';
import Player from './Player';
import Category from './Category';

// Material UI
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, setCategories } from './state/reducer/categoryReducer';
import { setToken, getToken } from './state/reducer/tokenReducer';
import { getSelectedTrack } from './state/reducer/trackReducer';

// Utilities
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  body: {
    flex: 1,
    overflowY: 'auto',
  },
  categories: {
    background: '#121212',
    flex: 1,
    gap: '10px',
    display: 'flex',
    flexWrap: 'wrap',
    overflowY: 'auto',
  },
});

export default function Browse() {
  const dispatch = useDispatch();
  const styles = useStyles();

  const authToken = useSelector(getToken);
  const hasSelectedTrack = useSelector(getSelectedTrack);
  const categories = useSelector(getCategories);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (!authToken) return;

    dispatch(setToken(authToken));

    axios
      .get('http://localhost:3001/getCategories')
      .then((response) => {
        dispatch(setCategories(response.data.items));
      })
      .catch((err) => console.log(err));
  }, [authToken, dispatch]);

  return (
    <Box className={styles.root}>
      <Box>
        <SearchForm handleSearch={setSearching} />
      </Box>
      <Box className={searching ? styles.body : styles.categories}>
        {searching ? (
          <SearchResult />
        ) : (
          categories &&
          categories.map((category) => {
            return <Category key={category.id} category={category} />;
          })
        )}
      </Box>
      <Box>{hasSelectedTrack.length !== 0 && <Player token={authToken} />}</Box>
    </Box>
  );
}

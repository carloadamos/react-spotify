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

// Custom hook
import useAuth from './useAuth';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedTrack } from './state/reducer/trackReducer';
import { getCategories, setCategories } from './state/reducer/categoryReducer';

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
});

export default function Browse({ code }) {
  const styles = useStyles();
  const authToken = useAuth(code);

  const dispatch = useDispatch();
  const hasSelectedTrack = useSelector(getSelectedTrack);
  const categories = useSelector(getCategories);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (!authToken) return;

    axios
      .get('http://localhost:3001/getCategories')
      .then((response) => {
        dispatch(setCategories(response.data.items));
      })
      .catch((err) => console.log(err));
  }, [authToken, dispatch]);

  return (
    <Box className={styles.root} mx={5}>
      <Box>
        <SearchForm handleSearch={() => setSearching(true)} />
      </Box>
      <Box className={styles.body}>
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

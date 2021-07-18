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
import { useSelector } from 'react-redux';
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
});

export default function Browse({ code }) {
  const styles = useStyles();
  const hasSelectedTrack = useSelector(getSelectedTrack);
  const authToken = useAuth(code);
  const [categories, setCategories] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:3001/getCategories')
      .then((response) => {
        setCategories(response.data.items);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box className={styles.root} mx={5}>
      <Box>
        <SearchForm handleSearch={() => setSearching(true)} />
      </Box>
      <Box className={styles.body}>
        {searching ? (
          <SearchResult />
        ) : (
          categories.map((category) => {
            return <Category key={category.id} category={category} />;
          })
        )}
      </Box>
      <Box>{hasSelectedTrack.length !== 0 && <Player token={authToken} />}</Box>
    </Box>
  );
}

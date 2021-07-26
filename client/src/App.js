import React, { useEffect } from 'react';

import Browse from './Browse';
import Login from './Login';
import Playlist from './pages/Playlist';
import PlaylistTracks from './pages/PlaylistTracks';
import SideNavigation from './components/SideNavigation';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import { setCode, getCode } from './state/reducer/codeReducer';
import { setToken, getToken } from './state/reducer/tokenReducer';
import { setUser } from './state/reducer/userReducer';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#121212',
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
  },
  navigation: {
    width: '240px',
    minWidth: '240px',
  },
  content: {
    flex: 1,
  },
});

function App() {
  const dispatch = useDispatch();
  const styles = useStyles();
  const code = useSelector(getCode);
  const token = useSelector(getToken);

  useEffect(() => {
    dispatch(setCode(new URLSearchParams(window.location.search).get('code')));

    axios
      .post('http://localhost:3001/login', { code })
      .then((res) => {
        dispatch(setToken(res.data.token));
      })
      .catch((err) => {
        window.location = '/';
        console.log('error', err);
      })
      .finally(() => window.history.pushState({}, null, '/'));
  }, [code, dispatch]);

  useEffect(() => {
    axios
      .post('http://localhost:3001/getMe')
      .then((res) => {
        dispatch(setUser(res.data));
      })
      .catch((err) => {
        console.log('error', err);
      });
  }, [token, dispatch]);

  return (
    <Box className={styles.root}>
      <Box className={styles.navigation}>
        <SideNavigation />
      </Box>
      <Box className={styles.content}>
        <Router>
          <Route
            exact
            path='/'
            render={() => (code ? <Browse /> : <Login />)}
          />
          <Route exact path='/playlist' component={Playlist} />
          <Route exact path='/playlistTracks' component={PlaylistTracks} />
        </Router>
      </Box>
    </Box>
  );
}

export default App;

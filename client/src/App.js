import React, { useEffect } from 'react';

import Browse from './Browse';
import Login from './Login';
import Playlist from './pages/Playlist';
import PlaylistTracks from './pages/PlaylistTracks';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import { setCode, getCode } from './state/reducer/codeReducer';
import { setToken } from './state/reducer/tokenReducer';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#121212',
    height: '100vh',
  },
});

function App() {
  const dispatch = useDispatch();
  const styles = useStyles();
  const code = useSelector(getCode);

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

  return (
    <div className={styles.root}>
      <Router>
        <Route exact path='/' render={() => (code ? <Browse /> : <Login />)} />
        <Route exact path='/playlist' component={Playlist} />
        <Route exact path='/playlistTracks' component={PlaylistTracks} />
      </Router>
    </div>
  );
}

export default App;

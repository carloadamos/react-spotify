import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Box } from '@material-ui/core';
import { SvgIcon, makeStyles } from '@material-ui/core';
import { Home as HomeIcon } from '@material-ui/icons';
import { Search as SearchIcon } from '@material-ui/icons';
import { LibraryBooks as LibraryIcon } from '@material-ui/icons';
import { Add as AddIcon } from '@material-ui/icons';
import { Favorite as FavoriteIcon } from '@material-ui/icons';
import { RadioButtonChecked as RadioButtonCheckedIcon } from '@material-ui/icons';

import { useSelector } from 'react-redux';
import { getUser } from '../state/reducer/userReducer';

import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    background: '#000',
    height: '100%',
    overflow: 'hidden',
  },
  main: {
    color: '#FFF',
  },
  sub: {
    color: '#FFF',
  },
  hr: {
    border: '1px solid white',
    margin: '0 20px',
  },
  unlisted: {
    margin: 0,
    padding: '10px',
  },
  list: {
    alignItems: 'center',
    borderRadius: '5px',
    display: 'flex',
    fontWeight: 'bold',
    flexDirection: 'row',
    gap: '10px',
    opacity: 0.8,
    padding: '10px',
    '&:hover': {
      cursor: 'pointer',
      opacity: 1,
    },
  },
  playlist: {
    padding: '5px 10px',
  },
  active: {
    background: '#282828',
    opacity: 1,
  },
});

export default function SideNavigation() {
  const styles = useStyles();
  const mainNavs = {
    Home: HomeIcon,
    Search: SearchIcon,
    Library: LibraryIcon,
  };
  const user = useSelector(getUser);
  const [playlists, setPlaylists] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .post('http://localhost:3001/getUserPlaylists', {
        userId: user.id,
      })
      .then((result) => setPlaylists(result.data))
      .catch((error) => console.log('error', error));
  }, [user]);

  return (
    <Box className={styles.root}>
      <nav className={styles.main}>
        <ul className={styles.unlisted}>
          {Object.keys(mainNavs).map((key) => {
            return (
              <li
                key={key}
                className={`${styles.list} ${
                  key === 'Home' ? styles.active : ''
                }`}
                onClick={() => history.push(`${key === 'Home' ? '/' : key}`)}
              >
                <SvgIcon component={mainNavs[key]} />
                {key}
              </li>
            );
          })}
        </ul>
      </nav>

      <nav className={styles.sub}>
        <ul className={styles.unlisted}>
          <li className={styles.list}>
            <SvgIcon component={AddIcon} />
            Create Playlist
          </li>
          <li className={styles.list}>
            <SvgIcon component={FavoriteIcon} />
            Liked Songs
          </li>
          <li className={styles.list}>
            <SvgIcon component={RadioButtonCheckedIcon} />
            Your Episodes
          </li>
        </ul>
      </nav>

      <hr className={styles.hr} />

      <nav className={styles.sub}>
        <ul className={styles.unlisted}>
          {playlists.map((playlist) => {
            return (
              <li
                className={`${styles.list} ${styles.playlist}`}
                key={playlist.id}
                onClick={() => history.push('/playlistTracks', { playlist })}
              >
                {playlist.name}
              </li>
            );
          })}
        </ul>
      </nav>
    </Box>
  );
}

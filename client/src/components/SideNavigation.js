import React from 'react';

import { SvgIcon, makeStyles } from '@material-ui/core';
import { Home as HomeIcon } from '@material-ui/icons';
import { Search as SearchIcon } from '@material-ui/icons';
import { LibraryBooks as LibraryIcon } from '@material-ui/icons';
import { Add as AddIcon } from '@material-ui/icons';
import { Favorite as FavoriteIcon } from '@material-ui/icons';
import { RadioButtonChecked as RadioButtonCheckedIcon } from '@material-ui/icons';

const useStyles = makeStyles({
  main: {
    color: '#FFF',
  },
  sub: {
    color: '#FFF',
  },
  unlisted: {
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

  return (
    <>
      <nav className={styles.main}>
        <ul className={styles.unlisted}>
          {Object.keys(mainNavs).map((key) => {
            return (
              <li
                key={key}
                className={`${styles.list} ${
                  key === 'Home' ? styles.active : ''
                }`}
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
    </>
  );
}

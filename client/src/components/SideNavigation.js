import React from 'react';

import { SvgIcon, makeStyles } from '@material-ui/core';
import { Home as HomeIcon } from '@material-ui/icons';
import { Search as SearchIcon } from '@material-ui/icons';
import { LibraryBooks as LibraryIcon } from '@material-ui/icons';

const useStyles = makeStyles({
  main: {
    color: '#FFF',
  },
  unlisted: {
    padding: '10px',
  },
  list: {
    alignItems: 'center',
    display: 'flex',
    fontWeight: 'bold',
    flexDirection: 'row',
    gap: '10px',
    padding: '10px',
    '&:hover': {
      background: '#282828',
    },
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
              <li key={key} className={styles.list}>
                <SvgIcon component={mainNavs[key]} />
                {key}
              </li>
            );
          })}
        </ul>
      </nav>

      <nav className={styles.sub}></nav>
    </>
  );
}

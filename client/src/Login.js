import React from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';

const AUTH_URL =
  'https://accounts.spotify.com/authorize?client_id=50b62bcfbdcd4df4b863b71ac89795d7&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    background: '#1DB954',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    '&:hover': {
      background: '#191414',
    },
  },
});

export default function Login() {
  const styles = useStyles();

  return (
    <Box className={styles.root}>
      <Button className={styles.loginButton} href={AUTH_URL}>
        Login with Spotify
      </Button>
    </Box>
  );
}

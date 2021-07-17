import React from "react";
import { Button, makeStyles } from "@material-ui/core";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=50b62bcfbdcd4df4b863b71ac89795d7&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
});

export default function Login() {
  const styles = useStyles();

  return (
    <Button className={styles.root} href={AUTH_URL}>
      Login with Spotify
    </Button>
  );
}

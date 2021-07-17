import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    cursor: "pointer",
  },
  album: {
    height: "64px",
    width: "64px",
  },
});

export default function Track({ track,  handleClick}) {
  const styles = useStyles();

  return (
    <Box m={2} className={styles.root} onClick={() => handleClick()}>
      <img src={track.albumUrl} alt={track.title} className={styles.album} />
      <Box mx={2}>
        <Typography variant="subtitle1">{track.title}</Typography>
        <Typography variant="subtitle2">{track.artist}</Typography>
      </Box>
    </Box>
  );
}

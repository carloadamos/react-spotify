// Core
import React from "react";

// Components
import SearchForm from "./SearchForm";
import SearchResult from "./SearchResult";
import Player from "./Player";

// Material UI
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Custom hook
import useAuth from "./useAuth";

// Redux
import { useSelector } from "react-redux";
import { getSelectedTrack } from "./state/reducer/trackReducer";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  searchResult: {
    flex: 1,
    overflowY: "auto",
  },
});

export default function Browse({ code }) {
  const styles = useStyles();
  const hasSelectedTrack = useSelector(getSelectedTrack);
  const authToken = useAuth(code);

  return (
    <Box className={styles.root} mx={5}>
      <Box>
        <SearchForm />
      </Box>
      <Box className={styles.searchResult}>
        <SearchResult />
      </Box>
      <Box>{hasSelectedTrack.length !== 0 && <Player token={authToken} />}</Box>
    </Box>
  );
}

// Core
import React, { useEffect, useState } from "react";

// Material UI
import { FormControl, TextField } from "@material-ui/core";

// Utility
import axios from "axios";

// Redux
import { useDispatch } from "react-redux";
import { setTracks } from "./state/reducer/trackReducer";

export default function SearchForm() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search) {
      axios
        .post("http://localhost:3001/search", { search })
        .then((result) => {
          const trackResult = result.data.map((track) => {
            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: track.album.images.reduce((smallest, image) => {
                if (image.height < smallest.height) return image;

                return smallest;
              }, track.album.images[1]).url,
            };
          });

          dispatch(setTracks(trackResult));
        })
        .catch((err) => console.log("err", err));
    }
  }, [search, dispatch]);

  return (
    <FormControl fullWidth={true}>
      <TextField
        variant="outlined"
        onChange={(event) => setSearch(event.target.value)}
      />
    </FormControl>
  );
}

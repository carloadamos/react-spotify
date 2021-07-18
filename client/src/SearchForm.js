// Core
import React, { useEffect, useState } from 'react';

// Material UI
import { FormControl, InputAdornment, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';

// Utility
import axios from 'axios';

// Redux
import { useDispatch } from 'react-redux';
import { setTracks } from './state/reducer/trackReducer';

export default function SearchForm({ handleSearch }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const handleOnChange = (e) => {
    handleSearch();
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search) {
      axios
        .post('http://localhost:3001/search', { search })
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
        .catch((err) => console.log('err', err));
    }
  }, [search, dispatch]);

  return (
    <FormControl fullWidth={true}>
      <TextField
        placeholder='Artists, songs or podcasts'
        variant='outlined'
        onChange={(e) => handleOnChange(e)}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Search />
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
}

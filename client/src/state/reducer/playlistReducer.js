import { createSlice } from '@reduxjs/toolkit';

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState: {
    selected: {},
    value: [],
  },
  reducers: {
    setPlaylists: (state, action) => {
      state.value = action.payload;
    },
    clearPlaylists: (state) => {
      state.value = [];
    },
    setSelectedPlaylist: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const getPlaylists = (state) => state.playlist.value;

export const getSelectedPlaylist = (state) => state.playlist.selected;

export const { setPlaylists, clearPlaylists, setSelectedPlaylist } =
  playlistSlice.actions;

export default playlistSlice.reducer;

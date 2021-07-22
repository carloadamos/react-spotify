import { createSlice } from '@reduxjs/toolkit';

export const tracksSlice = createSlice({
  name: 'track',
  initialState: {
    selected: [],
    value: [],
  },
  reducers: {
    setTracks: (state, action) => {
      state.value = action.payload;
    },
    clearTracks: (state) => {
      state.value = [];
    },
    selectTrack: (state, action) => {
      state.selected = [action.payload];
    },
    clearSelectedTrack: (state) => {
      state.selected = [];
    },
  },
});

export const getTracks = (state) => state.track.value;

export const getSelectedTrack = (state) => state.track.selected;

export const { setTracks, clearTracks, selectTrack, clearSelectedTrack } =
  tracksSlice.actions;

export default tracksSlice.reducer;

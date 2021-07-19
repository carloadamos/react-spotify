import { configureStore } from '@reduxjs/toolkit';
import trackReducer from './state/reducer/trackReducer';
import playlistReducer from './state/reducer/playlistReducer';

export default configureStore({
  reducer: {
    playlist: playlistReducer,
    track: trackReducer,
  },
});

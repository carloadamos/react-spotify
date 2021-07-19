import { configureStore } from '@reduxjs/toolkit';
import trackReducer from './state/reducer/trackReducer';
import playlistReducer from './state/reducer/playlistReducer';
import categoryReducer from './state/reducer/categoryReducer';

export default configureStore({
  reducer: {
    category: categoryReducer,
    playlist: playlistReducer,
    track: trackReducer,
  },
});

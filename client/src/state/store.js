import { configureStore } from '@reduxjs/toolkit';
import trackReducer from './reducer/trackReducer';
import playlistReducer from './reducer/playlistReducer';
import categoryReducer from './reducer/categoryReducer';
import codeReducer from './reducer/codeReducer';
import tokenSlice from './reducer/tokenReducer';

export default configureStore({
  reducer: {
    category: categoryReducer,
    code: codeReducer,
    playlist: playlistReducer,
    token: tokenSlice,
    track: trackReducer,
  },
});

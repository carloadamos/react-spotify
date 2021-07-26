import { configureStore } from '@reduxjs/toolkit';
import trackReducer from './reducer/trackReducer';
import playlistReducer from './reducer/playlistReducer';
import categoryReducer from './reducer/categoryReducer';
import codeReducer from './reducer/codeReducer';
import tokenReducer from './reducer/tokenReducer';
import userReducer from './reducer/userReducer';

export default configureStore({
  reducer: {
    category: categoryReducer,
    code: codeReducer,
    playlist: playlistReducer,
    token: tokenReducer,
    track: trackReducer,
    user: userReducer,
  },
});

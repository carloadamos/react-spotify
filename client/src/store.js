import { configureStore } from "@reduxjs/toolkit";
import trackReducer from "./state/reducer/trackReducer";

export default configureStore({
  reducer: {
    track: trackReducer,
  },
});

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import mangaReducer from "./mangaSlice";
import genreReducer from "./genreSlice";
import historyReducer from "./historySlice";
import favouriteReducer from "./favouriteSlice";
import chapterReducer from "./chapterSlice";
import uploadReducer from "./uploadSlice";
import sliderReducer from "./sliderSlice";
import commentReducer from "./commentSlice";
import notificationReducer from "./notificationSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  manga: mangaReducer,
  genre: genreReducer,
  favourite: favouriteReducer,
  chapter: chapterReducer,
  history: historyReducer,
  user: userReducer,
  upload: uploadReducer,
  slider: sliderReducer,
  comment: commentReducer,
  notification: notificationReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

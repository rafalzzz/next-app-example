import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import modal from "store/modal";
import signUp from "store/sign-up";
import signIn from "store/sign-in";
import { apiSlice } from "store/api-slice";

const rootReducer = combineReducers({
  modal,
  signUp,
  signIn,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setupStore = (preloadedState: Record<string, any>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(apiSlice.middleware),
  });

export const store = setupStore({});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

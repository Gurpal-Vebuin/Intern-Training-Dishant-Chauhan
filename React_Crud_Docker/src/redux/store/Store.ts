import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import LanguageReducer from "../features/slices/LanguageSlice";
import AuthReducer from "../features/slices/AuthSlice";

const logger = createLogger({});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const middleware = (getDefaultMiddleware: any) => {
  return getDefaultMiddleware({ serializableCheck: false }).concat(logger);
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["lang", "auth"],
};

const rootReducer = combineReducers({
  lang: LanguageReducer,
  auth: AuthReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middleware,
});
export const persistor = persistStore(store);



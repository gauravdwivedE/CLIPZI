import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // correct import
import userReducer from './user/userSlice';
import  themeReducer from './theme/themeSlice';

// persist config
const persistConfig = {
  key: 'root',
  storage,
};

// combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer
});

// wrap with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// configure store correctly
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true, // ✅ already included, but explicit here
      serializableCheck: false, // 🔧 useful with redux-persist
    }),
});

// create persistor
export const persistor = persistStore(store);

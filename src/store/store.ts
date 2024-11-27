import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

import { errorMiddleware } from './errorMiddleware';
import analyticsReducer from './slices/analyticsSlice';
import userReducer from './slices/authSlice';
import clientReducer from './slices/clientSlice';
import notificationReducer from './slices/notificationSlice';
import depositReducer from './slices/productSlice';

const rootReducer = combineReducers({
  auth: userReducer,
  client: clientReducer,
  deposit: depositReducer,
  analytics: analyticsReducer,
  notification: notificationReducer
});

const persistConfig = {
  key: 'root',
  storage: storageSession,
  blacklist: ['notification', 'analytics']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(errorMiddleware)
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;

export default store;

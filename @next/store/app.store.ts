import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  ApisReducer,
  authReducer,
  NotificationReducer,
  profileReducer,
  VerificationReducer,
} from './slices';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { removeLocalStorage } from '@utils';
const persistConfig = {
  key: 'root',
  version: 1,
  blacklist: ['profile', 'permissions', 'dbsApp'],
  storage,
};

const appReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  notification: NotificationReducer,
  verification: VerificationReducer,
  apis: ApisReducer,
});

const rootReducer = (state: any, action: any) => {
  // Clear all data in redux store to initial.
  if (action.type === 'auth/logout') {
    for (let i = 0; i < localStorage?.length; i++) {
      const key = localStorage?.key(i) || '';
      if (key !== 'rememberMe') {
        setTimeout(() => {
          removeLocalStorage(key);
        }, 0);
      }
    }
    state = undefined;
  }
  return appReducer(state, action);
};

// Remove in future acording to requirments
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const createStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreState: true,
        ignoreActions: true,
        // ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof createStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof createStore.dispatch;

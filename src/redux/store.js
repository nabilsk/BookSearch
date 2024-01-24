import {configureStore} from '@reduxjs/toolkit';
import searchListReducer from '../redux/reducer/searchList';

export const store = configureStore({
  reducer: {
    searchList: searchListReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: {warnAfter: 128},
      serializableCheck: false,
    }),
});

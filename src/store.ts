import { configureStore } from '@reduxjs/toolkit';
import sendReducer from './redux/reducers/sendReducer';
import reportReducer from './redux/reducers/reportReducer';
import extractionReducer from './redux/reducers/extractionReducer';

const store = configureStore({
  reducer: {
    send: sendReducer,
    reports: reportReducer,
    extraction: extractionReducer,
  },
});

export default store;

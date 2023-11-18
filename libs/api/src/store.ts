import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiBase } from './apiBase';

const rootReducers = combineReducers({
	api: apiBase.reducer,
});

export const store = configureStore({
	reducer: rootReducers,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiBase.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import {
	combineReducers,
	configureStore,
	PreloadedState,
} from '@reduxjs/toolkit';
import { apiBase } from './apiBase';

const rootReducers = combineReducers({
	api: apiBase.reducer,
});

export const store = (preloadedState?: PreloadedState<RootState>) => {
	return configureStore({
		reducer: rootReducers,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(apiBase.middleware),
	});
};

export type RootState = ReturnType<typeof rootReducers>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatcher = AppStore['dispatch'];

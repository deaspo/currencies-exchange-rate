// This type interface extends the default options for render from RTL, as well
import { PreloadedState } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { render, RenderOptions } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
// as allows the user to specify other things such as initialState, store.
import { AppStore, RootState, store as storeSetup } from '../store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
	preloadedState?: PreloadedState<RootState>;
	store?: AppStore;
}

export function renderWithProviders(
	ui: React.ReactElement,
	{
		preloadedState = {},
		// Automatically create a store instance if no store was passed in
		store = storeSetup(preloadedState),
		...renderOptions
	}: ExtendedRenderOptions = {}
) {
	setupListeners(store?.dispatch);
	function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
		return <Provider store={store}>{children}</Provider>;
	}

	// Return an object with the store and all of RTL's query functions
	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

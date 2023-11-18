import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiBase = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:4201',
	}),
	tagTypes: ['Currency', 'Institution'],
	endpoints: () => ({}),
});

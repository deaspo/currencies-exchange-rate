import { useMemo } from 'react';
import { useGetInstitutionQuery } from '../index';

export const useInstitution = () => {
	const query = useGetInstitutionQuery();

	return useMemo(() => ({ ...query, institution: query.data }), [query]);
};

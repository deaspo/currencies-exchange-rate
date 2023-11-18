import { ReactNode } from 'react';
import { Virtuoso } from 'react-virtuoso';

interface IProps<T> {
	itemsList: T[];
	listItemRowContent: (index: number, data: T) => ReactNode;
}

export const ListItems = <T,>({ itemsList, listItemRowContent }: IProps<T>) => {
	return (
		<Virtuoso
			className="w-full"
			useWindowScroll
			data={itemsList}
			itemContent={listItemRowContent}
		/>
	);
};

import { CurrencyInfo } from '@currencyexchangerate/api';

export const CreateAvatar = ({ currency }: Pick<CurrencyInfo, 'currency'>) => {
	return (
		<span
			data-testid="avatar"
			className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-500"
		>
			<span className="text-xl font-medium leading-none text-white">
				{currency?.toUpperCase()}
			</span>
		</span>
	);
};

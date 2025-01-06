'use client';
import { PropsWithChildren, useState } from 'react';
import { Input } from '../../shadcn/input';

interface SearchInput extends PropsWithChildren {
	placeholder: string;
	onContainerClick?: () => void;
	onContainerKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;

	onInputClick?: () => void;
	onInputKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;

	callback?: <T>(searchResult: T) => void;
}

const SearchInput = ({
	placeholder,
	onContainerClick,
	onContainerKeyDown,
	onInputClick,
	onInputKeyDown,
	children,
}: SearchInput) => {
	const [search, setSearch] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	return (
		<div
			className="flex gap-2 center w-full h-14 rounded-[30px] border-2 border-[#919091] text-[#363636] px-4"
			onClick={onContainerClick}
			onKeyDown={onContainerKeyDown}
		>
			{children}

			<Input
				onChange={handleChange}
				value={search}
				placeholder={placeholder}
				onKeyDown={onInputKeyDown}
				onClick={onInputClick}
				className="center leading-none h-9 w-full rounded-none border-none bg-transparent shadow-none md:text-3xl focus:outline-none focus-visible:ring-0 placeholder:text-[#626262] placeholder:font-medium px-0 py-0"
			/>
		</div>
	);
};

export default SearchInput;

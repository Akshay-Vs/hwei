'use client';
import SearchInput from '@/components/shared/input/search-input';
import React from 'react';

const RevenueSearch = () => {
	return (
		<SearchInput
			onSearch={async (query) =>
				await new Promise((resolve) =>
					setTimeout(() => {
						console.log(query);
						resolve();
					}, 1000)
				)
			}
		/>
	);
};

export default RevenueSearch;

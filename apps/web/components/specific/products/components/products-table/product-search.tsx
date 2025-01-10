import SearchInput from '@/components/shared/input/search-input';
import React from 'react';

const ProductSearch = () => {
	return (
		<SearchInput
			onSearch={(query) => {
				// Perform server-side search
				console.log('Server query:', query);
			}}
		/>
	);
};

export default ProductSearch;

'use client';
import React, { Fragment } from 'react';
import StoreModal from './store-modal';
import VariantModal from './variant-modal';
import VariantItemModal from './variant-item-modal';

const ModalProvider = () => {
	return (
		<Fragment>
			<StoreModal />
			<VariantModal />
			<VariantItemModal />
		</Fragment>
	);
};

export default ModalProvider;

'use client';
import React, { Fragment } from 'react';
import StoreModal from './store-modal';
import VariantModal from './variant-modal';

const ModalProvider = () => {
	return (
		<Fragment>
			<StoreModal />
			<VariantModal />
		</Fragment>
	);
};

export default ModalProvider;

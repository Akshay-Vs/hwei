'use client';
import React, { Fragment } from 'react';
import StoreModal from './store-modal';
import VarientModal from './variant-modal';

const ModalProvider = () => {
	return (
		<Fragment>
			<StoreModal />
			<VarientModal />
		</Fragment>
	);
};

export default ModalProvider;

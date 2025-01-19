import React, { PropsWithChildren } from 'react';

const SrOnly = ({ id, children }: { id: string } & PropsWithChildren) => {
	return (
		<div id={id} className="sr-only">
			{children}
		</div>
	);
};

export default SrOnly;

import React, { PropsWithChildren } from 'react';

const InfoHeader = ({ children }: PropsWithChildren) => {
	return <div className="flex gap-4 w-full h-56">{children}</div>;
};

export default InfoHeader;

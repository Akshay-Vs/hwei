'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';

const RouteTitle = () => {
	const path = usePathname();

	if (!path) return null;

	const pathName = path.split('/').pop() || '';
	const capitalizedPathName =
		pathName.charAt(0).toUpperCase() + pathName.slice(1);

	return (
		<h1 className="text-3xl font-medium">
			{capitalizedPathName === '' ? 'Dashboard' : capitalizedPathName}
		</h1>
	);
};

export default RouteTitle;

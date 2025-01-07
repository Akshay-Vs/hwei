'use client';
import { usePathname } from 'next/navigation';
import React from 'react';

const RouteTitle = () => {
	const path = usePathname();

	return (
		<h1 className="text-3xl font-medium">
			{path === '/'
				? 'Dashboard'
				: path.replace('/', '').charAt(0).toUpperCase() +
					path.replace('/', '').slice(1)}
		</h1>
	);
};

export default RouteTitle;

import Image from 'next/image';
import React from 'react';

import { Button } from '@hwei/ui/shadcn/button';
import { ChevronDown } from 'lucide-react';

const ProfileDropdown = () => {
	return (
		<div className="border-2 border-highlight h-fit w-72 p-1 rounded-base flex justify-between items-center cursor-pointer">
			<Image
				src="https://utfs.io/f/u628d5y0J6C1JoULTTGePIhzvZk7l1rq9wNsymFSYQAnLOT0"
				width={86}
				height={86}
				alt="Profile"
				className="w-16 h-16 rounded-full object-center object-cover"
			/>

			<div>
				<p className="text-sm font-normal">Welcome</p>
				<p className="text-lg font-medium">Evelin Violet</p>
			</div>

			<Button className="h-16 w-16 bg-transparent shadow-none border-secondary/60 border-2 hover:bg-secondary text-secondary/60 hover:text-highlight">
				<ChevronDown className="text-inherit scale-150" />
			</Button>
		</div>
	);
};

export default ProfileDropdown;

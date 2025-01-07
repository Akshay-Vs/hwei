import { Settings } from 'lucide-react';
import React from 'react';

import IconButton from '@/components/shared/button/icon-button';
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from '@hwei/ui/shadcn/tooltip';

const SettingsButton = () => {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<IconButton
					icon={<Settings className="text-inherit" />}
					ariaLabel="Settings"
				/>
			</TooltipTrigger>
			<TooltipContent>
				<p className="text-sm font-semibold">Settings</p>
			</TooltipContent>
		</Tooltip>
	);
};

export default SettingsButton;

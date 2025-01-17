import { Settings } from 'lucide-react';
import React from 'react';

import IconButton from '@/components/shared/button/icon-button';
import { Tooltip, TooltipContent } from '@hwei/ui/shadcn/tooltip';

const SettingsButton = () => {
	return (
		<IconButton icon={<Settings className="text-inherit" />} label="Settings" />
	);
};

export default SettingsButton;

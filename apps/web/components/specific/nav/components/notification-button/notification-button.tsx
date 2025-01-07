import React from 'react';
import { Bell } from 'lucide-react';

import IconButton from '@/components/shared/button/icon-button';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@hwei/ui/shadcn/tooltip';

const NotificationButton = () => {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<IconButton
					icon={<Bell className="text-inherit" />}
					ariaLabel="Notifications"
				/>
			</TooltipTrigger>
			<TooltipContent>
				<p className="text-sm font-semibold">Notifications</p>
			</TooltipContent>
		</Tooltip>
	);
};

export default NotificationButton;

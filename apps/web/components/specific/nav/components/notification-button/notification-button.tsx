import React from 'react';
import { Bell } from 'lucide-react';

import IconButton from '@/components/shared/button/icon-button';

const NotificationButton = () => {
	return (
		<IconButton
			icon={<Bell className="text-inherit" />}
			label="Notifications"
		/>
	);
};

export default NotificationButton;

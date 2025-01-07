import { Settings } from 'lucide-react';
import React from 'react';

import IconButton from '@/components/shared/button/icon-button';

const SettingsButton = () => {
	return <IconButton icon={<Settings className="text-inherit scale-150" />} />;
};

export default SettingsButton;

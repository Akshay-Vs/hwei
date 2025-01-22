import ProfileDropdown from '@/components/specific/nav/components/account-selector/account-selector';
import React from 'react';
import NotificationButton from './components/notification-button/notification-button';
import SettingsButton from './components/settings-button/settings-button';
import StoreSelector from './components/store-selector/store-selector';
import RouteTitle from './components/route-title/route-title';

const Nav = () => {
	return (
		<nav className="flex justify-between items-center fixed top-0 px-5 left-0 w-full h-24 bg-transparent backdrop-blur-3xl z-10 transform-gpu">
			<div className="full flex items-center gap-24 full">
				<ProfileDropdown />
				<RouteTitle />
			</div>

			<div className="center gap-4">
				<StoreSelector />
				<NotificationButton />
				<SettingsButton />
			</div>
		</nav>
	);
};

export default Nav;

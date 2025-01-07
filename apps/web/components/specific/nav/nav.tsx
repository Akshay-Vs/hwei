import ProfileDropdown from '@/components/specific/nav/components/account-selector/account-selector';
import React from 'react';
import NotificationButton from './components/notification-button/notification-button';
import SettingsButton from './components/settings-button/settings-button';
import StoreSelector from './components/store-selector/store-selector';
import RouteTitle from './components/route-title/route-title';

const Nav = () => {
	return (
		<nav className="flex justify-between items-center ">
			<div className="full flex items-center gap-24">
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

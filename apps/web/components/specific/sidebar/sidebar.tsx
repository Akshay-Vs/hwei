import Logo from '@/components/shared/branding/logo';
import React from 'react';
import SidebarButtons from './sidebar-buttons';

const Sidebar = () => {
	return (
		<aside className="h-full w-28 relative py-5">
			<div className="shadow-[rgba(0,_0,_0,_0.08)_0px_25px_50px_-12px] bg-highlight rounded-base full flex flex-col justify-between items-center gap-5 px-5 py-8">
				<SidebarButtons />
				<Logo />
			</div>
		</aside>
	);
};

export default Sidebar;

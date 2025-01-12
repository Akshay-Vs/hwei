import Logo from '@/components/shared/branding/logo';
import React from 'react';
import SidebarButtons from './sidebar-buttons';

const Sidebar = () => {
	return (
		<aside className="h-[calc(100vh-7rem)] w-24 mt-28 fixed top-0 left-5 z-20 center">
			<div className="shadow-[rgba(0,_0,_0,_0.08)_0px_25px_50px_-12px] bg-highlight rounded-base flex flex-col justify-between items-center px-5 py-6 gap-5 h-[96%]">
				<SidebarButtons />
				<Logo />
			</div>
		</aside>
	);
};

export default Sidebar;

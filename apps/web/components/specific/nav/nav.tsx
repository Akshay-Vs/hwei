import ProfileDropdown from '@/components/shared/profile-dropdown/profile-dropdown';
import React from 'react';

const Nav = () => {
	return (
		<nav className="flex justify-between items-center ">
			<div className="full">
				<ProfileDropdown />
			</div>
		</nav>
	);
};

export default Nav;

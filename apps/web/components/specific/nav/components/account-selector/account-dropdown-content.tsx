'use client';
import Image from 'next/image';
import React, { useTransition } from 'react';

import { Dropdown } from '@/components/shared/dropdown/dropdown';
import { Separator } from '@hwei/ui/shadcn/separator';

import AccountDropdownActions from './account-dropdown-actions';
import AddNewAccount from './add-new-account';
import { DropdownProps } from '@/types/dropdown-props';
import { useAuth, useClerk } from '@clerk/nextjs';
import ClickableDiv from '@/components/shared/clickable/clickable-div';

type UserData = {
	id: string;
	name: string;
	image: string;
	email: string;
	isSelected: boolean;
};

const AccountDropdownContent = ({ isOpen, onClose }: DropdownProps) => {
	const { client, setActive } = useClerk();
	const { sessionId, isLoaded } = useAuth();
	const [isPending, startPending] = useTransition();

	if (!isLoaded) return null;

	const availableSession = client.sessions;

	const users: UserData[] = availableSession
		.map((session) => {
			const user = session.user;
			if (!user || !user.fullName) return null;

			return {
				id: session.id,
				name: user.fullName,
				image: user.imageUrl,
				email: user.emailAddresses[0]?.toString() || '',
				isSelected: session.id === sessionId,
			};
		})
		.filter((user): user is UserData => user !== null)
		.sort((a, b) => a.name.localeCompare(b.name));

	const selectedUser = (id: string) => {
		startPending(async () => await setActive({ session: id }));
	};

	return (
		<Dropdown
			isOpen={isOpen}
			onClose={onClose}
			labelledBy="account-selector"
			describedBy="account-selector-desc"
			className="w-96 gap-4"
		>
			{users.map((user) => {
				if (!user) return null;
				return (
					<ClickableDiv
						className={`w-full flex items-center gap-1 p-4 rounded-base cursor-pointer transition-all duration-300 ${user.isSelected ? 'bg-accent/20 hover:bg-accent/30' : 'hover:bg-accent/5'}`}
						key={user.id}
						onClick={() => selectedUser(user.id)}
						aria-label={`${user.name}'s account`}
						aria-pressed={user.isSelected}
						loading={isPending}
					>
						<Image
							src={user.image}
							width={50}
							height={50}
							alt={`${user.name}'s profile picture`}
							className="w-12 h-12 rounded-full mr-2 object-center object-cover"
						/>
						<div className="flex flex-col flex-1 overflow-hidden w-48">
							<p className="text-base font-semibold text-secondary truncate">
								{user.name}
							</p>
							<p className="text-sm font-normal text-secondary truncate">
								{user.email}
							</p>
						</div>

						{user.isSelected === true ? <AccountDropdownActions /> : null}
					</ClickableDiv>
				);
			})}

			<Separator className="opacity-30" />
			<AddNewAccount />
		</Dropdown>
	);
};

export default AccountDropdownContent;

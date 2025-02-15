import { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { getIcons } from '@/actions/get-icons';
import TextInput from './text-input';
import { Button } from '@hwei/ui/shadcn/button';

export default function IconSelector() {
	const [search, setSearch] = useState('');
	const [icons, setIcons] = useState<string[]>([]);
	const [selectedIcon, setSelectedIcon] = useState('');
	const [focusedIndex, setFocusedIndex] = useState(-1);

	useEffect(() => {
		if (!search) {
			setIcons([]);
			setFocusedIndex(-1);
			return;
		}

		const fetchIcons = async () => {
			const results = await getIcons(search, 6);
			setIcons(results);
			setFocusedIndex(results.length > 0 ? 0 : -1);
		};

		fetchIcons();
	}, [search]);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (icons.length === 0) return;

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				setFocusedIndex((prev) => (prev < icons.length - 1 ? prev + 1 : prev));
				break;
			case 'ArrowUp':
				e.preventDefault();
				setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
				break;
			case 'Enter':
				e.preventDefault();
				if (focusedIndex >= 0) {
					if (icons[focusedIndex]) {
						setSelectedIcon(icons[focusedIndex]);
					}
					setSearch('');
				}
				break;
			case 'Escape':
				e.preventDefault();
				setSearch('');
				break;
		}
	};

	const IconComponent =
		(LucideIcons as any)[selectedIcon] || LucideIcons['Store'];

	return (
		<>
			<div className="flex items-center gap-2">
				<Button
					variant="ghost"
					type="button"
					tooltip={selectedIcon}
					className="flex flex-col items-center bg-slate-100/50 border border-accent p-2 h-[3.25rem] w-14 center rounded-xl"
				>
					<IconComponent className="h-6 w-6" />
				</Button>
				<TextInput
					type="text"
					placeholder={
						selectedIcon
							? `selected '${selectedIcon.replace('Icon', '')}' icon`
							: 'Search icons...'
					}
					className="flex-1 outline-none"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
			</div>
			<div className="w-[90%] overflow-auto h-fit ml-12">
				{icons.map((icon, index) => {
					const Icon = LucideIcons[
						icon as keyof typeof LucideIcons
					] as React.ElementType;
					return (
						<Button
							variant="ghost"
							key={icon}
							className={`flex items-center justify-start gap-2 cursor-pointer rounded-xl px-4 h-10 my-1 w-full ${
								index === focusedIndex ? 'bg-gray-200' : 'hover:bg-gray-200/50'
							}`}
							onClick={() => {
								setSelectedIcon(icon);
								setSearch('');
							}}
						>
							<Icon size={20} />
							<span>{icon}</span>
						</Button>
					);
				})}
			</div>
		</>
	);
}

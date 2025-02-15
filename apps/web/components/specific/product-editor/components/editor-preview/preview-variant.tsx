import { Button } from '@hwei/ui/shadcn/button';
import { cn } from '@hwei/ui/utils/cn';
import Image from 'next/image';
import React, { useState } from 'react';

const PreviewVariants = () => {
	const variants = [
		{
			id: '1DS3H',
			src: 'https://23ujkrayxy.ufs.sh/f/u628d5y0J6C1QjE9DBYwRG3i8a6KDvpXeBrV5mTsj9AbuIOo',
			label: 'White',
		},
		{
			id: '78OYH',
			src: 'https://23ujkrayxy.ufs.sh/f/u628d5y0J6C1QjE9DBYwRG3i8a6KDvpXeBrV5mTsj9AbuIOo',
			label: 'Blue',
		},
		{
			id: '7GUYA',
			src: 'https://23ujkrayxy.ufs.sh/f/u628d5y0J6C1QjE9DBYwRG3i8a6KDvpXeBrV5mTsj9AbuIOo',
			label: 'Black',
		},
	];

	const [selected, setSelected] = useState(variants[0]?.id);
	return (
		<div className="flex gap-2 w-full py-3">
			{variants.map((variant) => (
				<Button
					variant="ghost"
					className="h-16 w-16 col-center gap-2 cursor-pointer"
					onClick={() => setSelected(variant.id)}
					key={variant.id}
				>
					<Image
						width={220}
						height={220}
						src={variant.src}
						alt={variant.label}
						className={cn(
							'full object-center object-cover rounded-2xl !h-14 !w-14 aspect-square border-2 transition-colors duration-300',
							selected === variant.id ? 'border-accent' : 'border-secondary/50'
						)}
					/>
					<p className="text-base text-center">{variant.label}</p>
				</Button>
			))}
		</div>
	);
};

export default PreviewVariants;

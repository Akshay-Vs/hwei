import React from 'react';
import EditorCard from './editor-card';
import Image from 'next/image';
import { cn } from '@hwei/ui/utils/cn';
import { Plus } from 'lucide-react';
import { Button } from '@hwei/ui/shadcn/button';

const ProductVariants = () => {
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

	return (
		<EditorCard
			title="Variants"
			className="flex flex-col gap-5"
			header={
				<Button>
					<p className="text-base">Add Variant</p>
					<Plus className="h-5 w-5 text-white" />
				</Button>
			}
		>
			<div className="px-2 flex flex-col gap-2 h-full">
				<h3 className="text-base">Colors</h3>
				<div className="flex gap-2 full items-start h-16">
					{variants.map((variant) => (
						<div
							className="h-full w-16 col-center gap-2 cursor-pointer"
							key={variant.id}
						>
							<Image
								width={220}
								height={220}
								src={variant.src}
								alt={variant.label}
								className={cn(
									'full object-center object-cover rounded-2xl !h-14 !w-14 aspect-square border-2 transition-colors duration-300 border-secondary/50'
								)}
							/>
							<p className="text-sm text-center">{variant.label}</p>
						</div>
					))}

					<div className="h-14 w-14 center cursor-pointer bg-slate-100/50 border-2 border-secondary/50 rounded-2xl">
						<Button variant="ghost">
							<Plus className="h-5 w-5 text-secondary/80" />
						</Button>
					</div>
				</div>
			</div>
		</EditorCard>
	);
};

export default ProductVariants;

'use client';
import { Button } from '@hwei/ui/shadcn/button';
import { Upload } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

const PreviewProductImages = () => {
	const images: string[] = [
		'https://23ujkrayxy.ufs.sh/f/u628d5y0J6C1QjE9DBYwRG3i8a6KDvpXeBrV5mTsj9AbuIOo',
		'https://images.pexels.com/photos/6776614/pexels-photo-6776614.jpeg',
		'https://images.pexels.com/photos/10195370/pexels-photo-10195370.jpeg',
		'https://images.pexels.com/photos/29342151/pexels-photo-29342151/free-photo-of-modern-sports-shoes-on-wooden-background.jpeg',
	];

	const [currentImage, setCurrentImage] = useState(images[0]);
	const handleImageClick = (image: string) => {
		setCurrentImage(image);
	};
	return (
		<div className="flex gap-4 h-[32rem]">
			{currentImage ? (
				<>
					<div className="full shadow-accent overflow-hidden rounded-3xl">
						<Image
							width={730}
							height={550}
							alt="Product Image"
							src={currentImage}
							className="shadow-md full object-cover object-center hover:scale-110 transition-transform duration-300"
						/>
					</div>

					{images.length > 0 && (
						<div className="flex flex-col gap-4 h-full overflow-auto pb-2">
							{images.map((image, index) => (
								<Image
									key={index}
									width={208}
									height={128}
									alt="Product Image"
									src={image}
									className={`min-h-48 max-h-48 w-52 shadow-md shadow-accent rounded-3xl object-cover object-center cursor-pointer ${
										currentImage === image ? 'border-2 border-accent' : ''
									}`}
									onClick={() => handleImageClick(image)}
								/>
							))}

							<Button
								variant="ghost"
								className="min-h-48 max-h-48 w-full border-2 border-secondary/50 bg-slate-100/80  shadow-accent !rounded-3xl object-cover object-center cursor-pointer center p-0"
							>
								<Upload className="h-8 w-8" />
							</Button>
						</div>
					)}
				</>
			) : (
				<div className="full bg-slate-100 center rounded-3xl">
					<Button variant="ghost" className="h-full w-full p-0 center">
						<Image
							width={730}
							height={550}
							alt="Product Image"
							src="/static/image-placeholder.svg"
							className="full object-cover object-center"
						/>
					</Button>
				</div>
			)}
		</div>
	);
};

export default PreviewProductImages;

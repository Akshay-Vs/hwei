'use client';
import Image from 'next/image';
import React, { useState } from 'react';

const PreviewProductImages = () => {
	const images = [
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
		<div className="flex gap-4 h-[60%]">
			{currentImage && (
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

					<div className="flex flex-col gap-4 h-full overflow-auto pb-2">
						{images.map((image, index) => (
							<Image
								key={index}
								width={208}
								height={128}
								alt="Product Image"
								src={image}
								className={`full min-h-32 max-w-52  aspect-square shadow-md shadow-accent rounded-3xl object-cover object-center cursor-pointer ${
									currentImage === image ? 'border-2 border-accent' : ''
								}`}
								onClick={() => handleImageClick(image)}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default PreviewProductImages;

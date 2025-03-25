import { Button } from '@hwei/ui/shadcn/button';
import { Loader2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React, { useState, useTransition } from 'react';

interface UploadPreviewProps {
	image: string;
	handleDeleteImage: () => void;
}

const UploadPreview = ({ image, handleDeleteImage }: UploadPreviewProps) => {
	const [isPending, startPending] = useTransition();
	const [isImageLoading, setImageLoading] = useState(true);

	return (
		<div className="h-64 w-full relative rounded-2xl overflow-hidden">
			{isImageLoading && (
				<div className="absolute inset-0 flex items-center justify-center bg-slate-200">
					<Loader2 className="animate-spin text-primary" />
				</div>
			)}
			<Image
				src={image}
				alt="Variant item image"
				className="w-full h-full object-contain rounded-2xl  object-center relative z-10"
				width={420}
				height={256}
				loading="eager"
				onLoadingComplete={() => setImageLoading(false)}
			/>
			<div className="absolute top-5 right-5 z-10">
				{isPending ? (
					<Loader2 className="animate-spin text-red-500" />
				) : (
					<Button
						variant="destructive"
						size="icon"
						onClick={() => startPending(handleDeleteImage)}
					>
						<Trash2 size={20} />
					</Button>
				)}
			</div>
		</div>
	);
};

export default UploadPreview;

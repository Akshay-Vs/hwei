import React from 'react';

import { UploadDropzone } from '@/utils/uploadthing/uploadting';
import { ClientUploadedFileData } from 'uploadthing/types';
import { UploadThingError } from 'uploadthing/server';

interface ImageUploadDropzoneProps {
  loading: boolean;
  endpoint?: string;
  onClientUploadComplete: (res: ClientUploadedFileData<unknown>[]) => void;
  onUploadError: (error: UploadThingError) => void;
}

const ImageUploadDropzone = ({loading, endpoint="productImage", onClientUploadComplete, onUploadError}: ImageUploadDropzoneProps) => {
	return (
		<UploadDropzone
			disabled={loading}
			endpoint={endpoint}
			onClientUploadComplete={onClientUploadComplete}
			onUploadError={onUploadError}
			appearance={{
				button:
					'bg-primary text-primary-foreground hover:bg-primary/90 data-[state=disabled]:bg-primary/70 data-[state=ready]:bg-primary data-[state=readying]:bg-primary/70 data-[state=uploading]:bg-secondary/80 after:bg-secondary focus-within:ring-primary !rounded-base',
				container: 'rounded-[1rem] h-64 w-full',
			}}
		/>
	);
};

export default React.memo(ImageUploadDropzone);

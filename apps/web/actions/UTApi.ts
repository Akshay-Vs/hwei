'use server';
import { UTApi } from 'uploadthing/server';

const utapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN,
});

export type DeleteFileResponse = {
  success: boolean;
  error?: string;
};

export async function deleteFile(fileUrl: string): Promise<DeleteFileResponse> {
  // TODO: authenticate the user before deleting the file
  try {
    if (!fileUrl) {
      return {
        success: false,
        error: 'File URL is required'
      };
    }

    // Extract the file key from the URL
    const fileKey = fileUrl.split('/').pop();
    
    if (!fileKey) {
      return {
        success: false,
        error: 'Invalid file URL'
      };
    }

    console.log('Deleting file with key:', fileKey);
    const res = await utapi.deleteFiles([fileKey]);
    console.log('Delete response:', res);
    
    return {
      success: true
    };
  } catch (error) {
    console.error('Delete error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete file'
    };
  }
}
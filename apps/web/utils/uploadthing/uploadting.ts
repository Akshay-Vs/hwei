import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import { uploadFileRouter } from "./core";

export const UploadButton: ReturnType<typeof generateUploadButton<uploadFileRouter>> = generateUploadButton<uploadFileRouter>();
export const UploadDropzone = generateUploadDropzone<uploadFileRouter>();
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const MAXFILESIZE = "4MB";
const MAXFILECOUNT = 1;

export const uploadFileRouter: FileRouter = {
  productImage: f({
    image: { maxFileSize: MAXFILESIZE, maxFileCount: MAXFILECOUNT },
  })
  .middleware(async ({ req }) => {
    const user = {id: 'user123'}; // TODO: add authentication here
    if (!user) throw new Error("Unauthorized");
    return { userId: user.id };
  })
  .onUploadComplete(async ({ metadata, file }) => {
    const userId = (metadata as any).userId;
    console.log("Upload complete for userId:", userId);
    console.log("file url", file.ufsUrl);
  }),
} satisfies FileRouter;

export type uploadFileRouter = typeof uploadFileRouter;
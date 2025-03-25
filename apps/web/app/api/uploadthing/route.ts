import { createRouteHandler } from "uploadthing/next";
import { uploadFileRouter } from "@/utils/uploadthing/core";

export const { GET, POST } = createRouteHandler({
  router: uploadFileRouter,
  config: {},
});
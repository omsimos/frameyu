import { createRouteHandler } from "uploadthing/next";
import { imgFileRouter } from "./core";

export const { GET, POST } = createRouteHandler({
  router: imgFileRouter,
});

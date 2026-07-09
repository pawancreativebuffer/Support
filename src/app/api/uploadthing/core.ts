import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  ticketAttachment: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
    pdf: { maxFileSize: "8MB", maxFileCount: 1 },
    text: { maxFileSize: "4MB", maxFileCount: 1 },
    blob: { maxFileSize: "16MB", maxFileCount: 1 }
  })
    .middleware(async () => {
      // We return a mock user context here for local/dev use
      return { userId: "portal-user" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("File upload completed. Metadata:", metadata);
      console.log("Uploaded file URL:", file.url);
      return { url: file.url, name: file.name };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

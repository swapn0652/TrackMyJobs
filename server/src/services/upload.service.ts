export const uploadResumeService = (file: Express.Multer.File) => {
  if (!file) {
    throw new Error("No file uploaded");
  }

  return {
    path: `/uploads/${file.filename}`,
  };
};

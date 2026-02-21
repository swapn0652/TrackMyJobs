import { axiosClient } from "@/utils/axiosClient";

export const uploadResumeService = async (file: File) => {
  const formData = new FormData();
  formData.append("resume", file);

  const res = await axiosClient.post("/api/upload/resume", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data; // { path: '/uploads/filename.pdf' }
};
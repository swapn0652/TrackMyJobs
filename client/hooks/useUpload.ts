"use client";

import { useMutation } from "@tanstack/react-query";
import { uploadResumeService } from "@/services/upload.service";

// Hook for resume/file upload
export const useUpload = () => {
  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadResumeService(file),
  });

  return {
    uploadFile: uploadMutation.mutateAsync,             
    uploading: uploadMutation.isPending,    
    uploadError: uploadMutation.error,                 
  };
};
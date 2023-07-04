import apiClient from "../client";

const uploadFile = (file, file_path) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("file_path", file_path);
  return apiClient.post("/api/v1/files/upload", formData, {
    headers: {
      "content-type": file.type,
    },
  });
};

export default {
  uploadFile,
};

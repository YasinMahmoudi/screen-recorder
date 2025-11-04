export const uploadFileToBunny = async function (
  file: File,
  uploadUrl: string,
  accessKey: string,
): Promise<void> {
  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
      AccessKey: accessKey,
    },
    body: file,
  });

  if (!response.ok)
    throw new Error(`Upload failed with status ${response.status}`);
};

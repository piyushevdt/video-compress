export async function compressVideo(file, quality) {
  // Placeholder compression logic
  const originalSize = (file.size / (1024 * 1024)).toFixed(2);

  const factor = quality === "low" ? 0.3 : quality === "medium" ? 0.5 : 0.7;
  const compressedSize = (originalSize * factor).toFixed(2);

  return {
    originalSize,
    compressedSize,
    url: URL.createObjectURL(file),
  };
}

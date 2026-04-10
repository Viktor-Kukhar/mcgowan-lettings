const MAX_WIDTH = 1600;
const MAX_HEIGHT = 1600;
const QUALITY = 0.75;

const SUPPORTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function compressImage(file: File): Promise<File> {
  // Reject unsupported formats (e.g. HEIC from iPhones)
  if (!SUPPORTED_TYPES.includes(file.type) && !file.type.startsWith("image/")) {
    return file;
  }

  // Check for HEIC/HEIF — these won't render in most browsers
  if (
    file.type === "image/heic" ||
    file.type === "image/heic-sequence" ||
    file.type === "image/heif" ||
    file.name.toLowerCase().endsWith(".heic") ||
    file.name.toLowerCase().endsWith(".heif")
  ) {
    throw new Error(
      "HEIC format is not supported. Please change your iPhone camera settings to \"Most Compatible\" (Settings → Camera → Formats), or select a JPG/PNG file."
    );
  }

  // Skip if already small (under 500KB)
  if (file.size < 500 * 1024) return file;

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;

      // Scale down if exceeds max dimensions
      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob || blob.size >= file.size) {
            // Compression didn't help, use original
            resolve(file);
            return;
          }
          const compressed = new File([blob], file.name.replace(/\.\w+$/, ".jpg"), {
            type: "image/jpeg",
            lastModified: Date.now(),
          });
          resolve(compressed);
        },
        "image/jpeg",
        QUALITY
      );
    };
    img.onerror = () => resolve(file);
    img.src = URL.createObjectURL(file);
  });
}

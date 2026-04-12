"use client";

import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

let ffmpegInstance: FFmpeg | null = null;
let loadPromise: Promise<FFmpeg> | null = null;

const CORE_BASE = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd";

async function loadFFmpeg(): Promise<FFmpeg> {
  if (ffmpegInstance) return ffmpegInstance;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const ffmpeg = new FFmpeg();
    await ffmpeg.load({
      coreURL: await toBlobURL(`${CORE_BASE}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${CORE_BASE}/ffmpeg-core.wasm`, "application/wasm"),
    });
    ffmpegInstance = ffmpeg;
    return ffmpeg;
  })();

  return loadPromise;
}

export type TranscodeStage = "loading" | "transcoding";

export async function transcodeVideoToMp4(
  file: File,
  onProgress?: (stage: TranscodeStage, ratio: number) => void
): Promise<File> {
  if (!ffmpegInstance) onProgress?.("loading", 0);
  const ffmpeg = await loadFFmpeg();

  const progressHandler = ({ progress }: { progress: number }) => {
    onProgress?.("transcoding", Math.max(0, Math.min(1, progress)));
  };
  ffmpeg.on("progress", progressHandler);

  const ext = (file.name.match(/\.[^.]+$/)?.[0] || ".mov").toLowerCase();
  const inputName = `input${ext}`;
  const outputName = "output.mp4";

  try {
    await ffmpeg.writeFile(inputName, await fetchFile(file));

    await ffmpeg.exec([
      "-i", inputName,
      "-vf", "scale=1920:1920:force_original_aspect_ratio=decrease:force_divisible_by=2,format=yuv420p",
      "-c:v", "libx264",
      "-preset", "ultrafast",
      "-crf", "26",
      "-pix_fmt", "yuv420p",
      "-color_primaries", "bt709",
      "-color_trc", "bt709",
      "-colorspace", "bt709",
      "-an",
      "-movflags", "+faststart",
      outputName,
    ]);

    const data = await ffmpeg.readFile(outputName);
    const bytes = data instanceof Uint8Array ? new Uint8Array(data) : new TextEncoder().encode(data);
    const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "video/mp4" });
    const newName = file.name.replace(/\.[^.]+$/, "") + ".mp4";

    return new File([blob], newName, { type: "video/mp4" });
  } finally {
    ffmpeg.off("progress", progressHandler);
    try { await ffmpeg.deleteFile(inputName); } catch {}
    try { await ffmpeg.deleteFile(outputName); } catch {}
  }
}

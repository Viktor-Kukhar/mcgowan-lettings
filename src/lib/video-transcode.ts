"use client";

import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

let ffmpegInstance: FFmpeg | null = null;
let loadPromise: Promise<FFmpeg> | null = null;

const CORE_BASE = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd";

export const MAX_VIDEO_BYTES = 500 * 1024 * 1024;
const TRANSCODE_TIMEOUT_MS = 10 * 60 * 1000;

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

  let timedOut = false;
  const timeoutId = setTimeout(() => {
    timedOut = true;
    try { ffmpeg.terminate(); } catch {}
    ffmpegInstance = null;
    loadPromise = null;
  }, TRANSCODE_TIMEOUT_MS);

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

    if (timedOut) {
      throw new Error("Video conversion timed out. Try a shorter or smaller video.");
    }

    const data = await ffmpeg.readFile(outputName);
    const bytes = data instanceof Uint8Array ? new Uint8Array(data) : new TextEncoder().encode(data);
    const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "video/mp4" });
    const newName = file.name.replace(/\.[^.]+$/, "") + ".mp4";

    return new File([blob], newName, { type: "video/mp4" });
  } finally {
    clearTimeout(timeoutId);
    ffmpeg.off("progress", progressHandler);
    if (!timedOut) {
      try { await ffmpeg.deleteFile(inputName); } catch {}
      try { await ffmpeg.deleteFile(outputName); } catch {}
    }
  }
}

import { videos } from "@/drizzle/schema";
import { ClassValue, clsx } from "clsx";
import { ilike, sql } from "drizzle-orm";
import { twMerge } from "tailwind-merge";

interface ApiFetchOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: object;
  expectJson?: boolean;
  bunnyType: "stream" | "storage";
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function differenceDate(date: Date): string {
  const input = new Date(date);
  const now = new Date();

  const timeDiffrence = now.getTime() - input.getTime();

  const daysDifference = Math.floor(timeDiffrence / (1000 * 60 * 60 * 24));

  if (daysDifference === 0) return "Today";
  if (daysDifference === 1) return "Yesterday";
  if (daysDifference <= 7) return `${daysDifference} days ago`;
  if (daysDifference <= 30) return `${Math.ceil(daysDifference / 7)} weeks ago`;
  if (daysDifference <= 365) {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(input);
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(input);
}

export const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env: ${key}`);
  return value;
};

// API fetch helper with required Bunny CDN options
export const apiFetch = async <T = Record<string, unknown>>(
  url: string,
  options: Omit<ApiFetchOptions, "bunnyType"> & {
    bunnyType: "stream" | "storage";
  },
): Promise<T> => {
  const {
    method = "GET",
    headers = {},
    body,
    expectJson = true,
    bunnyType,
  } = options;

  const key = getEnv(
    bunnyType === "stream"
      ? "BUNNY_STREAM_ACCESS_KEY"
      : "BUNNY_STORAGE_ACCESS_KEY",
  );

  const requestHeaders = {
    ...headers,
    AccessKey: key,
    ...(bunnyType === "stream" && {
      accept: "application/json",
      ...(body && { "content-type": "application/json" }),
    }),
  };

  const requestOptions: RequestInit = {
    method,
    headers: requestHeaders,
    ...(body && { body: JSON.stringify(body) }),
  };

  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    throw new Error(`API error ${response.text()}`);
  }

  if (method === "DELETE" || !expectJson) {
    return true as T;
  }

  return await response.json();
};

// Error wrapper for async functions
export const withErrorHandling = <T, A extends unknown[]>(
  fn: (...args: A) => Promise<T>,
) => {
  return async (...args: A): Promise<T> => {
    try {
      const result = await fn(...args);
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      return errorMessage as unknown as T;
    }
  };
};

export const getOrderByClause = (filter?: string) => {
  switch (filter) {
    case "most-viewed":
      return sql`${videos.views} DESC`;
    case "oldest-first":
      return sql`${videos.views} ASC`;
    case "least-viewed":
      return sql`${videos.createdAt} ASC`;
    case "moset-recent":
    default:
      return sql`${videos.createdAt} DESC`;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const doesTitleMatch = (videos: any, searchQuery: string) =>
  ilike(
    sql`REPLACE(REPLACE(REPLACE(LOWER(${videos.title}), '-', ''), '.', ''), ' ', '')`,
    `%${searchQuery.replace(/[-. ]/g, "").toLowerCase()}%`,
  );

interface MediaStreams {
  displayStream: MediaStream;
  micStream: MediaStream | null;
  hasDisplayAudio: boolean;
}

interface RecordingHandlers {
  onDataAvailable: (e: BlobEvent) => void;
  onStop: () => void;
}

export const DEFAULT_VIDEO_CONFIG = {
  width: { ideal: 1920 },
  height: { ideal: 1080 },
  frameRate: { ideal: 30 },
};

export const DEFAULT_RECORDING_CONFIG = {
  mimeType: "video/webm;codecs=vp9,opus",
  audioBitsPerSecond: 128000,
  videoBitsPerSecond: 2500000,
};

export const getMediaStreams = async (
  withMic: boolean,
): Promise<MediaStreams> => {
  const displayStream = await navigator.mediaDevices.getDisplayMedia({
    video: DEFAULT_VIDEO_CONFIG,
    audio: true,
  });

  const hasDisplayAudio = displayStream.getAudioTracks().length > 0;
  let micStream: MediaStream | null = null;

  if (withMic) {
    micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    micStream
      .getAudioTracks()
      .forEach((track: MediaStreamTrack) => (track.enabled = true));
  }

  return { displayStream, micStream, hasDisplayAudio };
};

export const createAudioMixer = (
  ctx: AudioContext,
  displayStream: MediaStream,
  micStream: MediaStream | null,
  hasDisplayAudio: boolean,
) => {
  if (!hasDisplayAudio && !micStream) return null;

  const destination = ctx.createMediaStreamDestination();
  const mix = (stream: MediaStream, gainValue: number) => {
    const source = ctx.createMediaStreamSource(stream);
    const gain = ctx.createGain();
    gain.gain.value = gainValue;
    source.connect(gain).connect(destination);
  };

  if (hasDisplayAudio) mix(displayStream, 0.7);
  if (micStream) mix(micStream, 1.5);

  return destination;
};

export const setupMediaRecorder = (stream: MediaStream) => {
  try {
    return new MediaRecorder(stream, DEFAULT_RECORDING_CONFIG);
  } catch {
    return new MediaRecorder(stream);
  }
};

export const getVideoDuration = (url: string): Promise<number | null> =>
  new Promise((resolve) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      const duration =
        isFinite(video.duration) && video.duration > 0
          ? Math.round(video.duration)
          : null;
      URL.revokeObjectURL(video.src);
      resolve(duration);
    };
    video.onerror = () => {
      URL.revokeObjectURL(video.src);
      resolve(null);
    };
    video.src = url;
  });

export const setupRecording = (
  stream: MediaStream,
  handlers: RecordingHandlers,
): MediaRecorder => {
  const recorder = new MediaRecorder(stream, DEFAULT_RECORDING_CONFIG);
  recorder.ondataavailable = handlers.onDataAvailable;
  recorder.onstop = handlers.onStop;
  return recorder;
};

export const cleanupRecording = (
  recorder: MediaRecorder | null,
  stream: MediaStream | null,
  originalStreams: MediaStream[] = [],
) => {
  if (recorder?.state !== "inactive") {
    recorder?.stop();
  }

  stream?.getTracks().forEach((track: MediaStreamTrack) => track.stop());
  originalStreams.forEach((s) =>
    s.getTracks().forEach((track: MediaStreamTrack) => track.stop()),
  );
};

export const createRecordingBlob = (
  chunks: Blob[],
): { blob: Blob; url: string } => {
  const blob = new Blob(chunks, { type: "video/webm" });
  const url = URL.createObjectURL(blob);
  return { blob, url };
};

export const calculateRecordingDuration = (startTime: number | null): number =>
  startTime ? Math.round((Date.now() - startTime) / 1000) : 0;

interface TranscriptEntry {
  time: string;
  text: string;
}

export function formateTranscriptString(transcript: string): TranscriptEntry[] {
  const lines = transcript.replace(/^WEBVTT\s*/, "").split("\n");
  const result: TranscriptEntry[] = [];
  let tempText: string[] = [];
  let startTime: string | null = null;

  for (const line of lines) {
    const trimmedLine = line.trim();
    const timeMatch = trimmedLine.match(
      /(\d{2}:\d{2}:\d{2})\.\d{3}\s-->\s(\d{2}:\d{2}:\d{2})\.\d{3}/,
    );

    if (timeMatch) {
      if (tempText.length > 0 && startTime) {
        result.push({ time: startTime, text: tempText.join(" ") });
        tempText = [];
      }
      startTime = timeMatch[1] ?? null;
    } else if (trimmedLine) {
      tempText.push(trimmedLine);
    }

    if (tempText.length >= 3 && startTime) {
      result.push({ time: startTime, text: tempText.join(" ") });
      tempText = [];
      startTime = null;
    }
  }

  if (tempText.length > 0 && startTime) {
    result.push({ time: startTime, text: tempText.join(" ") });
  }

  return result;
}

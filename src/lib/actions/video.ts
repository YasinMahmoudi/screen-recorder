"use server";

import { db } from "@/drizzle/db";
import { videos } from "@/drizzle/schema";
import { auth } from "@/lib/auth";
import { BUNNY } from "@/lib/constants";
import { apiFetch, getEnv, withErrorHandling } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

const VIDEO_STREAM_BASE_URL = BUNNY.STREAM_BASE_URL;
const THUMBNAIL_STORAGE_BASE_URL = BUNNY.STORAGE_BASE_URL;
const THUMBNAIL_CDN_URL = BUNNY.CDN_URL;
const BUNNY_LIBRARY_ID = getEnv("BUNNY_LIBRARY_ID");
const ACCESS_KEYS = {
  streamAccessKey: getEnv("BUNNY_STREAM_ACCESS_KEY"),
  storageAccessKey: getEnv("BUNNY_STORAGE_ACCESS_KEY"),
};

type Visibility = "public" | "private";

interface VideoDetails {
  videoId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  tags?: string | string[];
  visibility: Visibility;
  duration?: number | null;
}

async function getSessionId(): Promise<string> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("You are not signed in");

  return session.user.id;
}

export const getVideoUploadUrl = withErrorHandling(async function () {
  await getSessionId();

  const videoResponse = await apiFetch(
    `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_ID}/videos`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: { title: "Test Title", collectionId: "" },
      bunnyType: "stream",
    },
  );

  const uploadUrl = `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_ID}/videos/${videoResponse.guid}`;

  return {
    videoId: videoResponse.guid,
    uploadUrl,
    accessKey: ACCESS_KEYS.streamAccessKey,
  };
});

export const getThumbnailUploadUrl = withErrorHandling(
  async (videoId: string) => {
    const timestampedFileName = `${Date.now()}-${videoId}-thumbnail`;
    const uploadUrl = `${THUMBNAIL_STORAGE_BASE_URL}/thumbnails/${timestampedFileName}`;
    const cdnUrl = `${THUMBNAIL_CDN_URL}/thumbnails/${timestampedFileName}`;

    return {
      uploadUrl,
      cdnUrl,
      accessKey: ACCESS_KEYS.storageAccessKey,
    };
  },
);

export const saveVideoDetails = withErrorHandling(
  async (videoDetails: VideoDetails) => {
    const userId = await getSessionId();

    await apiFetch(
      `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_ID}/videos/${videoDetails.videoId}`,
      {
        method: "POST",
        bunnyType: "stream",
        body: {
          title: videoDetails.title,
          description: videoDetails.description,
        },
      },
    );

    const now = new Date();

    await db.insert(videos).values({
      ...videoDetails,
      videoUrl: `${BUNNY.EMBED_URL}/${BUNNY_LIBRARY_ID}/${videoDetails.videoId}`,
      userId,
      createdAt: now,
      updatedAt: now,
    });

    revalidatePath("/");

    return { videoId: videoDetails.videoId };
  },
);

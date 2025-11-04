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
    case "Most Viewed":
      return sql`${videos.views} DESC`;
    case "Least Viewed":
      return sql`${videos.views} ASC`;
    case "Oldest First":
      return sql`${videos.createdAt} ASC`;
    case "Most Recent":
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

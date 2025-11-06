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

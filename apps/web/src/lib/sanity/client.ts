import type { SanityImageSource } from "@sanity/asset-utils";
import createImageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "./config";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published",
});

const imageBuilder = createImageUrlBuilder({
  projectId,
  dataset,
});

// Accepts multiple source shapes:
// - Standard SanityImageSource (image object or asset)
// - Our projection shape: { id: string, crop?, hotspot?, alt? }
// - String asset id
type ImageIdObject = { id: string; crop?: unknown; hotspot?: unknown };

const isImageIdObject = (value: unknown): value is ImageIdObject => {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return typeof record.id === "string";
};

export const urlFor = (
  source: SanityImageSource | ImageIdObject | string
) => {
  const ref: SanityImageSource =
    typeof source === "string" ? source : isImageIdObject(source) ? source.id : source;
  return imageBuilder.image(ref).auto("format").fit("max").format("webp");
};


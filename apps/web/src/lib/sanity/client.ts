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
export const urlFor = (
  source: SanityImageSource | { id?: string; crop?: unknown; hotspot?: unknown } | string
) => {
  const ref = typeof source === "string" ? source : (source as any)?.id ?? source;
  return imageBuilder
    .image(ref as SanityImageSource)
    .auto("format")
    .fit("max")
    .format("webp");
};


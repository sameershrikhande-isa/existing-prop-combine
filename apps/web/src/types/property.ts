// Mirror the GROQ query response structure for type safety
import type { PortableTextBlock } from "next-sanity";

export type PropertyImage = {
  id: string;
  preview: string;
  hotspot?: {
    x: number;
    y: number;
  };
  crop?: {
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
  alt?: string;
};

export type PropertyAgent = {
  _id: string;
  name: string;
  position: string;
  email: string;
  phone?: string;
  bio?: string;
  image?: PropertyImage;
};

export type PropertyType = {
  name: string;
  slug: string;
};

export type PropertyLocation = {
  address: string;
  city: string;
  state?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
};

export type PropertyFeatures = {
  bedrooms: number;
  bathrooms: number;
  areaSqM: number;
};

export type PropertyCardData = {
  _id: string;
  _type: string;
  title: string;
  slug: string;
  description?: string;
  price: string;
  status: "available" | "sold" | "pending";
  location: PropertyLocation;
  features: PropertyFeatures;
  mainImage?: PropertyImage;
  propertyType?: PropertyType;
  publishedAt?: string;
  orderRank?: string;
};

export type PropertyDetailData = Omit<PropertyCardData, "mainImage"> & {
  richText?: PortableTextBlock[]; // Sanity block content
  thumbnailImage?: PropertyImage;
  images?: PropertyImage[];
  amenities?: string[];
  agent?: PropertyAgent;
  brochures?: PropertyBrochure[];
  videoLink?: string;
  mapLink?: string;
};

export type PropertyBrochure = {
  title?: string;
  url: string;
};


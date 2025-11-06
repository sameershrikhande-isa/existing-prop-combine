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

export type PropertyType = {
  _id: string;
  name: string;
  slug: string;
};

export type PropertyPurpose = {
  _id: string;
  name: string;
  slug: string;
};

export type PropertyLocation = {
  address: string;
  city: string;
  state?: string;
  country?: string;
};

export type PropertyFeatures = {
  bedrooms: number;
  bathrooms: number;
};

export type PropertyAmenity = {
  _id: string;
  name: string;
  slug: string;
  iconName: string;
  category?: string;
};

export type PropertyCardData = {
  _id: string;
  _type: string;
  title: string;
  slug: string;
  description?: string;
  budgetMin: number;
  budgetMax?: number;
  carpetAreaMin: number;
  carpetAreaMax?: number;
  status: "available" | "sold" | "pending";
  location: PropertyLocation;
  features: PropertyFeatures;
  mainImage?: PropertyImage;
  propertyType?: PropertyType;
  purpose?: PropertyPurpose;
  publishedAt?: string;
  orderRank?: string;
};

export type PropertyDetailData = Omit<PropertyCardData, "mainImage"> & {
  richText?: PortableTextBlock[]; // Sanity block content
  thumbnailImage?: PropertyImage;
  images?: PropertyImage[];
  amenities?: PropertyAmenity[];
  brochures?: PropertyBrochure[];
  videos?: PropertyVideo[];
  mapLink?: string;
  highlights?: PropertyHighlight[];
};

export type PropertyBrochure = {
  title?: string;
  url: string;
};

export type PropertyHighlight = {
  title: string;
  description?: string;
  iconName: string;
};

export type PropertyVideo = {
  title?: string;
  url: string;
};


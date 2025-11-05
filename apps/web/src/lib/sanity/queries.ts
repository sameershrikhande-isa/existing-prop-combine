import { defineQuery } from "next-sanity";

// Base image fields fragment
const imageFields = /* groq */ `
  "id": asset._ref,
  "preview": asset->metadata.lqip,
  hotspot {
    x,
    y
  },
  crop {
    bottom,
    left,
    right,
    top
  },
  alt
`;

// Image fragment wrapper
const imageFragment = /* groq */ `
  {
    ${imageFields}
  }
`;

// Agent fragment for property details
const agentFragment = /* groq */ `
  agent->{
    _id,
    name,
    position,
    email,
    phone,
    bio,
    "image": image ${imageFragment}
  }
`;

// Property card fragment for listing pages
const propertyCardFragment = /* groq */ `
  _id,
  _type,
  title,
  "slug": slug.current,
  description,
  price,
  status,
  location {
    address,
    city,
    state,
    country
  },
  features {
    bedrooms,
    bathrooms,
    areaSqM
  },
  "mainImage": images[0] ${imageFragment},
  propertyType->{
    name,
    "slug": slug.current
  },
  publishedAt,
  orderRank
`;

// Rich text fragment
const richTextFragment = /* groq */ `
  richText[]{
    ...,
    _type == "block" => {
      ...,
      markDefs[]{
        ...,
        _type == "customLink" => {
          ...,
          customLink{
            openInNewTab,
            "href": select(
              type == "internal" => internal->slug.current,
              type == "external" => external,
              "#"
            )
          }
        }
      }
    },
    _type == "image" => {
      ${imageFields},
      caption
    }
  }
`;

/**
 * Query to get all properties for the listing page
 * Ordered by orderRank for manual sorting in Sanity Studio
 */
export const queryAllPropertiesData = defineQuery(`
  *[_type == "property" && status == "available"] | order(orderRank asc){
    ${propertyCardFragment}
  }
`);

/**
 * Query to get a single property by slug with full details
 */
export const queryPropertyBySlugData = defineQuery(`
  *[_type == "property" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    "slug": slug.current,
    description,
    ${richTextFragment},
    price,
    status,
    location {
      address,
      city,
      state,
      country,
      latitude,
      longitude
    },
    features {
      bedrooms,
      bathrooms,
      areaSqM
    },
    amenities,
    "images": images[] ${imageFragment},
    propertyType->{
      name,
      "slug": slug.current
    },
    ${agentFragment},
    publishedAt
  }
`);

/**
 * Query to get all property slugs for generateStaticParams
 */
export const queryPropertySlugs = defineQuery(`
  *[_type == "property" && defined(slug.current)].slug.current
`);


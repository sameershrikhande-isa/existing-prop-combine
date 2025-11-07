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

// Property card fragment for listing pages
const propertyCardFragment = /* groq */ `
  _id,
  _type,
  title,
  "slug": slug.current,
  description,
  budgetMin,
  budgetMax,
  carpetAreaMin,
  carpetAreaMax,
  status,
  location {
    address,
    city,
    state,
    country
  },
  features {
    bedrooms,
    bathrooms
  },
  "mainImage": images[0] ${imageFragment},
  propertyType->{
    _id,
    name,
    "slug": slug.current
  },
  purpose->{
    _id,
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
    budgetMin,
    budgetMax,
    carpetAreaMin,
    carpetAreaMax,
    status,
    location {
      address,
      city,
      state,
      country
    },
    features {
      bedrooms,
      bathrooms
    },
    "amenities": amenities[]->{
      _id,
      name,
      "slug": slug.current,
      iconName,
      category
    },
    highlights[]{
      title,
      description,
      iconName
    },
    "thumbnailImage": thumbnailImage ${imageFragment},
    "images": images[] ${imageFragment},
    propertyType->{
      _id,
      name,
      "slug": slug.current
    },
    purpose->{
      _id,
      name,
      "slug": slug.current
    },
    // brochures and mapLink
    "brochures": brochures[]{
      title,
      url
    },
    "videos": videos[]{
      title,
      url
    },
    mapLink,
    publishedAt
  }
`);

/**
 * Query to get all property slugs for generateStaticParams
 */
export const queryPropertySlugs = defineQuery(`
  *[_type == "property" && defined(slug.current)].slug.current
`);

/**
 * Query to get filtered properties based on search criteria
 * Supports filtering by propertyType, purpose, budget range, carpet area range, and amenities
 */
export const queryFilteredProperties = defineQuery(`
  *[
    _type == "property" 
    && status == "available"
    && (!defined($propertyTypeId) || propertyType._ref == $propertyTypeId)
    && (!defined($purposeId) || purpose._ref == $purposeId)
    && (!defined($budgetMin) || budgetMax >= $budgetMin || budgetMin >= $budgetMin)
    && (!defined($budgetMax) || budgetMin <= $budgetMax || budgetMax <= $budgetMax)
    && (!defined($carpetAreaMin) || carpetAreaMax >= $carpetAreaMin || carpetAreaMin >= $carpetAreaMin)
    && (!defined($carpetAreaMax) || carpetAreaMin <= $carpetAreaMax || carpetAreaMax <= $carpetAreaMax)
    && (!defined($amenityIds) || count((amenities[]._ref)[@ in $amenityIds]) > 0)
  ] | order(orderRank asc) {
    ${propertyCardFragment}
  }
`);

/**
 * Query to get all amenities for filter checkboxes
 */
export const queryAllAmenities = defineQuery(`
  *[_type == "amenity"] | order(orderRank asc) {
    _id,
    name,
    "slug": slug.current,
    iconName,
    category
  }
`);

/**
 * Query to get filter ranges for a specific scope (propertyType + purpose)
 */
export const queryFilterRanges = defineQuery(`
  *[
    _type == "filterRange"
    && scope->propertyType._ref == $propertyTypeId
    && scope->purpose._ref == $purposeId
    && dimension->slug.current == $dimensionSlug
  ] | order(sortOrder asc) {
    _id,
    label,
    minValue,
    maxValue,
    sortOrder,
    "dimensionName": dimension->name,
    "dimensionUnit": dimension->unit
  }
`);

/**
 * Query to get all property types
 */
export const queryAllPropertyTypes = defineQuery(`
  *[_type == "propertyType"] | order(orderRank asc) {
    _id,
    name,
    "slug": slug.current,
    description
  }
`);

/**
 * Query to get all purposes
 */
export const queryAllPurposes = defineQuery(`
  *[_type == "purpose"] | order(orderRank asc) {
    _id,
    name,
    "slug": slug.current
  }
`);

/**
 * Query to get all filter dimensions
 */
export const queryAllFilterDimensions = defineQuery(`
  *[_type == "filterDimension"] | order(orderRank asc) {
    _id,
    name,
    "slug": slug.current,
    unit
  }
`);

/**
 * Query to get home page content (testimonials and FAQs)
 */
export const queryHomePageContent = defineQuery(`
  *[_type == "homePage"][0]{
    testimonialsEnabled,
    testimonials[]{
      name,
      review,
      purpose,
      "image": image ${imageFragment}
    },
    faqsEnabled,
    faqsTitle,
    faqsDescription,
    "faqsImages": faqsImages[] ${imageFragment},
    faqs[]{
      question,
      answer
    }
  }
`);

/**
 * Query to get contact information
 */
export const queryContactInfo = defineQuery(`
  *[_type == "contactInfo"][0]{
    contactName,
    phoneNumbers,
    email
  }
`);


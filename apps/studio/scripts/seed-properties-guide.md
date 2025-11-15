# Automated Property Seeding Guide

This guide explains how to automate property creation after manually uploading images to Sanity.

## Prerequisites

1. Sanity Studio is running
2. All property images are uploaded to Sanity Media Library
3. You have noted the asset IDs for each image

## How to Get Image Asset IDs

1. Open Sanity Studio
2. Go to Media section
3. Click on an image
4. Copy the asset ID from the URL or image details (format: `image-<hash>-<dimensions>-<format>`)

## Option 1: Create Properties via Studio UI (Recommended)

The easiest approach is to use the Studio UI as described in the main MIGRATION_GUIDE.md. This gives you full control and validation.

## Option 2: Use Sanity CLI to Import Data

You can use the Sanity CLI to import data from a prepared dataset.

### Step 1: Prepare a dataset file

Create `apps/studio/data/properties-export.ndjson` with your property data following Sanity's NDJSON format.

### Step 2: Import using Sanity CLI

```bash
cd apps/studio
sanity dataset import data/properties-export.ndjson production --replace
```

## Option 3: Programmatic Creation with TypeScript Script

If you prefer to create properties programmatically:

### Step 1: Install required dependencies

```bash
cd apps/studio
pnpm add -D @sanity/cli
```

### Step 2: Create the seed script

Create `apps/studio/scripts/seed-properties.ts`:

```typescript
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // You'll need a token with write permissions
  apiVersion: '2025-02-10',
});

async function seedProperties() {
  // First, create property types
  const luxuryVillaType = await client.create({
    _type: 'propertyType',
    name: 'Luxury Villa',
    slug: { _type: 'slug', current: 'luxury-villa' },
    description: 'Exclusive luxury villas with premium amenities',
  });

  // Create an agent
  const agent = await client.create({
    _type: 'agent',
    name: 'Sarah Johnson',
    slug: { _type: 'slug', current: 'sarah-johnson' },
    position: 'Senior Property Consultant',
    email: 'sarah.johnson@example.com',
    phone: '+1 555-0123',
    bio: 'With over 10 years of experience in luxury real estate...',
    // image: { _type: 'image', asset: { _ref: 'image-ASSET_ID_HERE' } },
  });

  // Create first property
  await client.create({
    _type: 'property',
    title: 'Serenity height villas',
    slug: { _type: 'slug', current: 'serenity-height-villas' },
    description: 'Luxury villa in prime Mumbai location',
    price: '2.5 Cr',
    status: 'available',
    propertyType: { _type: 'reference', _ref: luxuryVillaType._id },
    location: {
      address: 'Serenity Height Villas',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
    },
    features: {
      bedrooms: 4,
      bathrooms: 3,
      areaSqM: 120,
    },
    amenities: ['Smart Home Integration', 'Swimming Pool', 'Garden'],
    images: [
      // Replace with actual asset IDs after uploading
      // { _type: 'image', asset: { _ref: 'image-ASSET_ID_1' }, alt: 'Main view' },
      // { _type: 'image', asset: { _ref: 'image-ASSET_ID_2' }, alt: 'Interior' },
    ],
    agent: { _type: 'reference', _ref: agent._id },
    publishedAt: new Date().toISOString(),
  });

  console.log('Properties seeded successfully!');
}

seedProperties().catch(console.error);
```

### Step 3: Get a Sanity API Token

1. Go to https://www.sanity.io/manage
2. Select your project
3. Go to API → Tokens
4. Create a new token with "Editor" permissions
5. Add to `apps/studio/.env`:
   ```
   SANITY_API_TOKEN=your-token-here
   ```

### Step 4: Run the script

```bash
cd apps/studio
tsx scripts/seed-properties.ts
```

## Important Notes

- **Manual approach is recommended** for better data validation
- Automated scripts require careful mapping of asset IDs
- Always backup your dataset before running import scripts
- Test with a single property first before bulk creation

## Recommended Approach

We recommend using the Studio UI (Option 1) for:
- Better validation
- Visual feedback
- Easier troubleshooting
- No risk of malformed data

Use automated scripts only if you have many properties and are comfortable with the Sanity API.


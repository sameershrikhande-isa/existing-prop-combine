# Properties CMS Migration Guide

This guide will help you migrate the 9 existing properties from static data to Sanity CMS.

## Prerequisites

1. Sanity Studio must be set up with environment variables
2. Both Studio and Web app should have matching Sanity project configuration

## Step 1: Set Up Environment Variables

### For Studio (`apps/studio/.env`)

Check that your studio has the required environment variables:

```env
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_TITLE=Your Studio Title
```

### For Web App (`apps/web/.env.local`)

Create this file based on `.env.local.example`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-02-10
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3333
```

**Important**: Use the SAME `project-id` and `dataset` in both files!

## Step 2: Start Sanity Studio

```bash
cd /Users/apple/Sameer/1-Projects/new/property-website/existing
pnpm --filter studio dev
```

The Studio should open at `http://localhost:3333`. You should see the new document types:
- **Agent** - Real estate agents
- **Property Type** - Categories for properties
- **Property** - Property listings

## Step 3: Create Property Types

In Sanity Studio, create these property types:

1. **Luxury Villa**
   - Slug: `luxury-villa`
   - Description: "Exclusive luxury villas with premium amenities"

2. **Residential Home**
   - Slug: `residential-home`
   - Description: "Comfortable residential homes for families"

3. **Apartment**
   - Slug: `apartment`
   - Description: "Modern apartments in prime locations"

4. **Office Space**
   - Slug: `office-space`
   - Description: "Commercial office spaces"

## Step 4: Create Agents

Create 2-3 sample agents with:
- Name, position, email, phone
- Professional photo (upload to Sanity)
- Short bio

**Example Agent:**
- Name: "Sarah Johnson"
- Position: "Senior Property Consultant"
- Email: "sarah.johnson@homely.com"
- Phone: "+1 555-0123"
- Bio: "With over 10 years of experience in luxury real estate..."

## Step 5: Upload Property Images

The existing properties have images in `/apps/web/public/images/properties/`. You need to upload these to Sanity's Media Library.

### Manual Upload Process:

1. Go to Studio → Media (left sidebar)
2. Click "Upload" button
3. Upload images for each property:
   - Property 1: `property1/property1.jpg`, `image-2.jpg`, `image-3.jpg`, `image-4.jpg`
   - Property 2: `property2/property2.jpg`, `image-2.jpg`, `image-3.jpg`, `image-4.jpg`
   - And so on for all 9 properties...

**Tip**: Tag or name the images clearly so you can identify them when creating properties.

## Step 6: Create Properties Manually

For each of the 9 properties, create a document in Sanity Studio with:

### Property 1: Serenity Height Villas
- **Title**: Serenity height villas
- **Slug**: `serenity-height-villas`
- **Description**: Luxury villa in prime Mumbai location
- **Price**: 2.5 Cr
- **Status**: Available
- **Property Type**: Luxury Villa
- **Location**:
  - Address: Serenity Height Villas
  - City: Mumbai
  - State: Maharashtra
  - Country: India
- **Features**:
  - Bedrooms: 4
  - Bathrooms: 3
  - Area: 120 m²
- **Images**: Upload 4 images from property1 folder
- **Agent**: Select one of the created agents
- **Amenities**: Add relevant amenities like "Smart Home Integration", "Swimming Pool", etc.
- **Rich Text**: Add detailed property description

### Property 2: Mountain Retreat Villa
- **Title**: Mountain retreat villa
- **Slug**: `mountain-retreat-villa`
- **Price**: 3.2 Cr
- **Location**: Juhu, Mumbai
- **Features**: 5 beds, 2 baths, 150 m²

### Property 3: Modern Luxe Villa
- **Title**: Modern luxe villa
- **Slug**: `modern-luxe-villa`
- **Price**: 1.8 Cr
- **Location**: Calangute, Goa
- **Features**: 3 beds, 4 baths, 180 m²

### Property 4: Royal Orchid Villas
- **Title**: Royal orchid villas
- **Slug**: `royal-orchid-villas`
- **Price**: 4.5 Cr
- **Location**: Koramangala, Bangalore
- **Features**: 6 beds, 3 baths, 200 m²

### Property 5: Grand Vista Villas
- **Title**: Grand vista villas
- **Slug**: `grand-cista-villas`
- **Price**: 85 L
- **Location**: Hinjewadi, Pune
- **Features**: 2 beds, 1 bath, 90 m²

### Property 6: Imperial Pearl Villas
- **Title**: Imperial pearl villas
- **Slug**: `imperial-pearn-villas`
- **Price**: 2.8 Cr
- **Location**: Gachibowli, Hyderabad
- **Features**: 4 beds, 2 baths, 130 m²

### Property 7: Opulent Haven Villas
- **Title**: Opulent haven villas
- **Slug**: `opulent-heven-villas`
- **Price**: 2.1 Cr
- **Location**: Benaulim, Goa
- **Features**: 6 beds, 3 baths, 180 m²

### Property 8: Elite Crest Villas
- **Title**: Elite crest villas
- **Slug**: `elite-crest-villas`
- **Price**: 3.8 Cr
- **Location**: Vasant Kunj, New Delhi
- **Features**: 4 beds, 3 baths, 150 m²

### Property 9: Majestic Bay Villas
- **Title**: Majestic bay villas
- **Slug**: `majestic-bay-villas`
- **Price**: 2.9 Cr
- **Location**: Powai, Mumbai
- **Features**: 4 beds, 2 baths, 120 m²

## Step 7: Verify Data in Studio

Once all properties are created:
1. Check that all images display correctly
2. Verify all fields are filled in
3. Ensure slugs are unique and correct
4. Check that agent references work

## Step 8: Test the Frontend

```bash
cd /Users/apple/Sameer/1-Projects/new/property-website/existing
pnpm --filter homely-nextjs dev
```

1. Navigate to `http://localhost:3000/properties`
2. Verify all properties display in the grid
3. Click on each property to test detail pages
4. Check that images load from Sanity CDN
5. Verify all data displays correctly

## Step 9: Build Test

```bash
cd apps/web
pnpm build
```

This should:
- Generate static pages for all properties
- Complete without errors
- Show ISR configuration

## Troubleshooting

### Images Not Loading
- Check that `cdn.sanity.io` is in `next.config.ts` remote patterns
- Verify Sanity project ID matches in both apps
- Check browser console for CORS errors

### Properties Not Showing
- Verify Sanity environment variables are set correctly
- Check that property status is set to "available"
- Look at browser console / terminal for fetch errors

### Build Fails
- Run `pnpm typecheck` to find TypeScript errors
- Check that all required fields have data in Sanity
- Verify GROQ queries return expected data structure

## Data Migration Complete!

Once all steps are complete, your properties are fully CMS-enabled with:
- ✅ Dynamic content from Sanity
- ✅ ISR with 1-hour revalidation
- ✅ Static generation at build time
- ✅ Rich text descriptions
- ✅ Image optimization via Sanity CDN
- ✅ Agent information
- ✅ Property categorization

## Optional: Automated Seed Script

If you prefer not to create documents manually, a seed script can be run after images are uploaded to Sanity. See `apps/studio/scripts/seed-properties-guide.md` for instructions.


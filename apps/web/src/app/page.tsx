/* eslint-disable @typescript-eslint/no-unused-vars */
import FeaturedProperty from '@/components/Home/FeaturedProperty'
import Hero from '@/components/Home/Hero'
import Properties from '@/components/Home/Properties'
import Services from '@/components/Home/Services'
import Testimonial from '@/components/Home/Testimonial'
// import BlogSmall from '@/components/shared/Blog'
import GetInTouch from '@/components/Home/GetInTouch'
import FAQ from '@/components/Home/FAQs'
import { Timeline13 } from '@/components/timeline13'
import { Feature188 } from '@/components/feature188'
import { Feature118 } from '@/components/feature118'
import { Feature104 } from '@/components/feature104'
import { client } from '@/lib/sanity/client'
import { queryHomePageContent } from '@/lib/sanity/queries'
import type { HomePageContent } from '@/types/home-page'

// Cache for 24 hours (86400 seconds) - content rarely changes
export const revalidate = 86400;

export default async function Home() {
  const homePageContent = await client.fetch<HomePageContent | null>(
    queryHomePageContent
  );

  return (
    <main>
      <Hero />
      <Services />

      <Feature118 />

      {/* <Properties /> */}
      {/* <FeaturedProperty /> */}
      {homePageContent?.testimonialsEnabled && homePageContent?.testimonials && (
        <Testimonial testimonials={homePageContent.testimonials} />
      )}

      {/* <Feature188 /> */}
      <Feature104 />

      {/* <BlogSmall /> */}
      <GetInTouch />
      {homePageContent?.faqsEnabled && (
        <FAQ
          title={homePageContent.faqsTitle}
          description={homePageContent.faqsDescription}
          images={homePageContent.faqsImages}
          faqs={homePageContent.faqs}
        />
      )}
      <Timeline13 />
    </main>
  )
}


{/* <Feature104 /> */}


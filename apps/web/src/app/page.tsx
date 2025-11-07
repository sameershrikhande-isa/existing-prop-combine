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

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />

      <Feature118 />

      {/* <Properties /> */}
      <FeaturedProperty />
      <Testimonial />

      {/* <Feature188 /> */}
      <Feature104 />

      {/* <BlogSmall /> */}
      <GetInTouch />
      <FAQ />
      <Timeline13 />
    </main>
  )
}


{/* <Feature104 /> */}


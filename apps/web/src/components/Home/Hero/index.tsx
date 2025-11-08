import Image from 'next/image'
import Link from 'next/link'
import { IconArrowRight, IconMail, IconStar } from '@tabler/icons-react'
import { PropertySearchBar } from '@/components/search/PropertySearchBarNew'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const Hero: React.FC = () => {
  return (
    <section className='!py-0'>
      <div className='overflow-hidden relative'>
        {/* Background Images - Responsive */}
        <div className='absolute inset-0 z-0'>
          {/* Mobile Image */}
          <Image
            src='/images/hero/hero-mobile.png'
            alt=''
            fill
            className='object-cover object-center block md:hidden'
            priority
            unoptimized={true}
            aria-hidden='true'
          />
          {/* Desktop Image */}
          <Image
            src='/images/hero/hero-image-1.jpg'
            alt=''
            fill
            className='object-cover object-center hidden md:block'
            priority
            unoptimized={true}
            aria-hidden='true'
          />
        </div>
        
        {/* Overlay */}
        <div className='absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-black/30 to-black/20 dark:from-black/60 dark:via-black/50 dark:to-black/40' />
        
        <div className='container max-w-8xl mx-auto px-5 2xl:px-0 pt-32 md:pt-60 md:pb-68 relative z-10'>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center relative z-10">
            {/* Left Column: Content */}
            <div className='relative text-white dark:text-dark text-center md:text-start'>
              <div className='flex items-center justify-center md:justify-start gap-2 text-inherit text-xm font-medium'>
                <Image
                  src={'/images/legal-and-trust/logo-MAHARERA.jpg'}
                  alt='MahaRERA logo'
                  width={24}
                  height={24}
                  className='h-6 w-6 object-contain rounded-full'
                  unoptimized={true}
                />
                <span>MahaRERA-Registered</span>
              </div>
              <h1 className='text-inherit text-4xl sm:text-7xl font-bold md:font-semibold -tracking-wider md:max-w-[85%] lg:max-w-[75%] mt-4 mb-6'>
              Smart Choices. Perfect Homes in Thane
              </h1>
              <p className='text-inherit text-lg sm:text-3xl font-normal md:font-normal -tracking-wider md:max-w-[85%] lg:max-w-[75%] mt-4 mb-6'>
                Expert Guidance with Local knowledge
              </p>
              
              {/* Trust Indicator */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                <span className="inline-flex items-center -space-x-4">
                  {['jack', 'arlene', 'dwayn', 'george', 'mark'].map((name, i) => (
                    <Avatar key={i} className="size-12 border-2 border-white dark:border-dark">
                      <AvatarImage src={`/images/users/${name}.jpg`} alt={`Customer ${name}`} />
                      <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  ))}
                </span>
                <div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((i) => (
                      <IconStar key={i} className="size-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="font-semibold text-inherit ml-1">4.9</span>
                  </div>
                  <p className="text-inherit/70 text-left font-medium text-sm">
                    from customers
                  </p>
                </div>
              </div>

              <div className='flex flex-col xs:flex-row justify-center md:justify-start gap-4'>
                <Link href="/contactus" className='px-8 py-4 border border-white dark:border-dark bg-white dark:bg-dark text-dark dark:text-white duration-300 dark:hover:text-dark hover:bg-transparent hover:text-white text-base font-semibold rounded-full hover:cursor-pointer flex items-center gap-2'>
                  <IconMail className="w-5 h-5" />
                  Get in touch
                </Link>
                <Link
                  href="/properties"
                  className="px-8 py-4 border border-white dark:border-dark bg-transparent text-white dark:text-dark hover:bg-white dark:hover:bg-dark dark:hover:text-white hover:text-dark duration-300 text-base font-semibold rounded-full hover:cursor-pointer flex items-center gap-2"
                  tabIndex={0}
                  aria-label="Browse properties"
                >
                  Seek Expert Guidance
                  <IconArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Right Column: Compact Search */}
            <div className='relative z-20'>
              <PropertySearchBar isCompact className='max-w-full' />
            </div>
          </div>
          {/* <div className='hidden md:block absolute -top-2 -right-68 z-[2] opacity-30'>
            <Image
              src={'/images/hero/heroBanner.png'}
              alt=''
              width={1082}
              height={1016}
              priority={false}
              unoptimized={true}
              aria-hidden='true'
            />
          </div> */}
        </div>
{/*  
        <div className='md:absolute bottom-0 md:-right-68 xl:right-0 bg-white dark:bg-black py-12 px-8 mobile:px-16 md:pl-16 md:pr-[295px] rounded-2xl md:rounded-none md:rounded-tl-2xl mt-24'>
          <div className='grid grid-cols-2 sm:grid-cols-4 md:flex gap-16 md:gap-24 sm:text-center dark:text-white text-black'>
            <div className='flex flex-col sm:items-center gap-3'>
              <Image
                src={'/images/hero/sofa.svg'}
                alt='sofa'
                width={32}
                height={32}
                className='block dark:hidden'
                unoptimized={true}
              />
              <Image
                src={'/images/hero/dark-sofa.svg'}
                alt='sofa'
                width={32}
                height={32}
                className='hidden dark:block'
                unoptimized={true}
              />
              <p className='text-sm sm:text-base font-normal text-inherit'>
                4 Bedrooms
              </p>
            </div>
            <div className='flex flex-col sm:items-center gap-3'>
              <Image
                src={'/images/hero/tube.svg'}
                alt='sofa'
                width={32}
                height={32}
                className='block dark:hidden'
                unoptimized={true}
              />
              <Image
                src={'/images/hero/dark-tube.svg'}
                alt='sofa'
                width={32}
                height={32}
                className='hidden dark:block'
                unoptimized={true}
              />
              <p className='text-sm sm:text-base font-normal text-inherit'>
                4 Restroom
              </p>
            </div>
            <div className='flex flex-col sm:items-center gap-3'>
              <Image
                src={'/images/hero/parking.svg'}
                alt='sofa'
                width={32}
                height={32}
                className='block dark:hidden'
                unoptimized={true}
              />
              <Image
                src={'/images/hero/dark-parking.svg'}
                alt='sofa'
                width={32}
                height={32}
                className='hidden dark:block'
                unoptimized={true}
              />
              <p className='text-sm sm:text-base font-normal text-inherit'>
                Parking space
              </p>
            </div>
            <div className='flex flex-col sm:items-center gap-3'>
              <p className='text-2xl sm:text-3xl font-medium text-inherit'>
                $4,750,000
              </p>
              <p className='text-sm sm:text-base font-normal text-black/50 dark:text-white/50'>
                For selling price
              </p>
            </div>
          </div>
        </div>*/}
          
      </div>
    </section>
  )
}

export default Hero

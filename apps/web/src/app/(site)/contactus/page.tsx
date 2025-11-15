import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from "next";
import { client } from '@/lib/sanity/client'
import { queryContactInfo } from '@/lib/sanity/queries'
import type { ContactInfo } from '@/types/contact'

export const metadata: Metadata = {
    title: "Contact Us | Yashashvini Consultancy Services",
};

// Cache for 24 hours (86400 seconds) - content rarely changes
export const revalidate = 86400;

export default async function ContactUs() {
  const contactInfo = await client.fetch<ContactInfo | null>(queryContactInfo);
  
  const phoneNumbers = contactInfo?.phoneNumbers;
  const phoneDisplay = phoneNumbers?.map((phone) => phone.displayNumber).join(" / ");

  // Convert Tabler icon names (e.g., "IconBrandFacebook") to iconify format (e.g., "tabler:brand-facebook")
  const convertIconName = (iconName: string): string => {
    if (!iconName) return iconName;
    // If already in iconify format (contains :), return as is
    if (iconName.includes(':')) {
      return iconName;
    }
    // Convert Tabler icon name to iconify format
    // "IconBrandFacebook" -> "tabler:brand-facebook"
    const withoutIcon = iconName.replace(/^Icon/, '');
    // Convert camelCase to kebab-case
    const kebabCase = withoutIcon
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
      .toLowerCase();
    return `tabler:${kebabCase}`;
  };
  return (
    <div className='container max-w-8xl mx-auto px-5 2xl:px-0 pt-16 md:pt-24 pb-14 md:pb-28'>
      <div className='mb-16'>
        <div className='flex gap-2.5 items-center justify-center mb-3'>
          <span>
            <Icon
              icon={'ph:house-simple-fill'}
              width={20}
              height={20}
              className='text-primary'
            />
          </span>
          <p className='text-base font-semibold text-badge dark:text-white/90'>
            Contact us
          </p>
        </div>
        <div className='text-center'>
          <h3 className='text-4xl sm:text-52 font-medium tracking-tighter text-black dark:text-white mb-3 leading-10 sm:leading-14'>
            Have questions? ready to help!
          </h3>
          <p className='text-xm font-normal tracking-tight text-black/50 dark:text-white/50 leading-6'>
            Looking for your dream home or ready to sell? Our expert team offers
            personalized guidance and market expertise tailored to you.
          </p>
        </div>
      </div>
      {/* form */}
      <div className='border border-black/10 dark:border-white/10 rounded-2xl p-4 shadow-xl dark:shadow-white/10'>
        <div className='flex flex-col lg:flex-row lg:items-center gap-12'>
          <div className='relative w-fit'>
            <Image
              src={'/images/contactUs/contactUs.jpg'}
              alt='wall'
              width={497}
              height={535}
              className='rounded-2xl brightness-50 h-full'
              unoptimized={true}
            />
            <div className='absolute top-6 left-6 lg:top-12 lg:left-12 flex flex-col gap-2'>
              <h5 className='text-xl xs:text-2xl mobile:text-3xl font-medium tracking-tight text-white'>
                Contact information
              </h5>
              <p className='text-sm xs:text-base mobile:text-xm font-normal text-white/80'>
                Ready to find your dream home or sell your property? We’re here
                to help!
              </p>
            </div>
            {contactInfo && (
            <div className='absolute bottom-6 left-6 lg:bottom-12 lg:left-12 flex flex-col gap-4 text-white'>
                {contactInfo.contactName && (
              <div className='flex items-center gap-4'>
                <Icon icon={'ph:user'} width={32} height={32} />
                <p className='text-sm xs:text-base mobile:text-xm font-normal'>
                      {contactInfo.contactName}
                </p>
              </div>
                )}
                {phoneNumbers && phoneNumbers.length > 0 && phoneDisplay && (
                  <Link href={`tel:${phoneNumbers[0]?.actualNumber.replace(/\s/g, '')}`} className='w-fit'>
                <div className='flex items-center gap-4 group w-fit'>
                  <Icon icon={'ph:phone'} width={32} height={32} />
                  <p className='text-sm xs:text-base mobile:text-xm font-normal group-hover:text-primary'>
                        {phoneDisplay}
                  </p>
                </div>
              </Link>
                )}
                {contactInfo.email && (
                  <Link href={`mailto:${contactInfo.email}`} className='w-fit'>
                <div className='flex items-center gap-4 group w-fit'>
                  <Icon icon={'ph:envelope-simple'} width={32} height={32} />
                  <p className='text-sm xs:text-base mobile:text-xm font-normal group-hover:text-primary'>
                        {contactInfo.email}
                  </p>
                </div>
              </Link>
                )}
                {contactInfo.socialLinks && contactInfo.socialLinks.length > 0 && (
                  <div className='flex items-center gap-4 mt-6'>
                    {contactInfo.socialLinks.map((social, index) => (
                      <Link
                        key={`${social.url}-${index}`}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-primary transition-colors"
                        aria-label={`Visit our ${social.iconName} page`}
                      >
                        <Icon icon={convertIconName(social.iconName)} width={32} height={32} />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
              {/* <div className='flex items-center gap-4'>
                <Icon icon={'ph:map-pin'} width={32} height={32} />
                <p className='text-sm xs:text-base mobile:text-xm font-normal'>
                  Blane Street, Manchester
                </p>
              </div> */}
          </div>
          <div className='flex-1/2'>
            <form>
              <div className='flex flex-col gap-8'>
                <div className='flex flex-col lg:flex-row gap-6'>
                  <input
                    type='text'
                    name='username'
                    id='username'
                    autoComplete='username'
                    placeholder='Name*'
                    required
                    className='px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full'
                  />
                  <input
                    type='number'
                    name='mobile'
                    id='mobile'
                    autoComplete='mobile'
                    placeholder='Phone number*'
                    required
                    className='px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full'
                  />
                </div>
                <input
                  type='email'
                  name='email'
                  id='email'
                  autoComplete='email'
                  placeholder='Email address*'
                  required
                  className='px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline'
                />
                <textarea
                  rows={8}
                  cols={50}
                  name='message'
                  id='message'
                  placeholder='Write here your message'
                  required
                  className='px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-2xl outline-primary focus:outline'></textarea>
                <button className='px-8 py-4 rounded-full bg-primary text-white text-base font-semibold w-full mobile:w-fit hover:cursor-pointer hover:bg-dark duration-300'>
                  Send message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

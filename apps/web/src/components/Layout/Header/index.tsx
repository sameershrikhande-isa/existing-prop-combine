'use client'
import { navLinks } from '@/app/api/navlink'
import { Icon } from '@iconify/react'
import { IconSearch } from '@tabler/icons-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import NavLink from './Navigation/NavLink'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import type { ContactInfo } from '@/types/contact'

type HeaderProps = {
  contactInfo?: ContactInfo | null;
};

const Header: React.FC<HeaderProps> = ({ contactInfo }) => {
  const phoneNumbers = contactInfo?.phoneNumbers;
  const phoneDisplay = phoneNumbers?.map((phone) => phone.displayNumber).join(" / ");
  const [navbarOpen, setNavbarOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const sideMenuRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (sideMenuRef.current && !sideMenuRef.current.contains(event.target as Node)) {
      setNavbarOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="fixed z-50 w-full bg-white dark:bg-dark transition-all duration-300 lg:px-0 px-4 top-0">
      <nav className="container mx-auto max-w-8xl flex items-center justify-between py-4 duration-300 shadow-lg bg-white dark:bg-dark rounded-full px-4">
        <div className='flex justify-between items-center gap-2 w-full'>
          <div>
            <Link href='/'>
              <Image
                // src={'/images/logo/logo-yash1.png'}
                src={'/images/logo/logo-yash2.svg'}
                // src={'/images/header/dark-logo.svg'}
                alt='logo'
                width={150}
                height={68}
                unoptimized={true}
                className="block dark:hidden"
              />
              <Image
                // src={'/images/logo/logo-yash1.png'}
                src={'/images/logo/logo-yash2.svg'}
                // src={'/images/header/logo.svg'}
                alt='logo'
                width={150}
                height={68}
                unoptimized={true}
                className="hidden dark:block"
              />
            </Link>
          </div>
          {/* Desktop Navigation - hidden on mobile */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link 
              href="#expertise" 
              className="text-base font-medium text-dark dark:text-white hover:text-primary transition-colors"
            >
              Expertise
            </Link>
            <Link 
              href="#testimonial" 
              className="text-base font-medium text-dark dark:text-white hover:text-primary transition-colors"
            >
              Testimonials
            </Link>
            <Link 
              href="#properties" 
              className="text-base font-medium text-dark dark:text-white hover:text-primary transition-colors flex items-center gap-2"
            >
              Properties
              <IconSearch size={18} className="text-dark dark:text-white" />
            </Link>
            <Link 
              href="#faqs" 
              className="text-base font-medium text-dark dark:text-white hover:text-primary transition-colors"
            >
              FAQ
            </Link>
          </nav>
          <div className='flex items-center gap-2 sm:gap-6'>
            <button
              className='hover:cursor-pointer border-r pr-6 border-dark dark:border-white'
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Icon
                icon={'solar:sun-bold'}
                width={32}
                height={32}
                className="dark:hidden block text-dark"
              />
              <Icon
                icon={'solar:moon-bold'}
                width={32}
                height={32}
                className="dark:block hidden text-white"
              />
            </button>
            <div className="hidden md:block">
              <Link
                href="/contactus"
                className="flex items-center text-primary dark:text-white hover:text-dark dark:hover:text-red-400 transition-colors"
                aria-label="Go to contact page"
              >
                <Icon icon={'ph:phone-bold'} width={24} height={24} />
              </Link>
            </div>
            <div className="lg:hidden">
              <button
                onClick={() => setNavbarOpen(!navbarOpen)}
                className="flex items-center gap-3 p-2 sm:px-5 sm:py-3 rounded-full font-semibold hover:cursor-pointer border text-white bg-dark dark:bg-white dark:text-dark dark:hover:text-white dark:hover:bg-dark hover:text-dark hover:bg-white border-dark dark:border-white duration-300"
                aria-label="Toggle mobile menu"
              >
                <span>
                  <Icon icon={'ph:list'} width={24} height={24} />
                </span>
                <span className="hidden sm:block">Menu</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {
        navbarOpen && (
          <div className='fixed top-0 left-0 w-full h-full bg-black/50 z-40' />
        )
      }

      <div
        ref={sideMenuRef}
        className={`fixed top-0 right-0 h-full w-full bg-dark shadow-lg transition-transform duration-300 max-w-2xl ${navbarOpen ? 'translate-x-0' : 'translate-x-full'} z-50 px-20 overflow-auto no-scrollbar`}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="">
            <div className='flex items-center justify-start py-10'>
              <button
                onClick={() => setNavbarOpen(false)}
                aria-label='Close mobile menu'
                className='bg-white p-3 rounded-full hover:cursor-pointer'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'>
                  <path
                    fill='none'
                    stroke='black'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            <nav className='flex flex-col items-start gap-4'>
              <ul className='w-full'>
                {navLinks.map((item, index) => (
                  <NavLink key={index} item={item} onClick={() => setNavbarOpen(false)} />
                ))}
                {/* <li className='flex items-center gap-4'>
                  <Link href="/signin" className='py-4 px-8 bg-primary text-base leading-4 block w-fit text-white rounded-full border border-primary font-semibold mt-3 hover:bg-transparent hover:text-primary duration-300'>
                    Sign In
                  </Link>
                  <Link href="/" className='py-4 px-8 bg-transparent border border-primary text-base leading-4 block w-fit text-primary rounded-full font-semibold mt-3 hover:bg-primary hover:text-white duration-300'>
                    Sign up
                  </Link>
                </li> */}
              </ul>
            </nav>
          </div>

          {contactInfo && (
            <div className='flex flex-col gap-1 my-16 text-white'>
              <p className='text-base sm:text-xm font-normal text-white/40'>
                Contact
              </p>
              {contactInfo.contactName && (
                <span className='text-base sm:text-xm font-normal text-inherit'>
                  {contactInfo.contactName}
                </span>
              )}
              {contactInfo.email && (
                <Link href={`mailto:${contactInfo.email}`} className='text-base sm:text-xm font-medium text-inherit hover:text-primary'>
                  {contactInfo.email}
                </Link>
              )}
              {phoneNumbers && phoneNumbers.length > 0 && phoneDisplay && (
                <Link href={`tel:${phoneNumbers[0]?.actualNumber.replace(/\s/g, '')}`} className='text-base sm:text-xm font-medium text-inherit hover:text-primary'>
                  {phoneDisplay}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </header >
  )
}

export default Header

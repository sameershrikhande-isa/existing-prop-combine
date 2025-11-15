import type { Metadata } from 'next'
import { Bricolage_Grotesque } from 'next/font/google'
import './globals.css'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import { ThemeProvider } from 'next-themes'
import NextTopLoader from 'nextjs-toploader';
import SessionProviderComp from '@/components/nextauth/SessionProvider'
import { client } from '@/lib/sanity/client'
import { queryContactInfo } from '@/lib/sanity/queries'
import type { ContactInfo } from '@/types/contact'

const font = Bricolage_Grotesque({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Yashasvini Consultancy Services',
  description: 'Yashasvini Consultancy Services',
}

// Cache for 24 hours (86400 seconds) - content rarely changes
export const revalidate = 86400;

export default async function RootLayout({
  children,
  // session,
}: Readonly<{
  children: React.ReactNode
  // session: any
}>) {
  const contactInfo = await client.fetch<ContactInfo | null>(queryContactInfo);
  
  return (
    <html lang='en'>
      <body className={`${font.className} bg-white dark:bg-black antialiased`}>
        <NextTopLoader color="#07be8a" />
        {/* <SessionProviderComp session={session}> */}
        <SessionProviderComp>
          <ThemeProvider
            attribute='class'
            forcedTheme="light"
            enableSystem={false}
            disableTransitionOnChange>
            <Header contactInfo={contactInfo} />
            {children}
            <Footer />
          </ThemeProvider>
        </SessionProviderComp>
      </body>
    </html>
  )
}
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import './globals.css'
import { getSiteInfo } from '../lib/cms'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' data-theme='light'>
      <body className={`${inter.className} bg-neutral font-sansantialiased`}>
        <div className='flex min-h-screen flex-col'>
          <Header />
          <div className='flex-1 pt-16 sm:pt-20'>{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  )
}

const inter = Inter({
  subsets: ['latin'],
})

export async function generateMetadata(): Promise<Metadata> {
  const siteInfo = getSiteInfo()
  return {
    title: siteInfo.name,
    description: siteInfo.tagline,
  }
}

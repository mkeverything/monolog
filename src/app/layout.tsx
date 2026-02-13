import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getSiteInfo } from '../lib/cms'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' data-theme='light'>
      <body className={`${inter.className} font-sans antialiased`}>
        {children}
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

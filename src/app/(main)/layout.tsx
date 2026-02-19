import { Footer } from '@/src/components/Footer'
import Navigation from '@/src/components/Navigation'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Navigation />
      <div className='flex-1'>{children}</div>
      <Footer />
    </div>
  )
}

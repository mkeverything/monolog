import { Header } from './Header'
import { MobileMenu } from './MobileMenu'

export default function Navigation() {
  return (
    <>
      <div className='hidden md:block'>
        <Header />
      </div>
      <div className='md:hidden'>
        <MobileMenu />
      </div>
    </>
  )
}

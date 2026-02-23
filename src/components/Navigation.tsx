import { Header } from './Header'
import { MobileMenu } from './MobileMenu'

export default function Navigation() {
  return (
    <>
      <div className='hidden sm:block'>
        <Header />
      </div>
      <div className='sm:hidden'>
        <MobileMenu />
      </div>
    </>
  )
}

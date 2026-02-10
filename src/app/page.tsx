import { getContactContent, getHomeContent } from '../lib/cms'
import Features from './home/Features'
import Gallery from './home/Gallery'
import Hero from './home/Hero'
import Product from './home/Product'
import Showcases from './home/Showcases'
import Steps from './home/Steps'

export default function HomePage() {
  const home = getHomeContent()
  const contact = getContactContent()

  return (
    <main>
      <Hero home={home} contact={contact} />
      <Features {...home} />
      <Steps {...home} />
      <Gallery {...home} />
      <Product {...home} />
      <Showcases {...home} />
    </main>
  )
}

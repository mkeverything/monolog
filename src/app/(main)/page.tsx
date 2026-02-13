import { getContactContent, getHomeContent } from '@/src/lib/cms'
import Conditions from './home/Conditions'
import Discuss from './home/Discuss'
import FAQ from './home/FAQ'
import Features from './home/Features'
import Gallery from './home/Gallery'
import Hero from './home/Hero'
import Product from './home/Product'
import Roles from './home/Roles'
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
      <Conditions {...home} />
      <Roles roles={home.roles} />
      <Discuss />
      <FAQ {...home} />
    </main>
  )
}

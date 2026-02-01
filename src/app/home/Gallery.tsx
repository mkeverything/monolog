import { FullPageSection } from "@/src/components/FullPageSection"
import { HorizontalCarousel } from "@/src/components/HorizontalCarousel"
import { SiteContent } from "@/src/lib/cms"

export default function Gallery(home: SiteContent["home"]) {
  return (
         <FullPageSection id="gallery">
        <div className="w-full h-full flex flex-col items-center">
          <h2 className="text-2xl font-medium text-primary">
            {home.workflow.title}
          </h2>
          <div className="flex-1 w-full min-h-0">
            <HorizontalCarousel images={home.workflow.gallery} />
          </div>
        </div>
      </FullPageSection>
  )
}

import { FullPageSection } from "@/src/components/FullPageSection"
import { Badge } from "@/src/components/ui/Badge"
import { Button } from "@/src/components/ui/Button"
import { SiteContent } from "@/src/lib/cms"
import { Fragment } from "react/jsx-runtime"

export default function Hero({
  home,
  contact,
}: Pick<SiteContent, "home" | "contact">) {
  return (
    <FullPageSection
      centered={false}
      background="neutral"
      id="hero"
      className="items-start flex flex-col"
    >
      <div className="flex flex-col gap-2 max-w-2/5 grow mt-28">
        <div className="flex gap-3">
          {home.hero.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <div className="text-2xl font-medium text-primary">
          {home.hero.title}
        </div>
        <div className="text-primary text-sm">{home.hero.subtitle}</div>
        <Button
          href={home.hero.ctaPrimary?.href}
          size="sm"
          className="w-fit mt-4"
        >
          {home.hero.ctaPrimary?.label}
        </Button>
      </div>
      <div className="max-sm:hidden grid grid-cols-[max-content_auto_max-content_1fr] gap-2">
        {contact.contactInfo.contacts.map((item) => (
          <Fragment key={item.label}>
            <div className="text-accent whitespace-nowrap">{item.label}</div>
            <div className="text-primary mr-32">{item.value}</div>
          </Fragment>
        ))}
      </div>
    </FullPageSection>
  )
}

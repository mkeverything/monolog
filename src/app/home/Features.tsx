import { FullPageSection } from "@/src/components/FullPageSection"
import { Badge } from "@/src/components/ui/Badge"
import { Button } from "@/src/components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/Card"
import { SiteContent } from "@/src/lib/cms"
import { ArrowDown } from "lucide-react"

export default function Features(home: SiteContent['home']) {
  return (
    <FullPageSection id="features">
      <div className="text-2xl font-medium">{home.features.title}</div>
      <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2">
        {home.features.items.map((feature) => (
          <Card
            key={feature.title}
            variant="default"
            className="h-40 flex flex-col justify-between"
          >
            <CardHeader className="flex justify-between w-full">
              <CardTitle>{feature.title}</CardTitle>
              <Badge className="bg-secondary rounded-md text-primary text-xs">
                {feature.tag}
              </Badge>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button className="flex gap-1 p-1.5 rounded-full justify-between mt-12">
        <span className="pl-1.5">{home.features.cta}</span>
        <Badge className="rounded-full badge-xl aspect-square bg-base-100 text-primary m-0 p-1.5">
          <ArrowDown />
        </Badge>
      </Button>
    </FullPageSection>
  )
}

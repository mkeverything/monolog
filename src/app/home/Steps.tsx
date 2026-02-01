import { FullPageSection } from "@/src/components/FullPageSection"
import { AnimatedBadge } from "@/src/components/ui/AnimatedBadge"
import { Badge } from "@/src/components/ui/Badge"
import { Card, CardContent, CardTitle } from "@/src/components/ui/Card"
import { SiteContent } from "@/src/lib/cms"
import Image from "next/image"

export default function Steps(home: SiteContent["home"]) {
  return (
    <FullPageSection id="steps">
      <div className="mt-12 size-full sm:mt-16 grid lg:grid-rows-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
        <Card className="overflow-hidden px-0 w-full lg:col-start-1 lg:col-end-4 flex flex-col justify-between">
          <CardTitle className="px-4">{home.steps.developing.title}</CardTitle>
          <CardContent className="relative">
            {/* Gradient masks for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-base-100 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-base-100 to-transparent z-10 pointer-events-none" />

            {/* Row 1 - scrolls left */}
            <div className="flex overflow-hidden py-2">
              <div className="flex gap-2 animate-scroll-left">
                {Array.from({ length: 2 })
                  .flatMap(() => home.steps.developing.items)
                  .map((item, i) => {
                    const badgeStyle: string =
                      i % 2 === 0
                        ? "bg-white"
                        : i % 3 === 0
                          ? "bg-base-300"
                          : "bg-primary text-base-100"
                    return (
                      <Badge
                        key={`r1-${i}`}
                        className={`${badgeStyle} text-xs whitespace-nowrap`}
                      >
                        {item}
                      </Badge>
                    )
                  })}
              </div>
            </div>

            {/* Row 2 - scrolls right */}
            <div className="flex overflow-hidden py-2">
              <div className="flex gap-2 animate-scroll-right">
                {Array.from({ length: 2 })
                  .flatMap(() => home.steps.developing.items.reverse())
                  .map((item, i) => {
                    const badgeStyle: string =
                      i % 2 === 0
                        ? "bg-white"
                        : i % 3 === 0
                          ? "bg-base-300"
                          : "bg-primary text-base-100"
                    return (
                      <Badge
                        key={`r2-${i}`}
                        className={`${badgeStyle} text-xs whitespace-nowrap`}
                      >
                        {item}
                      </Badge>
                    )
                  })}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden relative px-0 size-full lg:col-start-4 lg:col-end-6 flex flex-col justify-between">
          <CardContent>
            <CardTitle className="px-4">{home.steps.deadlines.title}</CardTitle>
            <span className="absolute bottom-4 right-4 text-sm italic">
              {home.steps.deadlines.description}
            </span>
            <div className="absolute -bottom-4 -left-4">
              <div className="relative">
                <Image
                  width={250}
                  height={250}
                  alt="meter"
                  src={"/assets/meter.svg"}
                />
                <div className="absolute -right-8 top-4 flex flex-col">
                  <span className="text-3xl font-medium">
                    {home.steps.deadlines.value}
                  </span>
                  <span>{home.steps.deadlines.caption}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden px-0 size-full lg:col-start-1 lg:col-end-3 flex flex-col justify-between">
          <CardTitle className="px-4">{home.steps.automation.title}</CardTitle>
          <CardContent className="relative">
            {/* Gradient masks for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-base-100 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-base-100 to-transparent z-10 pointer-events-none" />

            {/* Row 1 - scrolls left */}
            <div className="flex overflow-hidden py-1">
              <div className="flex animate-scroll-left">
                {Array.from({ length: 2 })
                  .flatMap(() => home.steps.automation.items)
                  .map((item, i) => {
                    return (
                      <AnimatedBadge
                        key={`r1-${i}`}
                        className={`text-xs text-secondary-content bg-transparent whitespace-nowrap rounded-sm`}
                      >
                        {item}
                      </AnimatedBadge>
                    )
                  })}
              </div>
            </div>

            {/* Row 2 - scrolls right */}
            <div className="flex overflow-hidden py-1">
              <div className="flex animate-scroll-right">
                {Array.from({ length: 2 })
                  .flatMap(() => home.steps.automation.items.reverse())
                  .map((item, i) => {
                    return (
                      <AnimatedBadge
                        key={`r2-${i}`}
                        className={`text-xs text-secondary-content bg-transparent whitespace-nowrap rounded-sm`}
                      >
                        {item}
                      </AnimatedBadge>
                    )
                  })}
              </div>
            </div>

            {/* Row 3 - scrolls left slow */}
            <div className="flex overflow-hidden py-1">
              <div className="flex animate-scroll-left-slow">
                {Array.from({ length: 2 })
                  .flatMap(() =>
                    home.steps.automation.items
                      .slice()
                      .sort(() => Math.random() - 0.5),
                  )
                  .map((item, i) => {
                    return (
                      <AnimatedBadge
                        key={`r3-${i}`}
                        className={`text-xs text-secondary-content bg-transparent whitespace-nowrap rounded-sm`}
                      >
                        {item}
                      </AnimatedBadge>
                    )
                  })}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden relative px-0 size-full lg:col-start-3 lg:col-end-6 flex flex-col justify-between">
          <CardContent className="px-4 flex flex-col justify-between h-full">
            <CardTitle>{home.steps.pricing.title}</CardTitle>
            <div className="w-full flex gap-4">
              <div className="flex flex-col size-full justify-end gap-4">
                <Badge className="badge-lg bg-primary text-primary-content text-xs w-1/2 justify-between">
                  {home.steps.pricing.monolog}
                  <span>₽</span>
                </Badge>
                <Badge className="badge-lg text-xs bg-base-300 w-full justify-between">
                  {home.steps.pricing.agencies}
                  <span>₽₽₽</span>
                </Badge>
              </div>
              <div className="flex flex-col">
                <span className="text-secondary-content">
                  {home.steps.pricing.upto}
                </span>
                <div>
                  <span className="text-6xl font-semibold">
                    {home.steps.pricing.multiplierValue}
                  </span>
                  <span className="text-4xl font-light">x</span>
                </div>
                <span className="text-sm">{home.steps.pricing.caption}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </FullPageSection>
  )
}

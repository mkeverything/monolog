import { Fragment } from "react/jsx-runtime"
import { FullPageSection } from "../components/FullPageSection"
import { Badge } from "../components/ui/Badge"
import { Button } from "../components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card"
import { getContactContent, getHomeContent } from "../lib/cms"

export default function HomePage() {
  const home = getHomeContent()
  const contacts = getContactContent()

  return (
    <main>
      {/* Hero Section */}
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
          <div className="text-2xl font-medium text-primary-content">
            {home.hero.title}
          </div>
          <div className="text-primary text-sm">
            {home.hero.subtitle}
          </div>
          <Button
            href={home.hero.ctaPrimary?.href}
            size="sm"
            className="w-fit mt-4"
          >
            {home.hero.ctaPrimary?.label}
          </Button>
        </div>
        <div className="grid grid-cols-[max-content_auto_max-content_1fr] gap-2">
          {contacts.contactInfo.contacts.map((item) => (
            <Fragment key={item.label}>
              <div className="text-accent whitespace-nowrap">{item.label}</div>
              <div className="text-primary mr-32">{item.value}</div>
            </Fragment>
          ))}
        </div>
      </FullPageSection>

      {/* Features Section */}
      <FullPageSection background="default" id="features">
        <div className="text-2xl font-medium">
          {home.features.title}
        </div>
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {home.features.items.map((feature) => (
            <Card
              key={feature.title}
              variant="default"
              className="h-full flex flex-col justify-between"
            >
              <CardHeader className="flex justify-between w-full">
                <CardTitle>
                  {feature.title}
                </CardTitle>
                <Badge>{feature.tag}</Badge>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </FullPageSection>

      {/* Testimonials Section */}
      <FullPageSection background="secondary" id="testimonials">
        <div className="text-secondary-content">{home.testimonials.title}</div>
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {home.testimonials.items.map((testimonial, index) => (
            <Card key={index} variant="default" className="h-full">
              <CardHeader>
                <CardTitle className="text-lg font-medium italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-content font-semibold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-base-content">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-secondary-content">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </FullPageSection>
    </main>
  )
}

// function FeatureIcon({ name }: { name: string }) {
//   const icons: Record<string, React.ReactNode> = {
//     sparkles: (
//       <svg
//         className="w-6 h-6 text-accent"
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
//         />
//       </svg>
//     ),
//     users: (
//       <svg
//         className="w-6 h-6 text-accent"
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
//         />
//       </svg>
//     ),
//     chart: (
//       <svg
//         className="w-6 h-6 text-accent"
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
//         />
//       </svg>
//     ),
//   }

//   return icons[name] || null
// }

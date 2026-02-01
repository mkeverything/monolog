import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card"
import {
  FullPageSection,
  SectionSubtitle,
  SectionTitle,
} from "../../components/FullPageSection"
import { getAboutContent, TeamMember, ValueItem } from "../../lib/cms"

export default function AboutPage() {
  const about = getAboutContent()

  return (
    <main className="snap-y snap-mandatory overflow-y-auto h-screen scroll-smooth">
      {/* Hero Section */}
      <FullPageSection background="primary" id="about-hero">
        <div className="text-center">
          <SectionTitle as="h1" className="text-primary">
            {about.hero.title}
          </SectionTitle>
          <SectionSubtitle className="text-primary/80">
            {about.hero.subtitle}
          </SectionSubtitle>
        </div>
      </FullPageSection>

      {/* Mission Section */}
      <FullPageSection background="neutral" id="mission">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle>
            {about.mission.title}
          </SectionTitle>
          <p className="mt-8 text-xl sm:text-2xl text-secondary-content leading-relaxed">
            {about.mission.content}
          </p>
        </div>
      </FullPageSection>

      {/* Team Section */}
      <FullPageSection background="secondary" id="team">
        <SectionTitle className="text-secondary-content">
          {about.team.title}
        </SectionTitle>
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {about.team.members.map((member: TeamMember) => (
            <Card key={member.name} variant="elevated" className="h-full text-center">
              <CardHeader>
                <div className="w-20 h-20 mx-auto rounded-full bg-accent flex items-center justify-center text-accent-content text-2xl font-bold mb-4">
                  {member.name.charAt(0)}
                </div>
                <CardTitle className="text-lg">
                  {member.name}
                </CardTitle>
                <p className="text-sm text-accent font-medium">
                  {member.role}
                </p>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {member.bio}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </FullPageSection>

      {/* Values Section */}
      <FullPageSection background="default" id="values">
        <SectionTitle>
          {about.values.title}
        </SectionTitle>
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {about.values.items.map((value: ValueItem, index: number) => (
            <Card key={index} variant="outline" className="h-full">
              <CardHeader>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold text-lg">
                    {index + 1}
                  </span>
                </div>
                <CardTitle>
                  {value.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {value.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </FullPageSection>
    </main>
  )
}

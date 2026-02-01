import { FullPageSection, SectionTitle, SectionSubtitle } from "../../components/FullPageSection"
import { Button } from "../../components/ui/Button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card"
import { getContactContent } from "../../lib/cms"

export default function ContactPage() {
  const contact = getContactContent()

  return (
    <main className="snap-y snap-mandatory overflow-y-auto h-screen scroll-smooth">
      {/* Hero Section */}
      <FullPageSection background="primary" id="contact-hero">
        <div className="text-center">
          <SectionTitle as="h1" className="text-primary-content">
            {contact.hero.title}
          </SectionTitle>
          <SectionSubtitle className="text-primary-content/80">
            {contact.hero.subtitle}
          </SectionSubtitle>
        </div>
      </FullPageSection>

      {/* Contact Info & Form Section */}
      <FullPageSection background="neutral" id="contact-info">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-base-content mb-8">
              {contact.contactInfo.title}
            </h2>
            <div className="space-y-6">
              {contact.contactInfo.contacts.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <ContactIcon label={item.label} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base-content">
                      {item.label}
                    </h3>
                    <p className="text-secondary-content mt-1">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <Card variant="elevated" className="w-full">
            <CardHeader>
              <CardTitle>
              {contact.form.title}
            </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                {contact.form.fields.map((field) => (
                  <div key={field.name}>
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium text-base-content mb-2"
                    >
                      {field.label}
                      {field.required && (
                        <span className="text-error ml-1">*</span>
                      )}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        rows={4}
                        className="w-full px-4 py-3 rounded-field border border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                        required={field.required}
                      />
                    ) : (
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        className="w-full px-4 py-3 rounded-field border border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        required={field.required}
                      />
                    )}
                  </div>
                ))}
                <Button type="submit" variant="primary" className="w-full">
                  {contact.form.submitLabel}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </FullPageSection>

      {/* FAQ Section */}
      <FullPageSection background="secondary" id="faq">
        <SectionTitle className="text-secondary-content">
          {contact.faq.title}
        </SectionTitle>
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {contact.faq.items.map((faq, index) => (
            <Card key={index} variant="default" className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">
                  {faq.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-secondary-content">
                  {faq.answer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </FullPageSection>
    </main>
  )
}

function ContactIcon({ label }: { label: string }) {
  const icons: Record<string, React.ReactNode> = {
    Email: (
      <svg
        className="w-6 h-6 text-accent"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    Phone: (
      <svg
        className="w-6 h-6 text-accent"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
    Address: (
      <svg
        className="w-6 h-6 text-accent"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  }

  return icons[label] || null
}

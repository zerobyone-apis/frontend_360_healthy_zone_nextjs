import { AboutUS } from "../ui/landing/about-us";
import { ContactForm } from "../ui/landing/contact-form"
import { Hero } from "../ui/landing/hero";
import { Pricing } from "../ui/landing/pricing";

export default function Page() {
  return (
    <main >
      <Hero />
      <ContactForm />
      <AboutUS />
      <Pricing />
    </main>
  )
}

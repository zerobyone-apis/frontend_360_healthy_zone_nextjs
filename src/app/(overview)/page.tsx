import AboutUs from "../ui/landing/about-us";
import { Benefits } from "../ui/landing/benefits";
import { ContactForm } from "../ui/landing/contact-form"
import { Hero } from "../ui/landing/hero";
import PreviewSection from "../ui/landing/preview-section";
import { Pricing } from "../ui/landing/pricing";
import { Steps } from "../ui/landing/steps";

export default function Page() {
  return (
    <main >
      <Hero />
      <AboutUs />
      <Steps />
      <PreviewSection />
      <Benefits />
      <Pricing />
      <ContactForm />
    </main>
  )
}

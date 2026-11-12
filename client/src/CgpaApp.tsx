import Nav from './components/Nav';
import Footer from './components/Footer';
import CgpaHero from './components/cgpa/CgpaHero';
import FreeGuide from './components/cgpa/FreeGuide';
import Audience from './components/cgpa/Audience';
import ProgrammeLead from './components/cgpa/ProgrammeLead';
import Pathway from './components/cgpa/Pathway';
import UpcomingProgramme from './components/cgpa/UpcomingProgramme';
import Onboarding from './components/cgpa/Onboarding';
import Features from './components/cgpa/Features';
import Testimonials from './components/cgpa/Testimonials';
import Faq from './components/Faq';
import { FAQS } from './components/cgpa/content';
import ClosingCta from './components/cgpa/ClosingCta';

export default function CgpaApp() {
  return (
    <>
      <Nav current="/cgpa-mentorship/" primaryCta={{ href: '#join', label: 'Apply now' }} />
      <main>
        <CgpaHero />
        <FreeGuide />
        <Audience />
        <ProgrammeLead />
        <Pathway />
        <UpcomingProgramme />
        <Onboarding />
        <Features />
        <Testimonials />
        <Faq items={FAQS} />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}

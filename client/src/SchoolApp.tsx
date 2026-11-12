import { useState } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Faq from './components/Faq';
import SchoolHero from './components/school/SchoolHero';
import Benefits from './components/school/Benefits';
import Included from './components/school/Included';
import Options from './components/school/Options';
import Process from './components/school/Process';
import EnquiryForm from './components/school/EnquiryForm';
import { SCHOOL_FAQS, type OptionId } from './components/school/content';

export default function SchoolApp() {
  const [interest, setInterest] = useState<OptionId>();

  return (
    <>
      <Nav current="/school-partnership/" primaryCta={{ href: '#enquiry', label: 'Make an enquiry' }} />
      <main>
        <SchoolHero />
        <Benefits />
        <Included />
        <Options onEnquire={setInterest} />
        <Process />
        <EnquiryForm presetInterest={interest} />
        <Faq items={SCHOOL_FAQS} tinted />
      </main>
      <Footer />
    </>
  );
}

import Nav from './components/Nav';
import Footer from './components/Footer';
import ExamHero from './components/exam/ExamHero';
import ExamRegister from './components/exam/ExamRegister';
import ExamSteps from './components/exam/ExamSteps';
import NextStep from './components/exam/NextStep';
import ExamContact from './components/exam/ExamContact';

export default function ExamApp() {
  return (
    <>
      <Nav current="/exam-preparation/" primaryCta={{ href: '#register', label: 'Register now' }} />
      <main>
        <ExamHero />
        <ExamRegister />
        <ExamSteps />
        <NextStep />
        <ExamContact />
      </main>
      <Footer />
    </>
  );
}

import Nav from './components/Nav';
import Hero from './components/Hero';
import Vision from './components/Vision';
import Method from './components/Method';
import GpaCalculator from './components/GpaCalculator';
import Paths from './components/Paths';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Vision />
        <Method />
        <GpaCalculator />
        <Paths />
      </main>
      <Footer />
    </>
  );
}

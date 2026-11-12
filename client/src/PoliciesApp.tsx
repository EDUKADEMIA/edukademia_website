import Nav from './components/Nav';
import Footer from './components/Footer';
import PolicyDocument from './components/policies/PolicyDocument';

export default function PoliciesApp() {
  return (
    <>
      <Nav />
      <main>
        <PolicyDocument />
      </main>
      <Footer />
    </>
  );
}

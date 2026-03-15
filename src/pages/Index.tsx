import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Founder from '../components/Founder';
import Facilities from '../components/Facilities';
import Plans from '../components/Plans';
import Outdoor from '../components/Outdoor';
import Transformations from '../components/Transformations';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Index() {
  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />
      <Founder />
      <Facilities />
      <Plans />
      <Outdoor />
      <Transformations />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  );
}

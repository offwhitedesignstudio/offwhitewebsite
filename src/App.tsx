import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { CategoryProvider } from "./context/CategoryContext";
import FloatingSocials from "./components/FloatingSocials";

function App() {
  return (
    <CategoryProvider>
      <div className="min-h-screen relative">
        <Navigation />
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Contact />
        <Footer />

        {/* Floating Socials */}
        <FloatingSocials />
      </div>
    </CategoryProvider>
  );
}

export default App;

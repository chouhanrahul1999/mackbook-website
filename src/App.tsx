import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ProductView from "./components/ProductView";
import Showcase from "./components/Showcase";
import Performance from "./components/Performance";
import Highlights from "./components/Highlights";
import Footer from "./components/Footer";
import Features from "./components/Features";

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProductView />
      <Showcase />
      <Performance />
      <Features />
      <Highlights />
      <Footer />
    </main>
  );
};

export default App;

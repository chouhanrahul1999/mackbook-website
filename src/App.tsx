import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ProductView from "./components/ProductView";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Showcase from "./components/Showcase";

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProductView />
      <Showcase />
    </main>
  );
};

export default App;

import About from "./components/about";
import BrandStatement from "./components/brandStatement/brandStatement";
import ScrollFrameSequence from "./components/cupAnimation/cupAnimation";
import Footer from "./components/Footer/footer";
import Hero from "./components/heroSection/hero";
import HPSecondSection from "./components/homepage/secondSection";
import HorizontalSection from "./components/horizontalSection";
import FluidSmokeSection from "./components/inkCursor/FluidSmokeSection";
import FluidSection from "./components/inkCursor/inkCursor";
import MaskRevealSection from "./components/inkCursor/MaskRevealSection";
import Navbar from "./components/Navbar/navbar";
import Equipment from "./components/pinnedSection";
import PortfolioDetailsHome from "./components/portfolioDetails/portfilioDetails";
import ServicesIntro from "./components/servicesIntro/servicesIntro";

const heroData = {
  image: "/images/hero.png",

  imageAlt:
    "Print, packaging and advertising production",

  eyebrow:
    "PRINT, PACK & ADVERTISING",

  heading: {
    line1: "YOUR BRAND DOESN'T",
    line2: "END ON A SCREEN",
    real: "WE MAKE IT REAL",
  },

  description:
    "From the box your customer picks up to the sign they see from across the street, we produce the physical side of your brand — with the machines, people and experience to get it right.",

  buttons: [
    {
      label: "START A PROJECT",
      href: "consultation",
      icon: "→",
      variant: "primary",
    },

    {
      label: "SEE WHAT WE MAKE",
      href: "portfolio",
      icon: "↗",
      variant: "secondary",
    },
  ],

  scrollText: "SCROLL",

  showScroll: true,
};

export default function Home() {
  return (
    <>
      <main className="main-content">
        {/* <FluidSection/> */}
        {/* <MaskRevealSection/> */}
        {/* <FluidSmokeSection/> */}
        <Hero data={heroData} />
        <HPSecondSection />
        <ServicesIntro />
        <BrandStatement />
     
        <PortfolioDetailsHome />
      </main>
    </>
  );
}
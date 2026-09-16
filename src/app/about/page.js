import AboutSection2 from "../components/aboutSection2/aboutSection2";
import AboutSection3 from "../components/aboutSection3/aboutSection3";
import ScrollFrameSequence from "../components/cupAnimation/cupAnimation";
import Hero from "../components/heroSection/hero";

const heroData = {
  image: "/images/about.png",

  imageAlt:
    "Print, packaging and advertising production",

  eyebrow:
    "ABOUT PRINT, PACK & ADVERTISING",

  heading: {
    line1: "WE MAKE BRANDS",
    line2: "",
    real: "IMPOSSIBLE TO IGNORE",
  },

  description:
    "A brand isn't just a logo on a screen. <br/>It's the box in your customer's hands <br/>The sign they see from the street. ",


  buttons: [
    {
      label: "START A PROJECT",
      href: "#contact",
      icon: "→",
      variant: "primary",
    },

    {
      label: "SEE WHAT WE MAKE",
      href: "#work",
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
        <Hero data={heroData} />
        <AboutSection2/>
        <AboutSection3/>
      </main>
    </>
  );
}
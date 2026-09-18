import AboutSection2 from "../components/aboutSection2/aboutSection2";
import AboutSection3 from "../components/aboutSection3/aboutSection3";
import AdvService from "../components/advService/advService";
import ScrollFrameSequence from "../components/cupAnimation/cupAnimation";
import Hero from "../components/heroSection/hero";
import ServicesContainerSection from "../components/servicesContainerSection/servicesContainerSection";

export const metadata = {
  title: "Printing, Packaging & Advertising Services",
  description:
    "Explore PPA's printing, packaging and advertising services, from commercial print and custom packaging to signage, displays and outdoor advertising.",
};

const heroData = {
    image: "/images/portfolio.png",

    imageAlt:
        "Services",

    eyebrow:
        "SERVICES",

    heading: {
        line1: "THREE WAYS TO MAKE",
        line2: "",
        real: "YOUR BRAND SHOW UP",
    },

    description:
        "Print, Packaging and Advertising<br/>Different Formats - Different Applications<br/>MAKE YOUR BRAND HARD TO MISS. ",


    buttons: [
        {
            label: "START A PROJECT",
            href: "consultation",
            icon: "→",
            variant: "primary",
        },

    ],

    scrollText: "SCROLL",

    showScroll: true,
};

const PRINT_FRAMES = [
    "/images/print-frames/print-001.png",
    "/images/print-frames/print-002.png",
    "/images/print-frames/print-003.png",
    "/images/print-frames/print-004.png",
    "/images/print-frames/print-005.png",
    "/images/print-frames/print-006.png",
    "/images/print-frames/print-007.png",
];


const PACK_FRAMES = [
    "/images/pack-frames/cup-001.png",
    "/images/pack-frames/cup-002.png",
    "/images/pack-frames/cup-003.png",
    "/images/pack-frames/cup-004.png",
    "/images/pack-frames/cup-005.png",
    "/images/pack-frames/cup-006.png",
    "/images/pack-frames/cup-007.png",
    "/images/pack-frames/cup-008.png",
    "/images/pack-frames/cup-009.png",
    "/images/pack-frames/cup-010.png",
    "/images/pack-frames/cup-011.png",
];


export default function Home() {
    return (
        <>
            <main className="main-content">
                <Hero data={heroData} />
                {/* <ServicesContainerSection/> */}
                <ScrollFrameSequence
                    frames={PRINT_FRAMES}
                    headingMain="PUT IT ON PAPER."
                    headingSub="MAKE IT COUNT."
                    tag="PRINTING"
                    items={[
                        "Business cards.",
                        "Brochures.",
                        "Catalogues.",
                        "Corporate stationery.",
                        "Marketing material.",
                        "Large-format graphics.",
                    ]}
                    leadText="Whatever the format, your print is part of your brand."
                    leadHighlight="We make sure it looks the part."
                    calloutTitle="PRINT THAT GETS NOTICED."
                    calloutSub="AND REMEMBERED."
                    bgColor="#f4f1ea"
                    scaleFactor={0.72}
                />
                 <ScrollFrameSequence
                    frames={PACK_FRAMES}
                    headingMain="WHAT'S INSIDE MATTERS."
                    headingSub="SO DOES WHAT'S OUTSIDE."
                    tag="PACKAGING"
                    items={[
                        "Product boxes.",
                        "Custom cartons.",
                        "Retail packaging.",
                        "Food & beverage packaging.",
                        "Labels & sleeves.",
                        "Flexible packaging.",
                        "Custom packaging designs."
                    ]}
                    leadText="Your packaging is often the first thing people see."
                    leadHighlight="We make sure it looks good, feels right, and represents your brand."
                    calloutTitle="PACKAGING THAT"
                    calloutSub="MAKES YOUR PRODUCT STAND OUT."
                    bgColor="#f4f1ea"
                     scaleFactor={0.72}
                />
                <AdvService />
            </main>
        </>
    );
}
import React from "react";
import MaskRevealHero from "../components/inkCursor/MaskRevealSection";
import ProjectShowcase from "../components/projectShowcase/projectShowcase";
import Hero from "../components/heroSection/hero";


export const metadata = {
    title: "Printing, Packaging & Advertising Portfolio",
    description:
        "Explore the Print, Pack & Advertising portfolio featuring printing, packaging, signage, displays and advertising work created for businesses and brands.",
};


const heroData = {
    image: "/images/portfolio.png",

    imageAlt:
        "Print, packaging and advertising production",

    eyebrow:
        "PORTFOLIO",

    heading: {
        line1: "WORK ",
        line2: "",
        real: "THAT DOES THE TALKING",
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

export default function Portfolio() {
    return (
        <div className="portfolio">
            {/* <FluidSmokeSection/> */}
            <div className="herosection_port_mob">
                <Hero data={heroData} />
            </div>
            <div className="herosection_port_desk">
                <MaskRevealHero />
            </div>

            <ProjectShowcase />
        </div>
    )
}
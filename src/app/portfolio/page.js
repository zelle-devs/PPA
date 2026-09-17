import React from "react";
import FluidSmokeSection from "../components/inkCursor/FluidSmokeSection";
import MaskRevealHero from "../components/inkCursor/MaskRevealSection";
import ProjectShowcase from "../components/projectShowcase/projectShowcase";


export const metadata = {
  title: "Printing, Packaging & Advertising Portfolio",
  description:
    "Explore the Print, Pack & Advertising portfolio featuring printing, packaging, signage, displays and advertising work created for businesses and brands.",
};

export default function Portfolio() {
    return(
        <div className="portfolio">
            {/* <FluidSmokeSection/> */}
            <MaskRevealHero/>
            <ProjectShowcase/>
        </div>
    )
}
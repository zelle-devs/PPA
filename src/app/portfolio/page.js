import React from "react";
import FluidSmokeSection from "../components/inkCursor/FluidSmokeSection";
import MaskRevealHero from "../components/inkCursor/MaskRevealSection";
import ProjectShowcase from "../components/projectShowcase/projectShowcase";
export default function Portfolio() {
    return(
        <div className="portfolio">
            {/* <FluidSmokeSection/> */}
            <MaskRevealHero/>
            <ProjectShowcase/>
        </div>
    )
}
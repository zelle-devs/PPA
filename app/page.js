import Hero from "@/components/HomePage/Hero/Hero";
import IndustriesWeServe from "@/components/HomePage/IndustriesWeServe/IndustriesWeServe";
import OurProduction from "@/components/HomePage/OurProduction/OurProduction";
import PrintingPackagingAdvertising from "@/components/HomePage/PrintingPackagingAdvertising/PrintingPackagingAdvertising";
import PrintingPackagingAdvertising2 from "@/components/HomePage/PrintingPackagingAdvertising/PrintingPackagingAdvertising2";
import WhatWeDo from "@/components/HomePage/WhatWeDo/WhatWeDo";
import WhoWeAre from "@/components/HomePage/WhoWeAre/WhoWeAre";
import WhyPPA from "@/components/HomePage/WhyPPA/WhyPPA";

export default function Home() {
  return (
    <>
      <Hero/>
      <div className="scroll-content-wrapper">
     <OurProduction/>
     <WhoWeAre/>
     <WhatWeDo/>
     <PrintingPackagingAdvertising2/>
     <PrintingPackagingAdvertising/>
     <IndustriesWeServe/>
     <WhyPPA/>
</div>
    </>
  )
}
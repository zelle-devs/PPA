import B2BSolutions from "@/components/HomePage/B2BSolutions/B2BSolutions";
import FeaturedWork from "@/components/HomePage/FeaturedWork/FeaturedWork";
import FromDesignToDelivery from "@/components/HomePage/FromDesignToDelivery/FromDesignToDelivery";
import Hero from "@/components/HomePage/Hero/Hero";
import IndustriesWeServe from "@/components/HomePage/IndustriesWeServe/IndustriesWeServe";
import OurProduction from "@/components/HomePage/OurProduction/OurProduction";
import PrintingPackagingAdvertising from "@/components/HomePage/PrintingPackagingAdvertising/PrintingPackagingAdvertising";
import PrintingPackagingAdvertising2 from "@/components/HomePage/PrintingPackagingAdvertising/PrintingPackagingAdvertising2";
import ProductionCapabilities from "@/components/HomePage/ProductionCapabilities/ProductionCapabilities";
import RequestQuote from "@/components/HomePage/Requestquote/Requestquote";
import RequestQuote2 from "@/components/HomePage/Requestquote/RequestQuote2";
import RequestQuoteSection from "@/components/HomePage/RequestQuoteSection/RequestQuoteSection";
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
     {/* <PrintingPackagingAdvertising/> */}
     <IndustriesWeServe/>
     <WhyPPA/>
     <FromDesignToDelivery/>
     <FeaturedWork/>
     <ProductionCapabilities/>
     <B2BSolutions/>
     <RequestQuoteSection/>
     <RequestQuote/>
     <RequestQuote2/>
</div>
    </>
  )
}
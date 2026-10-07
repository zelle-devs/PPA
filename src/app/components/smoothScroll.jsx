// "use client";

// import { useEffect } from "react";
// import Lenis from "lenis";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export default function SmoothScroll({ children }) {
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.2,
//       smoothWheel: true,
//       smoothTouch: true,
//     });

//     lenis.on("scroll", ScrollTrigger.update);

//     const update = (time) => {
//       lenis.raf(time * 1000);
//     };

//     gsap.ticker.add(update);
//     gsap.ticker.lagSmoothing(0);

//     return () => {
//       gsap.ticker.remove(update);
//       lenis.destroy();
//     };
//   }, []);

//   return children;
// }


"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });

    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    const lenis = new Lenis({
      // Desktop wheel
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: true,
      syncTouchLerp: 0.14, 
      touchMultiplier: 1, 
      touchInertiaMultiplier: 18,
      touchInertiaExponent: 1.4,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Recalculate pins once Lenis is running
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return children;
}
import BookingSystem from "../../Consultation/BookingSystem";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { Suspense } from "react";

export default function ConsultationPage() {
  return (
    <>
      <section className="scroll-section" data-section-type="short" style={{ maxWidth: "100%", paddingBottom: "30px",backgroundColor:"#fff" }}>
        <Suspense fallback={<LoadingSpinner/>}>
          <BookingSystem />
        </Suspense>
      </section>
    </>
  )
}

// import BookingSystem from "@/components/Consultation/BookingSystem";
// import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
// import { Suspense } from "react";

// export default function ConsultationPage() {
//   return (
//     <>
//       <div style={{ maxWidth: "100%", paddingBottom: "30px" }}>
//     <Suspense fallback={<LoadingSpinner/>}>
//         <BookingSystem />
//       </Suspense>
//       </div>
//     </>
//   )
// }
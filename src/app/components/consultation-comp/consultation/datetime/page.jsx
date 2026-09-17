import { Suspense } from "react";
import BookingSystem from "@/app/components/Consultation/BookingSystem";
import LoadingSpinner from "@/app/components/LoadingSpinner/LoadingSpinner";

export default function DateTimePage() {
   return (
        <Suspense fallback={<LoadingSpinner/>}>
            <BookingSystem />
        </Suspense>
    );
}
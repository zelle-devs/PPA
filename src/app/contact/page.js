import React from "react";
import ContactSection from "../components/contactSection/contactSection";
import ContactHero from "../components/contactHero/contactHero";

const contactData = {
  heading: "We're Here to Help!",
  image:"/images/hero.png",
  description: "Drop us a message and our team will get back to you.",
  socials: [
  ]
};
export const metadata = {
  title: "Contact Print, Pack & Advertising",
  description:
    "Get in touch with Print, Pack & Advertising for general enquiries, questions, partnerships, and information about our services.",
};
export default function Contact() {
    return(
        <div>
            <ContactHero/>
            <ContactSection data={contactData} />
        </div>
    )
}
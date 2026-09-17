import {Inter, Sora, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/smoothScroll";
import Navbar from "./components/Navbar/navbar";
import Footer from "./components/Footer/footer";

const sora = Sora({
  variable: "--font-primary",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-secondary",
  subsets: ["latin"],
});


const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto",
  subsets: ['latin'],
  weight: ['700', '800', '900'],
})

export const metadata = {
  metadataBase: new URL("https://printpackadvertising.com"),

  title: {
    default: "Print, Pack & Advertising | PPA",
    template: "%s | PPA",
  },

  description:
    "Print, Pack & Advertising delivers professional printing, packaging, signage, displays and advertising solutions for businesses.",

  keywords: [
    "printing services",
    "packaging services",
    "advertising services",
    "commercial printing",
    "custom packaging",
    "signage",
    "display advertising",
    "Print Pack Advertising",
    "PPA",
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    siteName: "Print, Pack & Advertising",
    title: "Print, Pack & Advertising | PPA",
    description:
      "Professional printing, packaging and advertising solutions for businesses.",
    url: "https://printpackadvertising.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${robotoCondensed.variable}`}>
      <body>
        <SmoothScroll>
          <Navbar/>
          {children}
          <Footer/>
        </SmoothScroll>
      </body>
    </html>
  );
}

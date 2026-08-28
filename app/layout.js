import Footer from '@/components/Footer/Footer'
import './globals.css'
import Navbar from '@/components/Navbar/Navbar'

export const metadata = {
  title: 'PPA - Premium Platform',
  description: 'PPA - Premium Platform for Excellence',
  icons: {
    icon: '/icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
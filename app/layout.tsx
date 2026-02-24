import type { Metadata } from 'next'
import { Playfair_Display, Montserrat, Great_Vibes } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Preloader from '@/components/layout/Preloader'
import ScrollToTop from '@/components/layout/ScrollToTop'
import SmoothScroll from '@/components/layout/SmoothScroll'
import NoiseOverlay from '@/components/ui/NoiseOverlay'

const greatVibes = Great_Vibes({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-great-vibes',
  display: 'swap',
  preload: true,
})

const playfair = Playfair_Display({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-playfair',
})

const montserrat = Montserrat({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: "Sri Mayyia Caterers - Premium Fine Dining Experience",
  description: "Experience culinary excellence in an atmosphere of refined elegance. Where tradition meets innovation, and every meal is a masterpiece.",
  keywords: "fine dining, restaurant, premium cuisine, luxury dining, gourmet food",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${greatVibes.variable} ${playfair.variable} ${montserrat.variable}`}>
      <body className="font-montserrat antialiased">
        <Preloader />
        <div className="relative min-h-screen">
          <Header />
          <NoiseOverlay />
          <SmoothScroll />
          <main>{children}</main>
          <Footer />
          <ScrollToTop />
        </div>
      </body>
    </html>
  )
}

import dynamic from 'next/dynamic'
import PremiumHero from '@/components/home/PremiumHero'
import LaserFlowSection from '@/components/home/LaserFlowSection'
import PreloadSphereImages from '@/components/home/PreloadSphereImages'

// Lazy load heavy components for better performance

const AboutSection = dynamic(() => import('@/components/home/AboutWithLaser'), {
  loading: () => <div className="h-[600px] bg-beige" />,
})

const SignatureSection = dynamic(() => import('@/components/home/SignatureSection'), {
  loading: () => <div className="h-[400px] bg-beige" />,
})

const CateringSpecialisationsSection = dynamic(() => import('@/components/home/CateringSpecialisationsSection'), {
  loading: () => <div className="h-[400px] bg-beige" />,
})

const GallerySection = dynamic(() => import('@/components/home/GallerySection'), {
  loading: () => <div className="h-[800px] bg-beige" />,
})

const ChefsSection = dynamic(() => import('@/components/home/ChefsSection'), {
  loading: () => <div className="h-[600px] bg-beige" />,
})

const ReservationSection = dynamic(() => import('@/components/home/ReservationSection'), {
  loading: () => <div className="h-[500px] bg-beige" />,
})

export default function Home() {
  return (
    <>
      <PreloadSphereImages />
      <PremiumHero />
      <LaserFlowSection />
      <AboutSection />
      <SignatureSection />
      <CateringSpecialisationsSection />
      <GallerySection />
      <ChefsSection />
      <ReservationSection />
    </>
  )
}

import { Metadata } from 'next'
import GalleryHero from '@/components/pages/GalleryHero'
import ScatterGallery from '@/components/pages/ScatterGallery'

export const metadata: Metadata = {
  title: "Gallery - Sri Mayyia Caterers",
  description: 'Elegance, Captured. Excellence, Framed. View our catering services, events, and culinary presentations.',
}

export default function GalleryPage() {
  return (
    <>
      <GalleryHero />
      <ScatterGallery />
    </>
  )
}

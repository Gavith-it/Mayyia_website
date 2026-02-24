import { Metadata } from 'next'
import GalleryHero from '@/components/pages/GalleryHero'
import GalleryGrid from '@/components/pages/GalleryGrid'

export const metadata: Metadata = {
  title: "Gallery - Sri Mayyia Caterers",
  description: 'Elegance, Captured. Excellence, Framed. View our catering services, events, and culinary presentations.',
}

import ScatterGallery from '@/components/pages/ScatterGallery'

export default function GalleryPage() {
  return (
    <>
      <GalleryHero />
      <ScatterGallery />
    </>
  )
}

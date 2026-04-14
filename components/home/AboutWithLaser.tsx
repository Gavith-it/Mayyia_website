'use client'

import { useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import SphereImageGrid, { ImageData } from '@/components/ui/img-sphere'
import { IMAGE_ASSETS } from '@/lib/image-assets'

const sphereImages: ImageData[] = IMAGE_ASSETS.home.sphere.map((src, i) => ({
  id: `sphere-${i + 1}`,
  src,
  alt: `Sri Mayyia Caterers — ${i + 1}`,
}))

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const memoizedImages = useMemo(() => sphereImages, [])

  return (
      <section
        ref={containerRef}
        className="relative pt-8 pb-12 bg-beige overflow-visible z-20"
        style={{ position: 'relative' }}
      >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* 3D Image Sphere */}
          <div className="relative h-[500px] lg:h-[600px] flex items-center justify-center" style={{ contain: 'layout style paint' }}>
            <SphereImageGrid
              images={memoizedImages}
              containerSize={600}
              sphereRadius={200}
              dragSensitivity={0.8}
              momentumDecay={0.96}
              maxRotationSpeed={6}
              baseImageScale={0.18}
              hoverScale={1.4}
              perspective={1200}
                autoRotate={true}
                autoRotateSpeed={0.5}
              className="w-full h-full"
            />
          </div>

          {/* TEXT CONTENT - Visible immediately for better UX */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="section-subtitle"
            >
              OUR STORY
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="section-heading-light text-left"
            >
              A Legacy Since <span className="gradient-text">1953</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-charcoal text-lg leading-relaxed"
            >
              Sri Mayyia Caterers is built on heritage, discipline, and uncompromised vegetarian purity.
              Across generations, we have elevated catering into a crafted hospitality experience — warm,
              elegant, and exact.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted leading-relaxed"
            >
              Founded by Sri K. Ramakrishna Mayyia, our philosophy is simple: food must honour
              tradition, serve with grace, and be delivered with meticulous care — so every gathering feels
              truly special.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 gap-6 pt-6"
            >
              <motion.div whileHover={{ scale: 1.02, y: -2 }} className="premium-card">
                <div className="text-4xl font-playfair font-bold gradient-text mb-2">73+</div>
                <div className="text-muted">Years of Culinary Heritage</div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02, y: -2 }} className="premium-card">
                <div className="text-4xl font-playfair font-bold gradient-text mb-2">Thousands+</div>
                <div className="text-muted">Happy Guests</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


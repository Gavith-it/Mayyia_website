'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { IMAGE_ASSETS } from '@/lib/image-assets'
import KineticText from '@/components/ui/KineticText'

export default function MenuHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  const images = IMAGE_ASSETS.menu.bentoGrid || []

  // Configuration for the 9-image Bento Grid (1 center, 8 surrounding)
  // Grid is 4 columns x 3 rows on desktop, 2x3 on mobile
  const gridItems = [
    // 1. Top row, col 1 (hidden on mobile)
    { src: images[1], className: "hidden md:block col-start-1 col-end-2 row-start-1 row-end-2" },
    // 2. Top row, col 2 (top left on mobile)
    { src: images[2], className: "col-start-1 col-end-2 row-start-1 row-end-2 md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2" },
    // 3. Top row, col 3 (top right on mobile)
    { src: images[3], className: "col-start-2 col-end-3 row-start-1 row-end-2 md:col-start-3 md:col-end-4 md:row-start-1 md:row-end-2" },
    // 4. Top row, col 4 (hidden on mobile)
    { src: images[4], className: "hidden md:block col-start-4 col-end-5 row-start-1 row-end-2" },
    
    // 5. Middle row, col 1 (hidden on mobile)
    { src: images[5], className: "hidden md:block col-start-1 col-end-2 row-start-2 row-end-3" },
    
    // 0. CENTER IMAGE (spans 2 cols, 2 rows)
    { src: images[0], className: "col-start-1 col-end-3 row-start-2 row-end-4 md:col-start-2 md:col-end-4 md:row-start-2 md:row-end-4 z-10" },
    
    // 6. Middle row, col 4 (hidden on mobile)
    { src: images[6], className: "hidden md:block col-start-4 col-end-5 row-start-2 row-end-3" },
    // 7. Bottom row, col 1 (hidden on mobile)
    { src: images[7], className: "hidden md:block col-start-1 col-end-2 row-start-3 row-end-4" },
    // 8. Bottom row, col 4 (hidden on mobile)
    { src: images[8], className: "hidden md:block col-start-4 col-end-5 row-start-3 row-end-4" },
  ]

  return (
    <section ref={containerRef} className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-black">

      {/* Bento Grid Background Container */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 z-0 w-full h-full opacity-80"
      >
        <div className="absolute inset-0 grid grid-cols-2 lg:grid-cols-4 grid-rows-3 gap-1 md:gap-2 p-1 md:p-2 bg-white">
          {gridItems.map((item, index) => (
            <div key={index} className={`relative w-full h-full bg-gray-200 overflow-hidden ${item.className}`}>
              {item.src && (
                <Image
                  src={item.src}
                  alt={`Menu collage ${index}`}
                  fill
                  unoptimized // Bypass Next.js image optimization for perfect performance
                  priority={index === 5} // Priority to the center image (index 5 in gridItems array)
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  quality={90}
                />
              )}
            </div>
          ))}
        </div>
        
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 z-20 pointer-events-none" />
      </motion.div>

      {/* Hero Content */}
      <div className="container-custom relative z-30 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-gold-400 bg-black/50 px-4 py-1 rounded-full uppercase tracking-[0.3em] text-xs md:text-sm font-medium mb-4 backdrop-blur-sm border border-gold-400/20">
              Taste the Legacy
            </span>

            <KineticText
              text="Culinary Artistry"
              typ="char"
              stagger={0.05}
              className="text-6xl md:text-8xl font-great-vibes text-white drop-shadow-[0_4px_8px_rgba(0,0,0,1)] mb-6 block min-h-[1.2em]"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-gray-200 font-playfair text-lg md:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-md bg-black/20 p-2 rounded-lg backdrop-blur-sm"
            >
              A symphony of flavors, crafted with passion and served with royal grace.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

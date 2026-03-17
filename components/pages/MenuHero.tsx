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
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  return (
    <section ref={containerRef} className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-black">

      {/* Cinematic Background */}
      <motion.div
        style={{ y, scale, opacity }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={IMAGE_ASSETS.menu.hero}
          alt="Exquisite Menu"
          fill
          priority
          className="object-cover"
          quality={95}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
      </motion.div>

      {/* Content */}
      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-gold-400 uppercase tracking-[0.3em] text-xs md:text-sm font-medium mb-4">
              Taste the Legacy
            </span>

            <KineticText
              text="Culinary Artistry"
              typ="char"
              stagger={0.05}
              className="text-6xl md:text-8xl font-great-vibes text-white drop-shadow-lg mb-6 block min-h-[1.2em]"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-gray-300 font-playfair text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            >
              A symphony of flavors, crafted with passion and served with royal grace.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

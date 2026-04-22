'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { IMAGE_ASSETS } from '@/lib/image-assets'

export default function ChefsHero() {
  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={IMAGE_ASSETS.chefs.hero}
          alt="Our Chefs"
          fill
          unoptimized
          sizes="100vw"
          quality={92}
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80" />
      </div>
      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-subtitle mb-4">Our Team</div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-white mb-6">
            Master <span className="gradient-text">Chefs</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet the culinary artists behind every exceptional dish
          </p>
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import BentoGridAbout from '@/components/home/BentoGridAbout'

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  return (
    <section
      ref={containerRef}
      className="relative z-10 pt-20 pb-24 -mt-20 overflow-visible bg-gradient-to-b from-dark-900 via-dark-900 to-dark-800"
      style={{ position: 'relative' }}
    >
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-12 items-center">

          {/* Bento Grid Layout Area - Taking 60% width on Desktop */}
          <div className="w-full lg:w-[60%] order-2 lg:order-1">
            <BentoGridAbout />
          </div>

          {/* Text Content - Taking 40% width on Desktop */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[40%] space-y-6 order-1 lg:order-2 pl-0 lg:pl-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px' }}
              transition={{ delay: 0.1 }}
              className="section-subtitle relative z-40"
            >
              Our Story
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="section-heading text-left"
            >
              A Legacy of <span className="gradient-text">Excellence</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-gray-300 text-lg leading-relaxed"
            >
              For over three decades, Sri Mayyia Caterers has been a beacon of culinary excellence,
              blending traditional techniques with innovative flavors to create unforgettable dining experiences.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 leading-relaxed"
            >
              Our master chefs, trained in the finest culinary traditions, craft each dish with
              meticulous attention to detail. We source only the finest ingredients from trusted
              local and international suppliers.
            </motion.p>

            {/* Read More Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="pt-4"
            >
              <a href="/about" className="btn-primary">Learn More</a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

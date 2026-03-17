'use client'

import { motion } from 'framer-motion'

export default function MapSection() {
  return (
    <section className="relative h-[50vh] min-h-[400px] w-full bg-beige border-t border-borderLight">
      {/* Grayscale Map Filter */}
      <div className="absolute inset-0 z-0 filter grayscale contrast-100 brightness-110 bg-beige">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15555.23101968817!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1625633842125!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          className="w-full h-full opacity-60 hover:opacity-100 transition-opacity duration-700"
        />
      </div>

      {/* Overlay Card */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-md px-4">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="bg-offwhite/90 backdrop-blur-md border border-borderLight p-8 rounded-2xl text-center shadow-2xl"
         >
           <h3 className="text-2xl font-playfair text-charcoal mb-2">Visit Our Kitchen</h3>
           <p className="text-muted text-sm mb-4">
             Experience the hygiene and precision behind our culinary art.
             <br /><span className="text-xs text-charcoal/60">(By Appointment Only)</span>
           </p>
           <a
            href="https://goo.gl/maps/example"
            target="_blank"
            rel="noopener noreferrer"
            className="text-maroon hover:text-gold-600 border-b border-maroon text-sm pb-1 transition-colors"
          >
            Get Directions
          </a>
        </motion.div>
      </div>
    </section>
  )
}

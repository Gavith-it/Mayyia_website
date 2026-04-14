'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { FiX } from 'react-icons/fi'
import { IMAGE_ASSETS } from '@/lib/image-assets'

export default function CategoryGallery() {
  const categories = IMAGE_ASSETS.gallery.categories || []
  const [selectedCategoryName, setSelectedCategoryName] = useState(
    categories.length > 0 ? categories[0].name : ''
  )
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string; category: string } | null>(null)

  const activeCategory = categories.find((c) => c.name === selectedCategoryName)
  const imagesToDisplay = activeCategory ? activeCategory.images : []

  return (
    <section className="section-padding bg-beige min-h-screen">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-great-vibes text-charcoal mb-4"
          >
            Our Gallery
          </motion.h2>
          <p className="text-muted font-playfair italic max-w-2xl mx-auto">
            Explore our curated collections of moments, setups, and experiences.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.name}
              onClick={() => setSelectedCategoryName(category.name)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                selectedCategoryName === category.name
                  ? 'bg-brandGold text-charcoal shadow-lg'
                  : 'bg-offwhite border border-borderLight text-charcoal hover:border-brandGold'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Grid Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategoryName}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {imagesToDisplay.map((img, idx) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                onClick={() => setSelectedImage({ ...img, category: selectedCategoryName })}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-md cursor-pointer bg-offwhite"
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-playfair text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {img.title}
                  </h3>
                  <p className="text-brandGold text-sm mt-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {selectedCategoryName}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {imagesToDisplay.length === 0 && (
          <div className="text-center text-muted py-12">
            No images found for this category.
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-10"
            >
              <FiX size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full h-[85vh] flex flex-col pt-12"
            >
              <div className="relative flex-1 rounded-lg overflow-hidden">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  quality={90}
                />
              </div>
              <div className="text-center mt-6">
                <h3 className="text-3xl font-playfair text-white mb-2">{selectedImage.title}</h3>
                <p className="text-brandGold text-lg tracking-wide">{selectedImage.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

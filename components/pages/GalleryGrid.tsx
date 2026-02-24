'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { FiX } from 'react-icons/fi'
import { IMAGE_ASSETS } from '@/lib/image-assets'

const ITEMS_PER_ROW = 8

const galleryTitles: { title: string; category: string }[] = [
  { title: 'Elegant Dining Room', category: 'Interior' },
  { title: 'Signature Dish', category: 'Food' },
  { title: "Chef's Special", category: 'Food' },
  { title: 'Premium Presentation', category: 'Food' },
  { title: 'Dessert Collection', category: 'Food' },
  { title: 'Private Dining', category: 'Interior' },
  { title: 'Wine Selection', category: 'Beverages' },
  { title: 'Evening Ambiance', category: 'Interior' },
  { title: 'Fine Dining Experience', category: 'Interior' },
]
const baseGalleryImages = IMAGE_ASSETS.gallery.grid.map((src, i) => ({
  id: i + 1,
  src,
  title: galleryTitles[i]?.title ?? '',
  category: galleryTitles[i]?.category ?? 'Interior',
}))

// Cycle base images so we have enough for multiple full rows of 8 (e.g. 24 = 3 rows)
function buildGalleryForFullRows(count: number): typeof baseGalleryImages {
  const list: typeof baseGalleryImages = []
  for (let i = 0; i < count; i++) {
    const item = baseGalleryImages[i % baseGalleryImages.length]
    list.push({ ...item, id: i + 1 })
  }
  return list
}

const galleryImages = buildGalleryForFullRows(24) // 3 full rows of 8

export default function GalleryGrid() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const categories = ['All', ...Array.from(new Set(galleryImages.map(item => item.category)))]

  const filteredItems = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter(item => item.category === selectedCategory)

  // Only full rows: take first N*8 items so every row has exactly 8
  const fullRowCount = Math.floor(filteredItems.length / ITEMS_PER_ROW)
  const rows = useMemo(() => {
    const r: typeof filteredItems[] = []
    for (let i = 0; i < fullRowCount * ITEMS_PER_ROW; i += ITEMS_PER_ROW) {
      r.push(filteredItems.slice(i, i + ITEMS_PER_ROW))
    }
    return r
  }, [fullRowCount, filteredItems])

  return (
    <section className="section-padding bg-beige">
      <div className="container-custom">
        {/* Gallery Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="section-description-light mb-6">
            Our work is best experienced in person—but here is a glimpse of what we deliver.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {[
              'Lavish wedding spreads with silver service',
              'Sacred setups for rituals and poojas',
              'Live counters curated for culinary theatre',
              'Signature plating and presentation across cuisines',
              'Behind-the-scenes discipline of our kitchen and crew',
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="premium-card text-center"
              >
                <p className="text-muted text-sm">{item}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-brandGold font-semibold text-lg italic">
            This is not food photography. This is visual testimony.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-brandGold text-charcoal shadow-lg'
                  : 'bg-offwhite border border-borderLight text-charcoal hover:border-brandGold'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Gallery: full rows of 8 — narrower container, images stay sharp */}
        <div className="max-w-[1140px] w-full mx-auto flex flex-col gap-4">
          {rows.length === 0 && (
            <p className="text-center text-muted py-12">No gallery rows for this category. Select &quot;All&quot; to see full rows of 8.</p>
          )}
          {rows.map((rowItems, rowIndex) => (
            <motion.div
              key={rowIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: rowIndex * 0.08 }}
              className="gallery-wrap flex w-full h-[70vh] min-h-[280px] gap-1"
            >
              {rowItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  className="group item flex-1 h-full min-w-0 relative bg-center bg-cover bg-no-repeat rounded-lg overflow-hidden cursor-pointer transition-[flex] duration-700 ease-out hover:flex-[7]"
                  onClick={() => setSelectedImage(item.id)}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1140px) 14vw, 143px"
                    className="object-cover"
                    quality={92}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                    <h3 className="text-lg font-playfair text-white truncate">{item.title}</h3>
                    <p className="text-brandGold text-sm">{item.category}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-brandGold transition-colors z-10"
              >
                <FiX className="w-8 h-8" />
              </button>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="max-w-5xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-[80vh] rounded-xl overflow-hidden">
                  <Image
                    src={galleryImages.find(item => item.id === selectedImage)?.src || ''}
                    alt={galleryImages.find(item => item.id === selectedImage)?.title || ''}
                    fill
                    sizes="90vw"
                    className="object-contain"
                    quality={92}
                  />
                </div>
                <div className="mt-4 text-center text-white">
                  <h3 className="text-2xl font-playfair mb-2">
                    {galleryImages.find(item => item.id === selectedImage)?.title}
                  </h3>
                  <p className="text-brandGold">
                    {galleryImages.find(item => item.id === selectedImage)?.category}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

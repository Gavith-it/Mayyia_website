'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { IMAGE_ASSETS } from '@/lib/image-assets'
import { FiX, FiZoomIn } from 'react-icons/fi'

// Generate dummy data from existing assets
const galleryImages = [
    ...IMAGE_ASSETS.gallery.grid,
    ...IMAGE_ASSETS.home.gallery,
    ...IMAGE_ASSETS.chefs.grid
].map((src, i) => ({
    id: i,
    src,
    rotation: Math.random() * 10 - 5, // Random rotation between -5 and 5 deg
    scale: 0.9 + Math.random() * 0.2, // Random scale
    category: i % 3 === 0 ? 'Events' : i % 3 === 1 ? 'Food' : 'Ambiance'
})).slice(0, 12) // Limit to 12 for the demo to avoid overcrowding or broken image links if arrays are short

export default function ScatterGallery() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null)
    const containerRef = useRef(null)

    // Staggered reveal
    const cardVariants = {
        hidden: { opacity: 0, y: 100, rotate: 0 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            rotate: galleryImages[i].rotation,
            transition: {
                delay: i * 0.1,
                duration: 0.8,
                type: 'spring',
                bounce: 0.4
            } as any // Cast to any to avoid strict type checks on specific spring props mixed with general transition
        }),
        hover: {
            scale: 1.1,
            rotate: 0,
            zIndex: 10,
            transition: { duration: 0.3 }
        }
    }

    return (
        <section ref={containerRef} className="min-h-screen bg-[#050505] py-24 overflow-hidden">
            <div className="container-custom">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-great-vibes text-gold-400 mb-4"
                    >
                        Captured Moments
                    </motion.h2>
                    <p className="text-gray-400 font-playfair italic">A glimpse into our world of elegance</p>
                </div>

                {/* Scatter Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-24 px-4 md:px-12">
                    {galleryImages.map((img, i) => (
                        <motion.div
                            key={img.id}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            whileHover="hover"
                            viewport={{ once: true, margin: "-50px" }}
                            onClick={() => setSelectedImage(img.id)}
                            className="relative cursor-pointer group"
                        >
                            {/* Polaroid-style Card */}
                            <div className="bg-white p-4 pb-12 shadow-2xl transform transition-transform duration-500">
                                <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
                                    <Image
                                        src={img.src}
                                        alt="Gallery Image"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="text-white/80 tracking-widest uppercase text-xs border border-white/50 px-4 py-2">
                                            View
                                        </span>
                                    </div>
                                </div>
                                <div className="absolute bottom-4 left-0 right-0 text-center">
                                    <span className="font-great-vibes text-2xl text-dark-900 opacity-60">
                                        {img.category}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-5xl w-full h-[80vh]"
                        >
                            {galleryImages.find(img => img.id === selectedImage) && (
                                <Image
                                    src={galleryImages.find(img => img.id === selectedImage)!.src}
                                    alt="Full View"
                                    fill
                                    className="object-contain"
                                />
                            )}
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors"
                            >
                                <FiX size={32} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

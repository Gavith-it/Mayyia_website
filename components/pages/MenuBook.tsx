'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MENU_CATEGORIES } from '@/lib/menu-data'
import { IMAGE_ASSETS } from '@/lib/image-assets'
import Image from 'next/image'

export default function MenuBook() {
    const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0].id)

    // Helper: get current category data
    const currentCategoryData = MENU_CATEGORIES.find(c => c.id === activeCategory)

    // Select dynamic background pattern or image for the category grid background
    // To make it look premium, we'll use a soft dark background with subtle gold borders.
    return (
        <section className="min-h-screen bg-beige py-20 relative overflow-hidden">
            <div className="container-custom relative z-10">
                {/* Header Titles */}
                <div className="text-center mb-16">
                    <span className="text-maroon uppercase tracking-[0.3em] text-xs font-bold mb-2 block">Sri Mayyia Exclusives</span>
                    <h2 className="text-4xl md:text-6xl font-great-vibes text-charcoal">Our Signature Menu</h2>
                    <p className="text-muted max-w-2xl mx-auto mt-4 font-playfair">
                        A curated selection of our most loved culinary masterpieces across six major traditions.
                    </p>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16">
                    {MENU_CATEGORIES.map((cat) => {
                        const isActive = activeCategory === cat.id
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-5 py-2 md:px-8 md:py-3 rounded-full font-semibold text-sm md:text-base tracking-widest transition-all duration-300 font-playfair ${
                                    isActive
                                        ? 'bg-brandGold text-charcoal shadow-lg'
                                        : 'bg-offwhite border border-borderLight text-charcoal hover:border-brandGold'
                                }`}
                            >
                                {cat.name}
                            </button>
                        )
                    })}
                </div>

                {/* Content Grid Area */}
                <div className="min-h-[500px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, staggerChildren: 0.1 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12"
                        >
                            {currentCategoryData?.subCategories.map((sub, idx) => (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                                    key={idx} 
                                    className="bg-offwhite p-8 md:p-10 rounded-2xl border border-borderLight hover:border-brandGold shadow-md transition-all duration-300 group"
                                >
                                    {/* Sub-Category Header */}
                                    <div className="border-b border-borderLight pb-4 mb-6 relative">
                                        <h3 className="text-2xl md:text-3xl font-great-vibes text-maroon mb-1">{sub.name}</h3>
                                        <div className="absolute -bottom-[1px] left-0 w-16 h-[2px] bg-brandGold group-hover:w-full transition-all duration-700"></div>
                                    </div>

                                    {/* Item List (no prices) */}
                                    <ul className="space-y-4">
                                        {sub.items.map((item, itemIdx) => (
                                            <li key={itemIdx} className="flex items-start text-charcoal font-playfair group/item">
                                                <span className="text-brandGold mr-3 mt-1 text-xs">◆</span>
                                                <span className="text-lg md:text-xl group-hover/item:text-maroon transition-colors">{item.name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}

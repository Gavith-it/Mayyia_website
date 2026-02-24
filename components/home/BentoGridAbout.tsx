'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { IMAGE_ASSETS } from '@/lib/image-assets'
import { FiArrowUpRight } from 'react-icons/fi'

const BentoCard = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay }}
        className={`relative overflow-hidden rounded-3xl bg-dark-800 border border-white/5 hover:border-gold-400/30 transition-colors group ${className}`}
    >
        {children}
    </motion.div>
)

export default function BentoGridAbout() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-3 gap-4 h-[120vh] md:h-[800px] w-full">
            {/* 1. Main Feature Image (Large) */}
            <BentoCard className="md:col-span-4 md:row-span-2 relative min-h-[300px]" delay={0.1}>
                <Image
                    src={IMAGE_ASSETS.about.legacy || IMAGE_ASSETS.home.heroSliders[0]}
                    alt="Sri Mayyia Dining"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 66vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-playfair font-bold text-white mb-2">Heritage & Hospitality</h3>
                    <p className="text-white/80 text-sm">Serving authentic flavors with royal elegance since 1953.</p>
                </div>
            </BentoCard>

            {/* 2. Stats Card 1 (Years) */}
            <BentoCard className="md:col-span-2 md:row-span-1 bg-gradient-to-br from-gold-600 to-gold-400 flex flex-col items-center justify-center text-center p-6" delay={0.2}>
                <div className="text-5xl font-great-vibes text-dark-900 mb-0">70+</div>
                <div className="text-dark-900 font-bold uppercase tracking-widest text-sm">Years of Legacy</div>
            </BentoCard>

            {/* 3. Stats Card 2 (Guests) */}
            <BentoCard className="md:col-span-2 md:row-span-1 bg-dark-700 flex flex-col items-center justify-center text-center p-6" delay={0.3}>
                <div className="text-4xl font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-100 mb-1">50k+</div>
                <div className="text-gray-400 text-sm">Happy Guests</div>
                <div className="absolute top-4 right-4 text-gold-400 opacity-20">
                    <FiArrowUpRight size={24} />
                </div>
            </BentoCard>

            {/* 4. Decorative / Detail Image */}
            <BentoCard className="md:col-span-2 md:row-span-2 relative min-h-[200px]" delay={0.4}>
                <Image
                    src={IMAGE_ASSETS.home.heroSliders[2] || IMAGE_ASSETS.home.heroSliders[0]}
                    alt="Culinary Detail"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
            </BentoCard>

            {/* 5. Text / CTA Card */}
            <BentoCard className="md:col-span-2 md:row-span-1 bg-dark-800 p-8 flex flex-col justify-center" delay={0.5}>
                <h4 className="text-gold-400 font-playfair text-xl mb-3">Pure Vegetarian</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Crafted with sattvic principles, honoring tradition in every grain.
                </p>
            </BentoCard>

            {/* 6. Another Detail Image */}
            <BentoCard className="md:col-span-2 md:row-span-1 relative min-h-[200px]" delay={0.6}>
                <Image
                    src={IMAGE_ASSETS.home.heroSliders[1] || IMAGE_ASSETS.home.heroSliders[0]}
                    alt="Ambiance"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-playfair italic">View Gallery</span>
                </div>
            </BentoCard>
        </div>
    )
}

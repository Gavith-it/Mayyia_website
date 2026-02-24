'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import Image from 'next/image'
import { IMAGE_ASSETS } from '@/lib/image-assets'
import { FiPlus } from 'react-icons/fi'

// Mock Data (merged with existing categories)
const menuData = [
    {
        category: 'Starters',
        image: IMAGE_ASSETS.home.signature[0],
        description: 'Begin your culinary journey with our exquisitely crafted appetizers.',
        items: [
            { name: 'Truffle Arancini', price: '$24', desc: 'Risotto balls, black truffle, parmesan' },
            { name: 'Spicy Corn Galettes', price: '$18', desc: 'Corn, jalapeño, avocado salsa' },
            { name: 'Burrata & Heirloom', price: '$28', desc: 'Fresh burrata, tomatoes, basil oil' },
            { name: 'Paneer Tikka Zaffrani', price: '$22', desc: 'Saffron marinated cottage cheese, mint chutney' },
        ]
    },
    {
        category: 'Main Course',
        image: IMAGE_ASSETS.home.signature[1],
        description: 'Hearty, flavorful, and satisfying mains drawn from royal kitchens.',
        items: [
            { name: 'Royal Thali', price: '$45', desc: 'Assortment of 12 distinct dishes' },
            { name: 'Smoked Eggplant Curry', price: '$26', desc: 'Slow-roasted eggplant, spices, naan' },
            { name: 'Wild Mushroom Risotto', price: '$32', desc: 'Arborio rice, porcini dust, truffle oil' },
            { name: 'Hyderabadi Biryani', price: '$28', desc: 'Fragrant basmati rice, vegetables, saffron' },
        ]
    },
    {
        category: 'Desserts',
        image: IMAGE_ASSETS.home.signature[2],
        description: 'Sweet indulgences to complete your dining experience.',
        items: [
            { name: 'Saffron Rasmalai', price: '$18', desc: 'Soft cottage cheese dumplings, saffron milk' },
            { name: 'Dark Chocolate Fondant', price: '$22', desc: 'Molten center, vanilla bean ice cream' },
            { name: 'Mysore Pak Gold', price: '$16', desc: 'Traditional ghee sweet with edible gold' },
        ]
    },
    {
        category: 'Beverages',
        image: IMAGE_ASSETS.home.signature[3],
        description: 'Curated wines and signature mocktails.',
        items: [
            { name: 'Vintage Rose', price: '$14', desc: 'Sparkling rose with hibiscus' },
            { name: 'Mango Lassi', price: '$10', desc: 'Fresh mango, yogurt, cardamom' },
            { name: 'Masala Chai', price: '$8', desc: 'Spiced Indian tea' },
        ]
    }
]

const MenuItem = ({ item }: { item: any }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-start border-b border-gold-400/20 pb-4 mb-4 group"
        >
            <div>
                <h4 className="text-xl font-playfair text-white group-hover:text-gold-400 transition-colors">{item.name}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
            <div className="text-gold-400 font-bold">{item.price}</div>
        </motion.div>
    )
}

const MenuPage = ({ data, index }: { data: any, index: number }) => {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })

    // Parallax effect for image
    const y = useTransform(scrollYProgress, [0, 1], [-50, 50])

    return (
        <section ref={ref} className="min-h-screen w-full flex items-center justify-center sticky top-0 bg-dark-900 border-t border-gold-400/10 overflow-hidden">

            {/* 3D Content Container */}
            <div className="container-custom grid lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* Left: Image Card with Tilt */}
                <motion.div
                    initial={{ opacity: 0, rotateY: 30, x: -50 }}
                    whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative aspect-[3/4] lg:h-[70vh] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/5"
                >
                    <motion.div style={{ y }} className="absolute inset-0 h-[120%] w-full -top-[10%]">
                        <Image
                            src={data.image}
                            alt={data.category}
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Steam/Smoke Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-10 left-10">
                        <h2 className="text-5xl md:text-7xl font-great-vibes text-gold-400 mb-2">{data.category}</h2>
                        <p className="text-white/80 max-w-md font-playfair">{data.description}</p>
                    </div>
                </motion.div>

                {/* Right: Menu Items List */}
                <div className="bg-dark-800/50 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-gold-400/10">
                    <div className="space-y-6">
                        {data.items.map((item: any, i: number) => (
                            <MenuItem key={i} item={item} />
                        ))}
                    </div>
                    <div className="mt-8 pt-6 border-t border-gold-400/20 text-center">
                        <button className="text-gold-400 uppercase tracking-widest text-xs font-bold hover:text-white transition-colors flex items-center justify-center gap-2">
                            <FiPlus /> View All {data.category}
                        </button>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default function MenuBook() {
    return (
        <div className="relative bg-dark-900">
            {menuData.map((category, i) => (
                <MenuPage key={i} data={category} index={i} />
            ))}
        </div>
    )
}

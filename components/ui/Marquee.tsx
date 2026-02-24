'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface MarqueeProps {
    children: ReactNode
    direction?: 'left' | 'right'
    speed?: number
    className?: string
}

export default function Marquee({
    children,
    direction = 'left',
    speed = 20,
    className = ''
}: MarqueeProps) {
    return (
        <div className={`overflow-hidden flex w-full ${className}`}>
            <motion.div
                initial={{ x: direction === 'left' ? 0 : '-50%' }}
                animate={{ x: direction === 'left' ? '-50%' : 0 }}
                transition={{
                    duration: speed,
                    ease: 'linear',
                    repeat: Infinity,
                }}
                className="flex flex-shrink-0 gap-8 items-stretch py-4"
            >
                {children}
                {children}
            </motion.div>
        </div>
    )
}

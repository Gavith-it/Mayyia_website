'use client'

import { motion, useInView, Variants } from 'framer-motion'
import { useRef } from 'react'

interface KineticTextProps {
    text: string
    className?: string
    typ?: 'word' | 'char'
    delay?: number
    duration?: number
    stagger?: number
}

export default function KineticText({
    text,
    className = '',
    typ = 'word',
    delay = 0,
    duration = 0.5,
    stagger = 0.05,
}: KineticTextProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-10%' })

    const wordVariants: Variants = {
        hidden: { y: '100%', opacity: 0 },
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: delay + i * stagger,
                duration: duration,
                ease: [0.33, 1, 0.68, 1], // easeOutCubic
            },
        }),
    }

    const charVariants: Variants = {
        hidden: { opacity: 0, scale: 0.5, filter: 'blur(10px)' },
        visible: (i: number) => ({
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            transition: {
                delay: delay + i * stagger,
                duration: duration,
                ease: 'easeOut',
            },
        }),
    }

    if (typ === 'word') {
        const words = text.split(' ')
        return (
            <span ref={ref} className={`inline-flex flex-wrap overflow-hidden ${className}`}>
                {words.map((word, i) => (
                    <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0 align-bottom">
                        <motion.span
                            custom={i}
                            variants={wordVariants}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                            className="inline-block"
                        >
                            {word}
                        </motion.span>
                    </span>
                ))}
            </span>
        )
    }

    const chars = text.split('')
    return (
        <span ref={ref} className={className}>
            {chars.map((char, i) => (
                <motion.span
                    key={i}
                    custom={i}
                    variants={charVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="inline-block"
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </span>
    )
}

'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false)
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    const springConfig = { damping: 25, stiffness: 700 }
    const cursorXSpring = useSpring(cursorX, springConfig)
    const cursorYSpring = useSpring(cursorY, springConfig)

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
        }

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            // Check if target is a link, button, or has 'data-hover' attribute
            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.hasAttribute('data-hover')

            setIsHovering(!!isClickable)
        }

        window.addEventListener('mousemove', moveCursor)
        window.addEventListener('mouseover', handleMouseOver)

        return () => {
            window.removeEventListener('mousemove', moveCursor)
            window.removeEventListener('mouseover', handleMouseOver)
        }
    }, [cursorX, cursorY])

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] hidden md:block mix-blend-difference"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
            }}
        >
            <motion.div
                className={`absolute top-0 left-0 rounded-full border border-gold-400 bg-gold-400/20 backdrop-blur-sm transition-all duration-300 ${isHovering ? 'w-16 h-16 -top-4 -left-4 border-2' : 'w-4 h-4 -top-0 -left-0 border-2'
                    }`}
                layoutId="cursor-ring"
            />
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-gold-400 rounded-full -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
    )
}

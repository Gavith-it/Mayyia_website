'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import { IMAGE_ASSETS } from '@/lib/image-assets'

const SCROLL_TOP_THRESHOLD = 80

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(true)
  const [logoError, setLogoError] = useState(false)
  const pathname = usePathname()
  const lastScrolled = useRef(false)
  const lastVisible = useRef(true)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY
          const scrolled = y > 50
          const visible = y <= SCROLL_TOP_THRESHOLD
          if (lastScrolled.current !== scrolled) {
            lastScrolled.current = scrolled
            setIsScrolled(scrolled)
          }
          if (lastVisible.current !== visible) {
            lastVisible.current = visible
            setHeaderVisible(visible)
          }
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/menu', label: 'Menu' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/chefs', label: 'Chefs' },
    { href: '/booking', label: 'Reservations' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: headerVisible ? 0 : '-100%' }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-beige/95 backdrop-blur-md py-4 shadow-sm border-b border-borderLight'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container-custom overflow-visible">
          <div className="flex items-center justify-between overflow-visible">
            {/* Logo: left, link to Home — extra py so script text (Sri Mayyia) isn't cut top/bottom */}
            <Link
              href="/"
              className="flex items-center gap-0 group py-2 pl-5 pr-4 sm:py-2.5 sm:pl-6 sm:pr-5 md:py-3 md:pl-6 md:pr-6 min-h-[56px] overflow-visible"
              aria-label="Sri Mayyia Caterers – Home"
            >
              {!logoError ? (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className="relative flex-shrink-0 overflow-visible h-[32px] sm:h-9 md:h-20 w-auto min-w-[72px] sm:min-w-[88px] md:min-w-[160px] max-w-[140px] md:max-w-[220px] -mr-2 md:-mr-3"
                >
                  <Image
                    src={IMAGE_ASSETS.logo.src}
                    alt="Sri Mayyia Caterers"
                    width={240}
                    height={80}
                    className="h-full w-auto max-w-full object-contain object-left"
                    quality={92}
                    onError={() => setLogoError(true)}
                    priority
                  />
                </motion.div>
              ) : null}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400 }}
                className={`text-5xl font-great-vibes font-normal leading-none overflow-visible pt-1 pb-1 sm:pt-1.5 sm:pb-1.5 -ml-2 md:-ml-3 ${isScrolled ? 'text-[#FF0000]' : 'text-[#FF0000]'}`}
              >
                Sri Mayyia
              </motion.div>
              <span className={`text-sm font-playfair tracking-wider hidden sm:block font-semibold leading-tight overflow-visible ml-1 sm:ml-1.5 ${isScrolled ? 'text-brandGold' : 'text-gold-400'}`}>
                CATERERS
              </span>
            </Link>

            {/* Menu Button - Shows on all screens */}
            <motion.button
              onClick={() => setIsMenuOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 transition-colors relative z-[60] ${isScrolled ? 'text-charcoal hover:text-brandGold' : 'text-white hover:text-gold-400'}`}
              aria-label="Open menu"
            >
              <FiMenu className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Sidebar Navigation - Appears from Right */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[100] bg-black/60"
            />

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: 'spring', 
                damping: 30, 
                stiffness: 300,
                mass: 0.8
              }}
              className="fixed top-0 right-0 bottom-0 z-[101] w-80 bg-beige overflow-y-auto"
            >
              {/* Vertical Yellow Bar on Right Edge */}
              <div className="absolute top-0 right-0 bottom-0 w-1 bg-gold-400" />

              <div className="flex flex-col h-full">
                {/* Header with Close Button */}
                <div className="flex items-center justify-between p-6 border-b border-gold-400/10">
                  <div className="text-2xl font-great-vibes font-normal text-[#FF0000]">
                    Sri Mayyia <span className="font-playfair text-lg text-charcoal">Caterers</span>
                  </div>
                  <motion.button
                    onClick={() => setIsMenuOpen(false)}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-charcoal text-white flex items-center justify-center hover:bg-maroon transition-all duration-300"
                    aria-label="Close menu"
                  >
                    <FiX className="w-5 h-5 font-bold" />
                  </motion.button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 p-6 space-y-0">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: index * 0.06 + 0.15,
                        type: 'spring',
                        damping: 25,
                        stiffness: 200
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block py-3 px-4 text-lg font-playfair transition-all duration-300 ${
                          pathname === link.href
                            ? 'text-maroon bg-gold-400/20 border-l-4 border-maroon'
                            : 'text-charcoal hover:text-maroon hover:bg-gold-400/10'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* CTA Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.06 + 0.3 }}
                  className="p-6 border-t border-gold-400/10 space-y-4"
                >
                  <motion.div 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href="/booking"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full bg-maroon text-white text-center font-playfair font-semibold py-3 px-6 rounded-lg hover:bg-maroonHover transition-colors duration-300"
                    >
                      Reserve Table
                    </Link>
                  </motion.div>
                  
                  {/* Contact Info */}
                  <div className="space-y-2 pt-2">
                    <p className="text-muted text-xs font-playfair uppercase tracking-wider">Contact Us</p>
                    <a 
                      href="tel:+1234567890" 
                      className="text-charcoal hover:text-maroon transition-colors block font-montserrat text-sm"
                    >
                      +1 (234) 567-890
                    </a>
                    <a 
                      href="mailto:info@srimayyia.com" 
                      className="text-charcoal hover:text-maroon transition-colors block text-xs font-montserrat"
                    >
                      info@srimayyia.com
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

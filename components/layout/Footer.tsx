'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiMapPin, FiPhone, FiMail, FiFacebook, FiInstagram, FiYoutube } from 'react-icons/fi'
import { IMAGE_ASSETS } from '@/lib/image-assets'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    quick: [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About Us' },
      { href: '/menu', label: 'Our Menu' },
      { href: '/gallery', label: 'Gallery' },
    ],
    services: [
      { label: 'Signature South Indian Catering' },
      { label: 'Luxury Event Catering' },
      { label: 'Thematic & Ritual-Based Menus' },
      { label: 'Large-Scale Events' },
    ],
  }

  const socialLinks = [
    { icon: FiFacebook, href: 'https://www.facebook.com/share/1AkAkbrYfa/?mibextid=wwXIfr', label: 'Facebook' },
    { icon: FiInstagram, href: 'https://www.instagram.com/srimayyia_caterers?igsh=amRxaHl3aDFtYzR0&utm_source=qr', label: 'Instagram' },
    { icon: FiYoutube, href: 'https://youtube.com/@srimayyiacaterers?si=hyny-D_G0M-NVHr0', label: 'YouTube' },
  ]

  return (
    <footer className="relative bg-charcoal text-offwhite overflow-hidden">
      {/* Subtle gold accent */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl" style={{ background: '#C7A24B' }}></div>
      </div>

      <div className="container-custom py-10 md:py-12 lg:py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-10">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="inline-flex flex-wrap items-center gap-3 mb-4" aria-label="Sri Mayyia Caterers – Home">
              <span className="relative block h-14 w-28 sm:h-16 sm:w-32 md:h-20 md:w-40 flex-shrink-0">
                <Image
                  src={IMAGE_ASSETS.logo.src}
                  alt=""
                  width={160}
                  height={80}
                  className="h-full w-auto object-contain object-left"
                  quality={92}
                />
              </span>
              <span className="text-2xl font-great-vibes font-normal gradient-text">
                Sri Mayyia <span className="font-playfair text-xl">Caterers</span>
              </span>
            </Link>
            <h3 className="sr-only">Sri Mayyia Caterers</h3>
            <p className="text-offwhite/90 mb-4 leading-relaxed text-sm">
              Serving Culture. Preserving Legacy. Perfecting Hospitality.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-borderLight/30 text-brandGold hover:bg-brandGold/10 hover:border-brandGold/50 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-playfair font-semibold mb-4 text-brandGold">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.quick.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-offwhite/90 hover:text-brandGold transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-brandGold mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-playfair font-semibold mb-4 text-brandGold">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((service, index) => (
                <li key={index}>
                  <span className="text-offwhite/90 flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-brandGold mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {service.label}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-playfair font-semibold mb-4 text-brandGold">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <FiMapPin className="w-4 h-4 text-brandGold mt-1 flex-shrink-0" />
                <div className="text-offwhite/90 text-sm flex flex-col space-y-2">
                  <p>
                    <strong className="text-brandGold block mb-1">Marketing Office:</strong>
                    #32 Market Road, Basavanagudi, Gandhi Bazaar, Bengaluru 560004, Karnataka, India
                  </p>
                  <p>
                    <strong className="text-brandGold block mb-1">Corporate Office:</strong>
                    #39/2 C-2 Govardhanagiri, Kalyani Gardens, BSK 1st Stage, Bengaluru -560004, Karnataka, India
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <FiPhone className="w-4 h-4 text-brandGold flex-shrink-0 mt-1" />
                <div className="flex flex-col text-offwhite/90">
                  <a href="tel:+919845038235" className="hover:text-brandGold transition-colors">
                    +91 98450 38235
                  </a>
                  <a href="tel:+919901341111" className="hover:text-brandGold transition-colors">
                    +91 99013 41111
                  </a>
                </div>
              </li>
              <li className="flex items-center space-x-2">
                <FiMail className="w-4 h-4 text-brandGold flex-shrink-0" />
                <a href="mailto:Customercare@srimayyiacaterers.com" className="text-offwhite/90 hover:text-brandGold transition-colors text-sm break-all">
                  Customercare@srimayyiacaterers.com
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-borderLight/20 pt-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-offwhite/80 text-sm mb-4 md:mb-0">
              © {currentYear} Sri Mayyia Caterers. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-offwhite/80 hover:text-brandGold transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-offwhite/80 hover:text-brandGold transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi'

const chefs = [
  {
    name: 'Chef Marcus Thompson',
    role: 'Executive Chef',
    image: '/images/jarren-rocks-nVFp3nTWAbA-unsplash.jpg',
    bio: 'Award-winning chef with 20+ years of experience in fine dining.',
  },
  {
    name: 'Chef Elena Martinez',
    role: 'Pastry Chef',
    image: '/images/alexandra-bellanger-dHeKcZ0a-xY-unsplash.jpg',
    bio: 'Master of French patisserie and modern dessert artistry.',
  },
  {
    name: 'Chef James Wilson',
    role: 'Sous Chef',
    image: '/images/darko-trajkovic-Kh6iEyCS-Mg-unsplash.jpg',
    bio: 'Specialist in Asian fusion and molecular gastronomy.',
  },
  {
    name: 'Chef Sophia Chen',
    role: 'Head of Innovation',
    image: '/images/anil-sharma-_uWcGe93l6w-unsplash.jpg',
    bio: 'Pioneering new culinary techniques and flavor combinations.',
  },
]

export default function TeamSection() {
  return (
    <section className="section-padding bg-beige">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-title mb-16"
        >
          <div className="section-subtitle">Our Team</div>
          <h2 className="section-heading-light">
            Meet Our <span className="gradient-text">Master Chefs</span>
          </h2>
          <p className="section-description-light">
            The culinary artists who bring passion and expertise to every dish.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {chefs.map((chef, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="premium-card text-center h-full">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                  <Image
                    src={chef.image}
                    alt={chef.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    quality={92}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-2xl font-playfair text-charcoal mb-2">{chef.name}</h3>
                <div className="text-gold-400 font-semibold mb-4">{chef.role}</div>
                <p className="text-muted mb-6 text-sm leading-relaxed">{chef.bio}</p>
                <div className="flex justify-center space-x-4">
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 flex items-center justify-center rounded-full glass border border-gold-400/20 text-gold-400 hover:bg-gold-400/10 hover:border-gold-400/40 transition-all duration-300"
                  >
                    <FiFacebook className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 flex items-center justify-center rounded-full glass border border-gold-400/20 text-gold-400 hover:bg-gold-400/10 hover:border-gold-400/40 transition-all duration-300"
                  >
                    <FiTwitter className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 flex items-center justify-center rounded-full glass border border-gold-400/20 text-gold-400 hover:bg-gold-400/10 hover:border-gold-400/40 transition-all duration-300"
                  >
                    <FiInstagram className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

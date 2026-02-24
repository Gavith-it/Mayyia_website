'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMapPin, FiPhone, FiMail, FiSend, FiClock } from 'react-icons/fi'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you for your message! We will get back to you soon.')
  }

  const glassInputClass = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-gold-400 text-white placeholder-white/30 backdrop-blur-sm transition-all"
  const glassCardClass = "bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:border-gold-400/30 transition-colors"

  return (
    <section className="relative section-padding bg-dark-900 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gold-400/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-gold-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={glassCardClass}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center mb-4 text-dark-900 shadow-lg">
                <FiMapPin className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-playfair font-semibold text-white mb-2">
                Office
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Bengaluru, Karnataka<br />
                <span className="text-sm opacity-80">Serving Pan-South India</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={glassCardClass}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center mb-4 text-dark-900 shadow-lg">
                <FiPhone className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-playfair font-semibold text-white mb-2">
                Phone
              </h3>
              <p className="text-gray-400">
                +91 80 1234 5678
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={glassCardClass}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center mb-4 text-dark-900 shadow-lg">
                <FiMail className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-playfair font-semibold text-white mb-2">
                Email
              </h3>
              <p className="text-gray-400">
                info@srimayyia.com
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={glassCardClass}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center mb-4 text-dark-900 shadow-lg">
                <FiClock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-playfair font-semibold text-white mb-2">
                Consultation
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Expert guidance for your menu curation & event planning.
              </p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`${glassCardClass} h-full`}
            >
              <h2 className="text-3xl font-playfair font-bold text-white mb-2">
                Send a <span className="text-gold-400">Message</span>
              </h2>
              <p className="text-gray-400 mb-8">We'd love to hear about your upcoming event.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gold-400 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={glassInputClass}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gold-400 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={glassInputClass}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gold-400 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={glassInputClass}
                      placeholder="+91 80 1234 5678"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gold-400 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={glassInputClass}
                      placeholder="Subject"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gold-400 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className={glassInputClass}
                    placeholder="Tell us about your event..."
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-gradient-to-r from-gold-400 to-gold-600 text-dark-900 font-bold rounded-lg shadow-lg hover:shadow-gold-400/20 transition-all flex items-center gap-2"
                >
                  <FiSend className="w-5 h-5" />
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

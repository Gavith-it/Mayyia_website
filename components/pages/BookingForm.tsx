'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiClock, FiCalendar, FiUsers, FiMail, FiPhone } from 'react-icons/fi'

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '100',
    eventType: 'catering',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you for your booking request! We will contact you soon.')
  }

  return (
    <section className="section-padding bg-beige">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="premium-card"
        >
          <div className="text-center mb-12">
            <div className="section-subtitle mb-4">Reservations</div>
            <h2 className="section-heading-light">
              Book <span className="gradient-text">Catering</span>
            </h2>
            <p className="section-description-light">
              Fill out the form below and we'll get back to you to confirm your booking.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Type */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-4">
                Reservation Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormData({ ...formData, eventType: 'catering' })}
                  className={`py-4 px-6 rounded-lg border-2 transition-all duration-300 ${
                    formData.eventType === 'catering'
                      ? 'border-brandGold bg-brandGold/10 text-maroon'
                      : 'border-borderLight text-charcoal hover:border-brandGold bg-offwhite'
                  }`}
                >
                  Book Catering
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormData({ ...formData, eventType: 'event' })}
                  className={`py-4 px-6 rounded-lg border-2 transition-all duration-300 ${
                    formData.eventType === 'event'
                      ? 'border-brandGold bg-brandGold/10 text-maroon'
                      : 'border-borderLight text-charcoal hover:border-brandGold bg-offwhite'
                  }`}
                >
                  Private Event
                </motion.button>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-offwhite border border-borderLight rounded-lg focus:ring-2 focus:ring-brandGold focus:border-brandGold text-charcoal placeholder-muted"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Email *
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brandGold" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-offwhite border border-borderLight rounded-lg focus:ring-2 focus:ring-brandGold focus:border-brandGold text-charcoal placeholder-muted"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Phone *
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brandGold" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-offwhite border border-borderLight rounded-lg focus:ring-2 focus:ring-brandGold focus:border-brandGold text-charcoal placeholder-muted"
                    placeholder="+91 80 1234 5678"
                  />
                </div>
              </div>
            </div>

            {/* Date, Time, Guests */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Date *
                </label>
                <div className="relative">
                  <FiCalendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brandGold" />
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-offwhite border border-borderLight rounded-lg focus:ring-2 focus:ring-brandGold focus:border-brandGold text-charcoal bg-offwhite"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Time *
                </label>
                <div className="relative">
                  <FiClock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brandGold" />
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-offwhite border border-borderLight rounded-lg focus:ring-2 focus:ring-brandGold focus:border-brandGold text-charcoal bg-offwhite"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Guests *
                </label>
                <div className="relative">
                  <FiUsers className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brandGold" />
                  <select
                    required
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-offwhite border border-borderLight rounded-lg focus:ring-2 focus:ring-brandGold focus:border-brandGold text-charcoal bg-offwhite"
                  >
                    <option value="100">100 People</option>
                    <option value="200">200 People</option>
                    <option value="500">500 People</option>
                    <option value="1000">1000 People</option>
                    <option value="3000">3000 People</option>
                    <option value="5000">5000 People</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Special Requests
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-offwhite border border-borderLight rounded-lg focus:ring-2 focus:ring-brandGold focus:border-brandGold text-charcoal placeholder-muted"
                placeholder="Any special dietary requirements or requests..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary w-full text-lg"
            >
              Submit Reservation
            </motion.button>

            <p className="text-sm text-muted text-center">
              We'll contact you within 24 hours to confirm your reservation.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function LoginGate() {
  const [isVisible, setIsVisible] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    otp: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    if (step === 1) {
      // Simulate API call to send OTP
      setTimeout(() => {
        setIsSubmitting(false)
        setStep(2)
      }, 1000)
    } else {
      // Simulate OTP verification and login
      setTimeout(() => {
        setIsVisible(false)
      }, 1500)
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[999999] bg-[#f4efe6] flex items-center justify-center overflow-hidden"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-gold-400/10 blur-[100px]" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full bg-emerald-900/5 blur-[120px]" />
          </div>

          <div className="container mx-auto px-4 w-full h-full flex flex-col items-center justify-center relative z-10">
            {/* Logo Text */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute top-12 left-0 w-full text-center"
            >
              <h1 className="text-4xl md:text-5xl font-great-vibes font-normal gradient-text">
                Sri Mayyia Caterers
              </h1>
              <p className="text-sm font-montserrat tracking-[0.2em] text-neutral-500 mt-2 uppercase">
                Premium Fine Dining
              </p>
            </motion.div>

            {/* Main Content Area: Avatar + Form */}
            <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-12 mt-16">
              
              {/* 3D Avatar Area */}
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-full md:w-1/2 flex justify-center relative"
              >
                {/* Float animation on the avatar */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-[280px] h-[380px] md:w-[350px] md:h-[480px]"
                >
                  <Image 
                    src="/images/login-avatar.png"
                    alt="Sri Mayyia Virtual Assistant"
                    fill
                    className="object-contain mix-blend-multiply"
                    priority
                  />
                </motion.div>
              </motion.div>

              {/* Glassmorphic Form Area */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="w-full md:w-1/2 max-w-md"
              >
                <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-8 md:p-10 rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-playfair font-semibold text-neutral-800 mb-2">
                      {step === 1 ? 'Welcome' : 'Verify OTP'}
                    </h2>
                    <p className="text-sm text-neutral-500 font-montserrat">
                      {step === 1 ? 'Please enter your details to continue' : `We've sent a code to ${formData.phone}`}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <AnimatePresence mode="wait">
                      {step === 1 ? (
                        <motion.div 
                          key="step1"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="space-y-6"
                        >
                          <div className="space-y-2">
                            <label className="text-xs font-montserrat font-medium text-neutral-500 uppercase tracking-wider ml-1">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              className="w-full bg-white/60 border border-white/80 rounded-xl px-5 py-4 text-neutral-800 font-montserrat focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:bg-white transition-all duration-300"
                              placeholder="Enter your name"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-xs font-montserrat font-medium text-neutral-500 uppercase tracking-wider ml-1">
                              Phone Number *
                            </label>
                            <input
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              className="w-full bg-white/60 border border-white/80 rounded-xl px-5 py-4 text-neutral-800 font-montserrat focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:bg-white transition-all duration-300"
                              placeholder="e.g. 98765 43210"
                            />
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="step2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="space-y-6"
                        >
                          <div className="space-y-2">
                            <label className="text-xs font-montserrat font-medium text-neutral-500 uppercase tracking-wider ml-1">
                              Enter 4-Digit OTP *
                            </label>
                            <input
                              type="text"
                              required
                              maxLength={4}
                              value={formData.otp}
                              onChange={(e) => setFormData({...formData, otp: e.target.value.replace(/\D/g, '')})}
                              className="w-full bg-white/60 border border-white/80 rounded-xl px-5 py-4 text-neutral-800 font-montserrat text-center text-2xl tracking-[1em] focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:bg-white transition-all duration-300"
                              placeholder="••••"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-emerald-900 text-gold-400 font-montserrat font-semibold uppercase tracking-wider py-4 rounded-xl mt-4 hover:bg-emerald-800 transition-colors duration-300 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-gold-400/30 border-t-gold-400 rounded-full animate-spin mr-3" />
                            {step === 1 ? 'Sending...' : 'Verifying...'}
                          </>
                        ) : (
                          step === 1 ? 'Get OTP' : 'Submit & Enter'
                        )}
                      </span>
                      {/* Shine effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
                    </button>
                  </form>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

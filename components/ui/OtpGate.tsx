'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPhone, FiUser, FiLock, FiCheckCircle, FiAlertCircle, FiTrendingUp } from 'react-icons/fi'

export default function OtpGate({ children }: { children: React.ReactNode }) {
  const [isVerified, setIsVerified] = useState<boolean | null>(null)
  const [step, setStep] = useState<'details' | 'otp'>('details')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [countdown, setCountdown] = useState(0)

  // 1. Check if user is already verified on mount
  useEffect(() => {
    const checkVerification = () => {
      // Check both cookie and localStorage for backup robustness
      const cookieVerified = document.cookie.includes('sri_mayyia_verified=true')
      const localVerified = localStorage.getItem('sri_mayyia_verified') === 'true'
      
      if (cookieVerified || localVerified) {
        setIsVerified(true)
      } else {
        setIsVerified(false)
      }
    }
    checkVerification()
  }, [])

  // 2. Resend Countdown Timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  // 3. Step 1: Submit Details & Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) {
      setError('Please enter both your name and WhatsApp number.')
      return
    }

    setLoading(true)
    setError('')
    setSuccessMsg('')

    try {
      const response = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone }),
      })

      const resData = await response.json()

      if (response.ok && resData.success) {
        setStep('otp')
        setSuccessMsg('Verification code sent successfully to your WhatsApp!')
        setCountdown(60) // 1-minute countdown before resend
      } else {
        setError(resData.error || 'Failed to send OTP. Please check your number and try again.')
      }
    } catch (err) {
      console.error('OTP request error:', err)
      setError('A network error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // 4. Step 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length < 6) {
      setError('Please enter the complete 6-digit verification code.')
      return
    }

    setLoading(true)
    setError('')
    setSuccessMsg('')

    try {
      const response = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, otp }),
      })

      const resData = await response.json()

      if (response.ok && resData.success) {
        setSuccessMsg('Access Granted! Welcome to Sri Mayyia Caterers.')
        localStorage.setItem('sri_mayyia_verified', 'true')
        
        // Let user see success message for a brief moment before fading out
        setTimeout(() => {
          setIsVerified(true)
        }, 1200)
      } else {
        setError(resData.error || 'Incorrect OTP code. Please try again.')
      }
    } catch (err) {
      console.error('OTP verification error:', err)
      setError('A network error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Loading state overlay during verification check
  if (isVerified === null) {
    return (
      <div className="fixed inset-0 z-50 bg-[#160406] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#b8860b]/30 border-t-[#b8860b] rounded-full animate-spin mb-4" />
        <p className="text-[#b8860b] font-medium tracking-wide">Securing Fine Dining Experience...</p>
      </div>
    )
  }

  // If already verified, render the website normally
  if (isVerified) {
    return <>{children}</>
  }

  // Render Premium Glassmorphic OTP Login Gate
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#160406] flex items-center justify-center p-4">
      {/* Dynamic Animated background ambient lights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[#58111A]/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -60, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#b8860b]/10 rounded-full blur-[150px]"
        />
      </div>

      {/* Main Glass Box Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-lg bg-[#ffffff]/05 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_20px_50px_rgba(90,17,26,0.5)] overflow-hidden"
      >
        {/* Aesthetic Golden Frame Corner Accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#b8860b]/40 rounded-tl-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#b8860b]/40 rounded-tr-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#b8860b]/40 rounded-bl-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#b8860b]/40 rounded-br-3xl pointer-events-none" />

        {/* Brand/Header Logo Text */}
        <div className="text-center mb-8">
          <span className="font-great-vibes text-4xl text-[#b8860b] block mb-2">Sri Mayyia Caterers</span>
          <h2 className="text-xl font-semibold tracking-wider text-white/90 uppercase">
            Exclusive Access Portal
          </h2>
          <p className="text-sm text-white/60 mt-2 font-light">
            Please verify your access to view our fine catering options.
          </p>
        </div>

        {/* Error / Success Alerts */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3 bg-red-950/40 border border-red-500/30 text-red-300 p-4 rounded-xl mb-6 text-sm"
            >
              <FiAlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
              <span>{error}</span>
            </motion.div>
          )}

          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3 bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 p-4 rounded-xl mb-6 text-sm"
            >
              <FiCheckCircle className="w-5 h-5 flex-shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Container */}
        <AnimatePresence mode="wait">
          {step === 'details' ? (
            // STEP 1: Details Request Form
            <motion.form
              key="details-form"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSendOtp}
              className="space-y-6"
            >
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#b8860b] mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b8860b]/50 focus:border-[#b8860b]/50 text-white placeholder-white/30 transition-all font-light"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#b8860b] mb-2">
                  WhatsApp Number
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b8860b]/50 focus:border-[#b8860b]/50 text-white placeholder-white/30 transition-all font-light"
                    placeholder="e.g. +91 99000 00000"
                  />
                </div>
                <p className="text-[10px] text-white/40 mt-1.5 flex items-center gap-1.5 px-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b] animate-ping" />
                  We will send a 6-digit OTP code directly to this number on WhatsApp.
                </p>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-4 bg-gradient-to-r from-[#b8860b] to-[#a3760a] text-white font-semibold rounded-xl tracking-wider uppercase shadow-lg shadow-[#b8860b]/10 hover:shadow-[#b8860b]/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Request Access Code'
                )}
              </motion.button>
            </motion.form>
          ) : (
            // STEP 2: OTP Verification Form
            <motion.form
              key="otp-form"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleVerifyOtp}
              className="space-y-6"
            >
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#b8860b]">
                    Enter Access Code
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setStep('details')
                      setError('')
                      setSuccessMsg('')
                    }}
                    className="text-xs text-white/50 hover:text-white transition-all underline decoration-dotted"
                  >
                    Change Number
                  </button>
                </div>
                
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b8860b]/50 focus:border-[#b8860b]/50 text-white placeholder-white/30 transition-all font-mono text-lg tracking-[0.4em] text-center"
                    placeholder="------"
                  />
                </div>
                <p className="text-[10px] text-white/40 mt-1.5 text-center">
                  Sent to {phone}. Please check your WhatsApp.
                </p>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-4 bg-gradient-to-r from-[#b8860b] to-[#a3760a] text-white font-semibold rounded-xl tracking-wider uppercase shadow-lg shadow-[#b8860b]/10 hover:shadow-[#b8860b]/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Verify & Access Site'
                )}
              </motion.button>

              {/* Resend Code Action */}
              <div className="text-center pt-2">
                {countdown > 0 ? (
                  <p className="text-xs text-white/40">
                    Resend code available in <span className="text-white/80 font-medium font-mono">{countdown}s</span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="text-xs text-[#b8860b] hover:text-[#d49e13] font-medium transition-all underline decoration-solid"
                  >
                    Resend Code on WhatsApp
                  </button>
                )}
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Footer info lock */}
        <div className="mt-8 text-center text-[10px] text-white/30 border-t border-white/5 pt-4">
          🔒 Secure 256-Bit SSL Encryption. Your details are safe with us.
        </div>
      </motion.div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PaymentModal from '../ui/PaymentModal'

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbydH2W_hKsvqLHNaPEHN0YVpzYChnQYd8vfwF0vnsXzQr2P5hzcYcZGm4eZXjgWbPs/exec'

const SERVICES = [
  'MSME Export Advisory',
  'Educational Governance',
  'Governance & Independent Director',
  'Numerology',
]

const INITIAL_FORM = {
  fullName: '',
  phone: '',
  email: '',
  service: '',
  message: '',
}

const Booking = () => {
  const [form, setForm] = useState(() => {
    try {
      const saved = localStorage.getItem('bookingForm')
      return saved ? JSON.parse(saved) : INITIAL_FORM
    } catch {
      return INITIAL_FORM
    }
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // Persist form to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem('bookingForm', JSON.stringify(form))
    } catch {}
  }, [form])

  // Animation variants — matching rest of the site
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  }

  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
    },
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // Only allow numeric input for phone field
  const handlePhoneKeyDown = (e) => {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab']
    if (!allowedKeys.includes(e.key) && !/^\d$/.test(e.key)) {
      e.preventDefault()
    }
  }

  const validate = () => {
    if (!form.fullName.trim()) return 'Please enter your full name.'
    if (!form.phone.trim()) return 'Please enter your phone number.'
    if (!/^[6-9]\d{9}$/.test(form.phone.trim()))
      return 'Please enter a valid 10-digit Indian mobile number (starting with 6–9).'
    if (!form.email.trim()) return 'Please enter your email address.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      return 'Please enter a valid email address.'
    if (!form.service) return 'Please select a service.'
    return ''
  }

  const resetForm = () => {
    setForm(INITIAL_FORM)
    setSubmitted(false)
    setError('')
    try {
      localStorage.removeItem('bookingForm')
    } catch {}
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setSubmitting(true)

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName,
          phone: form.phone,
          email: form.email.trim(),
          service: form.service,
          message: form.message,
        }),
      })

      // no-cors gives opaque response — treat any non-throw as success
      setSubmitted(true)
      setShowModal(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleModalClose = () => {
    setShowModal(false)
    resetForm()
  }

  return (
    <section
      id="booking"
      className="bg-primary-navy py-[60px] md:py-[100px] font-poppins overflow-hidden"
      aria-label="Book a Consultation"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6">

        {/* Section Heading */}
        <div className="mb-[60px] text-center">
          <span className="text-accent-gold uppercase text-[0.875rem] font-semibold tracking-[2px] mb-3 block">
            Schedule a Session
          </span>
          <h2 className="text-[2.25rem] font-bold text-bg-white font-montserrat relative pb-4 inline-block title-underline">
            Book a Consultation
          </h2>
          <p className="text-text-secondary text-[1rem] leading-[1.6] mt-6 max-w-[560px] mx-auto">
            Fill in the details below to book a one-on-one consultation with Dhananjay Singh.
            Payment is processed securely via UPI after form submission.
          </p>
        </div>

        {/* Form Card */}
        <motion.div
          className="max-w-[720px] mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div
            className="bg-primary-navy-dark border border-accent-gold/15 rounded-2xl p-6 sm:p-10 shadow-premium"
            variants={revealVariants}
          >
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="booking-fullName"
                  className="text-text-secondary text-[0.875rem] font-medium"
                >
                  Full Name <span className="text-accent-gold">*</span>
                </label>
                <input
                  type="text"
                  id="booking-fullName"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Ramesh Kumar"
                  required
                  disabled={submitting || submitted}
                  className="w-full bg-primary-navy-dark border border-accent-gold/20 focus:border-accent-gold rounded-xl px-4 py-3.5 text-text-primary text-[0.95rem] focus:outline-none transition-all duration-200 placeholder:text-text-secondary/40 disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="booking-phone"
                  className="text-text-secondary text-[0.875rem] font-medium"
                >
                  Phone Number <span className="text-accent-gold">*</span>
                </label>
                <input
                  type="tel"
                  id="booking-phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  onKeyDown={handlePhoneKeyDown}
                  placeholder="10-digit Indian mobile number"
                  maxLength={10}
                  required
                  disabled={submitting || submitted}
                  className="w-full bg-primary-navy-dark border border-accent-gold/20 focus:border-accent-gold rounded-xl px-4 py-3.5 text-text-primary text-[0.95rem] focus:outline-none transition-all duration-200 placeholder:text-text-secondary/40 disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="booking-email"
                  className="text-text-secondary text-[0.875rem] font-medium"
                >
                  Email Address <span className="text-accent-gold">*</span>
                </label>
                <input
                  type="email"
                  id="booking-email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="e.g. ramesh@example.com"
                  required
                  disabled={submitting || submitted}
                  className="w-full bg-primary-navy-dark border border-accent-gold/20 focus:border-accent-gold rounded-xl px-4 py-3.5 text-text-primary text-[0.95rem] focus:outline-none transition-all duration-200 placeholder:text-text-secondary/40 disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              {/* Select Service */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="booking-service"
                  className="text-text-secondary text-[0.875rem] font-medium"
                >
                  Select Service <span className="text-accent-gold">*</span>
                </label>
                <select
                  id="booking-service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                  disabled={submitting || submitted}
                  className="w-full bg-primary-navy-dark border border-accent-gold/20 focus:border-accent-gold rounded-xl px-4 py-3.5 text-text-primary text-[0.95rem] focus:outline-none transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed appearance-none cursor-pointer"
                >
                  <option value="" disabled className="text-text-secondary/60 bg-primary-navy-dark">
                    — Choose a service —
                  </option>
                  {SERVICES.map((svc) => (
                    <option
                      key={svc}
                      value={svc}
                      className="bg-primary-navy-dark text-text-primary"
                    >
                      {svc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message (optional) */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="booking-message"
                  className="text-text-secondary text-[0.875rem] font-medium"
                >
                  Message{' '}
                  <span className="text-text-secondary/50 text-[0.8rem] font-normal">(optional)</span>
                </label>
                <textarea
                  id="booking-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Share any specific topic or query you'd like to discuss..."
                  disabled={submitting || submitted}
                  className="w-full bg-primary-navy-dark border border-accent-gold/20 focus:border-accent-gold rounded-xl px-4 py-3.5 text-text-primary text-[0.95rem] focus:outline-none transition-all duration-200 placeholder:text-text-secondary/40 disabled:opacity-60 disabled:cursor-not-allowed resize-none"
                />
              </div>

              {/* Error message */}
              {error && (
                <p className="text-red-400 text-[0.88rem] leading-relaxed bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3">
                  <i className="fa-solid fa-circle-exclamation mr-2"></i>
                  {error}
                </p>
              )}

              {/* Submit button */}
              <button
                type="submit"
                id="booking-submit"
                disabled={submitting || submitted}
                className="bg-accent-gold disabled:bg-accent-gold/50 text-primary-navy-dark disabled:text-primary-navy-dark/70 font-montserrat font-semibold px-8 py-3.5 rounded-full text-[0.95rem] transition-all duration-200 w-full cursor-pointer disabled:cursor-not-allowed hover:bg-accent-gold-dark hover:text-bg-light flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(197,160,89,0.25)] hover:shadow-[0_6px_20px_rgba(197,160,89,0.35)] hover:-translate-y-0.5"
              >
                {submitting ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin"></i>
                    Submitting…
                  </>
                ) : submitted ? (
                  <>
                    <i className="fa-solid fa-check"></i>
                    Submitted — Complete Payment
                  </>
                ) : (
                  <>
                    Book Consultation
                    <i className="fa-solid fa-calendar-check text-[0.9rem]"></i>
                  </>
                )}
              </button>

              <p className="text-text-secondary/50 text-[0.78rem] text-center leading-relaxed">
                <i className="fa-solid fa-lock mr-1.5 text-accent-gold/60"></i>
                Your details are submitted securely. Payment via UPI after form submission.
              </p>
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Payment Modal */}
      {showModal && (
        <PaymentModal
          onClose={handleModalClose}
          userName={form.fullName}
          service={form.service}
        />
      )}
    </section>
  )
}

export default Booking
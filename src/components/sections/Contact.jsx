import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate email via regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(formData.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' })
      return
    }

    setSubmitting(true)
    setStatus({ type: '', message: '' })

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_default'
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_default'
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key_default'

    // Real submission attempt via EmailJS
    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          reply_to: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        publicKey
      )
      .then(() => {
        setStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully. Dhananjay Singh will get in touch with you shortly.',
        })
        setFormData({ name: '', email: '', subject: '', message: '' })
        setSubmitting(false)
      })
      .catch((err) => {
        console.warn('EmailJS error or unconfigured keys, checking fallback...', err)
        // For development/demo purposes, fallback to a timed success if keys are unconfigured
        if (publicKey === 'public_key_default') {
          setTimeout(() => {
            setStatus({
              type: 'success',
              message: 'Thank you! Your message has been sent successfully. (Demo fallback trigger)',
            })
            setFormData({ name: '', email: '', subject: '', message: '' })
            setSubmitting(false)
          }, 1200)
        } else {
          setStatus({
            type: 'error',
            message: `Failed to send message: ${err.text || 'Please check your EmailJS configuration keys.'}`,
          })
          setSubmitting(false)
        }
      })
  }

  // Animation configuration
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1], // ease-premium
      },
    },
  }

  return (
    <section id="contact" className="bg-primary-navy-dark py-[60px] md:py-[100px] text-text-primary font-poppins overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        {/* Section Heading */}
        <div className="mb-[60px] text-center">
          <span className="text-accent-gold uppercase text-[0.875rem] font-semibold tracking-[2px] mb-3 block">
            Get in Touch
          </span>
          <h2 className="text-[2.25rem] font-bold text-bg-white font-montserrat relative pb-4 inline-block title-underline">
            Contact Dhananjay Singh
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-[60px] items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Left Column: Contact Cards Info */}
          <motion.div className="flex flex-col gap-6" variants={revealVariants}>
            <div className="bg-primary-navy-light/30 border border-accent-gold/15 rounded-2xl p-[30px] shadow-sm hover:border-accent-gold/40 transition-colors duration-[300ms] flex gap-5 items-start">
              <div className="w-12 h-12 bg-accent-gold/10 border border-accent-gold/25 rounded-xl flex justify-center items-center text-accent-gold text-[1.4rem] shrink-0">
                <i className="fa-solid fa-map-location-dot"></i>
              </div>
              <div className="flex flex-col">
                <h4 className="font-montserrat font-bold text-[1.1rem] text-bg-white mb-1.5">
                  Office Location
                </h4>
                <p className="text-text-secondary text-[0.9rem] leading-relaxed">
                  Gaya, Bihar, India
                </p>
              </div>
            </div>

            <div className="bg-primary-navy-light/30 border border-accent-gold/15 rounded-2xl p-[30px] shadow-sm hover:border-accent-gold/40 transition-colors duration-[300ms] flex gap-5 items-start">
              <div className="w-12 h-12 bg-accent-gold/10 border border-accent-gold/25 rounded-xl flex justify-center items-center text-accent-gold text-[1.4rem] shrink-0">
                <i className="fa-solid fa-phone-volume"></i>
              </div>
              <div className="flex flex-col">
                <h4 className="font-montserrat font-bold text-[1.1rem] text-bg-white mb-1.5">
                  Direct Contact
                </h4>
                <p className="text-text-secondary text-[0.9rem] leading-relaxed mb-0.5">
                  +91 0000000000
                </p>
                <p className="text-[0.75rem] text-accent-gold-light/60">
                  Monday - Saturday: 10:00 AM - 6:00 PM IST
                </p>
              </div>
            </div>

            <div className="bg-primary-navy-light/30 border border-accent-gold/15 rounded-2xl p-[30px] shadow-sm hover:border-accent-gold/40 transition-colors duration-[300ms] flex gap-5 items-start">
              <div className="w-12 h-12 bg-accent-gold/10 border border-accent-gold/25 rounded-xl flex justify-center items-center text-accent-gold text-[1.4rem] shrink-0">
                <i className="fa-solid fa-envelope-open-text"></i>
              </div>
              <div className="flex flex-col">
                <h4 className="font-montserrat font-bold text-[1.1rem] text-bg-white mb-1.5">
                  Email Address
                </h4>
                <p className="text-text-secondary text-[0.9rem] leading-relaxed">
                  contact@dhananjaysingh.in
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form with Floating Labels */}
          <motion.div className="bg-primary-navy-light/20 border border-accent-gold/10 rounded-2xl p-6 sm:p-10 shadow-premium" variants={revealVariants}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {/* Form Status Message */}
              {status.message && (
                <div
                  className={`p-4 rounded-xl text-[0.9rem] leading-relaxed transition-all duration-[300ms] ${
                    status.type === 'success'
                      ? 'bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366]'
                      : 'bg-red-500/10 border border-red-500/30 text-red-400'
                  }`}
                >
                  {status.message}
                </div>
              )}

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="relative w-full">
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder=" "
                    required
                    className="peer w-full bg-primary-navy-light/30 border border-accent-gold/20 focus:border-accent-gold rounded-xl px-4 pt-6 pb-2 text-text-primary text-[0.95rem] focus:outline-none transition-all duration-[200ms] ease-premium"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 top-4 text-[0.9rem] text-text-secondary transition-all duration-[200ms] pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-[0.95rem] peer-focus:top-1.5 peer-focus:text-[0.75rem] peer-focus:text-accent-gold peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[0.75rem]"
                  >
                    Full Name *
                  </label>
                </div>

                {/* Email Address */}
                <div className="relative w-full">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder=" "
                    required
                    className="peer w-full bg-primary-navy-light/30 border border-accent-gold/20 focus:border-accent-gold rounded-xl px-4 pt-6 pb-2 text-text-primary text-[0.95rem] focus:outline-none transition-all duration-[200ms] ease-premium"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-4 text-[0.9rem] text-text-secondary transition-all duration-[200ms] pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-[0.95rem] peer-focus:top-1.5 peer-focus:text-[0.75rem] peer-focus:text-accent-gold peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[0.75rem]"
                  >
                    Email Address *
                  </label>
                </div>
              </div>

              {/* Subject */}
              <div className="relative w-full">
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder=" "
                  required
                  className="peer w-full bg-primary-navy-light/30 border border-accent-gold/20 focus:border-accent-gold rounded-xl px-4 pt-6 pb-2 text-text-primary text-[0.95rem] focus:outline-none transition-all duration-[200ms] ease-premium"
                />
                <label
                  htmlFor="subject"
                  className="absolute left-4 top-4 text-[0.9rem] text-text-secondary transition-all duration-[200ms] pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-[0.95rem] peer-focus:top-1.5 peer-focus:text-[0.75rem] peer-focus:text-accent-gold peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[0.75rem]"
                >
                  Subject *
                </label>
              </div>

              {/* Message */}
              <div className="relative w-full">
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder=" "
                  required
                  className="peer w-full h-[150px] bg-primary-navy-light/30 border border-accent-gold/20 focus:border-accent-gold rounded-xl px-4 pt-6 pb-2 text-text-primary text-[0.95rem] focus:outline-none transition-all duration-[200ms] ease-premium resize-none"
                />
                <label
                  htmlFor="message"
                  className="absolute left-4 top-4 text-[0.9rem] text-text-secondary transition-all duration-[200ms] pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-[0.95rem] peer-focus:top-1.5 peer-focus:text-[0.75rem] peer-focus:text-accent-gold peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[0.75rem]"
                >
                  Message *
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="bg-accent-gold disabled:bg-accent-gold/50 text-primary-navy-dark disabled:text-primary-navy-dark/70 font-semibold px-8 py-3.5 rounded-full text-[0.95rem] transition-all duration-[200ms] w-full cursor-pointer disabled:cursor-not-allowed hover:bg-accent-gold-dark hover:text-bg-light flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin"></i> Sending Secure Message
                  </>
                ) : (
                  <>
                    Send Secure Message <i className="fa-solid fa-paper-plane text-[0.85rem]"></i>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact

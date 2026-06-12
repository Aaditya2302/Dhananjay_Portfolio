import { useEffect } from 'react'
import qrCode from '../../assets/images/phone_qr.jpeg'


const UPI_ID = import.meta.env.VITE_UPI_ID;
const WHATSAPP_NUMBER = '918340543370'

const PaymentModal = ({ onClose, userName, service }) => {
  // Close on ESC key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const waMessage = encodeURIComponent(
    `Hello Dhananjay Sir, I have booked a consultation for *${service}*. My name is *${userName}*. I have completed the payment. Please find the screenshot attached.`
  )

  const handleCopyUPI = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(UPI_ID)
        .then(() => alert('UPI ID Copied!'))
        .catch(() => {
          fallbackCopy()
        })
    } else {
      fallbackCopy()
    }
  }

  const fallbackCopy = () => {
    const el = document.createElement('textarea')
    el.value = UPI_ID
    el.style.position = 'fixed'
    el.style.top = '-9999px'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.focus()
    el.select()
    try {
      document.execCommand('copy')
      alert('UPI ID Copied!')
    } catch {
      alert('Could not copy. Please copy manually: ' + UPI_ID)
    }
    document.body.removeChild(el)
  }

  // Prevent scroll bleed on body while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Complete Payment"
      onClick={onClose}   /* clicking backdrop closes */
    >
      {/* Modal box — clicking INSIDE must NOT close */}
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-[440px] relative overflow-hidden overflow-y-auto max-h-[100vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gold accent bar at top */}
        <div className="h-1.5 w-full bg-gradient-to-r from-accent-gold via-accent-gold-light to-accent-gold"></div>

        <div className="p-6 sm:p-8">

          {/* Close button */}
          <button
            onClick={onClose}
            id="payment-modal-close"
            aria-label="Close payment modal"
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 text-[1.1rem] transition-all duration-200 focus:outline-none"
          >
            x
          </button>

          {/* Heading */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#C5A059]/10 mb-3">
              <i className="fa-solid fa-qrcode text-[1.4rem] text-[#C5A059]"></i>
            </div>
            <h3 className="font-montserrat font-bold text-[1.4rem] text-gray-900 leading-tight">
              Complete Payment
            </h3>
            <p className="text-gray-500 text-[0.88rem] mt-1 leading-relaxed">
              Scan the QR code or use UPI ID to pay
            </p>
          </div>

          {/* Booking summary pill */}
          <div className="flex items-center gap-2 bg-[#C5A059]/8 border border-[#C5A059]/25 rounded-xl px-4 py-2.5 mb-5">
            <i className="fa-solid fa-briefcase text-[0.85rem] text-[#C5A059] shrink-0"></i>
            <span className="text-gray-700 text-[0.83rem] leading-snug">
              <span className="font-semibold text-gray-900">{userName}</span>
              {' · '}
              <span className="text-[#A47E3B] font-medium">{service}</span>
            </span>
          </div>

          {/* QR Code image */}
          <div className="flex justify-center mb-5">
            <div className="p-3 border-2 border-[#C5A059]/30 rounded-2xl bg-white shadow-sm">
              <img
                src={qrCode}
                alt="PhonePe / UPI Payment QR Code"
                width={220}
                height={220}
                className="rounded-xl block"
                style={{ width: 220, height: 'auto' }}
              />
            </div>
          </div>

          {/* UPI ID row */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4">
            <span className="text-gray-400 text-[0.78rem] font-medium uppercase tracking-wide shrink-0">
              UPI ID
            </span>
            <span
              id="upi-id-display"
              className="flex-1 text-gray-800 text-[0.92rem] font-semibold font-mono truncate"
            >
              {UPI_ID}
            </span>
            <button
              onClick={handleCopyUPI}
              id="copy-upi-btn"
              aria-label="Copy UPI ID"
              className="bg-[#C5A059] hover:bg-[#A47E3B] text-white text-[0.78rem] font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 shrink-0 flex items-center gap-1.5"
            >
              <i className="fa-regular fa-copy text-[0.8rem]"></i>
              Copy
            </button>
          </div>

          {/* Instruction */}
          <p className="text-gray-500 text-[0.83rem] leading-relaxed text-center mb-5">
            <i className="fa-solid fa-circle-info mr-1.5 text-[#C5A059]"></i>
            After payment, send the screenshot to Dhananjay Sir on WhatsApp to confirm your booking.
          </p>

          {/* WhatsApp button */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
            id="whatsapp-payment-confirm"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold text-[0.95rem] py-3.5 rounded-full transition-all duration-200 shadow-[0_4px_14px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.45)] hover:-translate-y-0.5"
          >
            <i className="fa-brands fa-whatsapp text-[1.1rem]"></i>
            Send Screenshot on WhatsApp
          </a>

          <p className="text-gray-400 text-[0.75rem] text-center mt-4 leading-relaxed">
            Your consultation is confirmed once Dhananjay Sir verifies the payment.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PaymentModal

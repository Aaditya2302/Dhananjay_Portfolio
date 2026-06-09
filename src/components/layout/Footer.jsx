import { useState } from 'react'

const Footer = () => {
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) {
      alert('Subscribed to newsletter.')
      setEmail('')
    }
  }

  const handleLinkClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const targetElement = document.querySelector(href)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <footer className="bg-primary-navy-dark text-text-primary pt-[80px] border-t border-accent-gold/20 font-poppins">
      <div className="w-full max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[40px] mb-[60px]">
        {/* Brand Info */}
        <div className="flex flex-col">
          <h4 className="text-bg-white font-montserrat font-bold text-[1.5rem] mb-[20px]">
            DS<span className="text-accent-gold">.</span> Leadership
          </h4>
          <p className="text-text-secondary text-[0.9rem] leading-[1.6] mb-[24px]">
            Empowering local MSME trade networks, building academic excellence, and strengthening regional board administration systems in Bihar.
          </p>
          <div className="flex items-center gap-[16px]">
            <a
              href="https://www.linkedin.com/in/dhananjay-singh-aa48171a0?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target='_blank'
              className="w-10 h-10 border border-text-secondary/20 rounded-full flex justify-center items-center text-text-secondary hover:text-accent-gold hover:border-accent-gold transition-all duration-[200ms]"
              aria-label="LinkedIn"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a
              href="https://www.instagram.com/invites/contact/?igsh=tj9bcbykfl7e&utm_content=ey3vgbe"
              target='_blank'
              className="w-10 h-10 border border-text-secondary/20 rounded-full flex justify-center items-center text-text-secondary hover:text-accent-gold hover:border-accent-gold transition-all duration-[200ms]"
              aria-label="Instagram"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="https://www.facebook.com/share/1DuVUZj2ba/"
              target='_blank'
              className="w-10 h-10 border border-text-secondary/20 rounded-full flex justify-center items-center text-text-secondary hover:text-accent-gold hover:border-accent-gold transition-all duration-[200ms]"
              aria-label="Facebook"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a
              href="https://twitter.com/biharpradeshta"
              target='_blank'
              className="w-10 h-10 border border-text-secondary/20 rounded-full flex justify-center items-center text-text-secondary hover:text-accent-gold hover:border-accent-gold transition-all duration-[200ms]"
              aria-label="X"
            >
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a
              href="https://youtube.com/@dsinghtr94?si=VuWskoQRRWV6wjZs"
              target='_blank'
              className="w-10 h-10 border border-text-secondary/20 rounded-full flex justify-center items-center text-text-secondary hover:text-accent-gold hover:border-accent-gold transition-all duration-[200ms]"
              aria-label="Youtube"
            >
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="text-bg-white font-montserrat font-semibold text-[1.05rem] mb-[24px] relative pb-[10px] title-underline-left">
            Quick Links
          </h5>
          <ul className="flex flex-col gap-[12px] list-none p-0">
            {[
              { label: 'Home', href: '#home' },
              { label: 'About', href: '#about' },
              { label: 'Services', href: '#services' },
              { label: 'Export Business', href: '#export' },
              { label: 'Achievements', href: '#achievements' },
            ].map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-text-secondary text-[0.9rem] hover:text-accent-gold hover:pl-1 transition-all duration-[200ms]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h5 className="text-bg-white font-montserrat font-semibold text-[1.05rem] mb-[24px] relative pb-[10px] title-underline-left">
            Resources
          </h5>
          <ul className="flex flex-col gap-[12px] list-none p-0">
            {[
              { label: 'Research Papers', href: '#research' },
              { label: 'Insights Blog', href: '#blog' },
              { label: 'Photo Gallery', href: '#gallery' },
              { label: 'Contact Form', href: '#contact' },
              { label: 'Privacy Policy', href: '#contact' },
            ].map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-text-secondary text-[0.9rem] hover:text-accent-gold hover:pl-1 transition-all duration-[200ms]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h5 className="text-bg-white font-montserrat font-semibold text-[1.05rem] mb-[24px] relative pb-[10px] title-underline-left">
            Newsletter
          </h5>
          <p className="text-text-secondary text-[0.9rem] mb-[20px]">
            Subscribe to receive quarterly insights on MSME export updates and educational administration reforms.
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="w-full max-w-[1200px] mx-auto px-6 border-t border-primary-navy-light py-[30px] flex flex-col md:flex-row justify-between items-center gap-[20px]">
        <div className="text-text-secondary text-[0.85rem] text-center md:text-left">
          Copyright &copy; 2026 Dhananjay Singh. All Rights Reserved.
        </div>
        <div className="flex gap-[24px] text-[0.85rem] text-text-secondary">
          <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="hover:text-accent-gold">
            Terms & Conditions
          </a>
          <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="hover:text-accent-gold">
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

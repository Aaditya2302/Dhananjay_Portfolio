import { useState, useEffect } from 'react'
import useSticky from '../../hooks/useSticky'

const NAV_ITEMS = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Export Business', href: '#export', id: 'export' },
  { label: 'Achievements', href: '#achievements', id: 'achievements' },
  { label: 'Research', href: '#research', id: 'research' },
  { label: 'Blog', href: '#blog', id: 'blog' },
  { label: 'Gallery', href: '#gallery', id: 'gallery' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

const Navbar = () => {
  const isSticky = useSticky(50)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.getAttribute('id'))
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      threshold: 0.3,
      rootMargin: '-10% 0px -60% 0px', // Spying margins matching original JS script
    })

    sections.forEach((sec) => observer.observe(sec))
    return () => observer.disconnect()
  }, [])

  // Toggle mobile body scrolling
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const targetElement = document.querySelector(href)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-[400ms] ease-premium ${
        isSticky
          ? 'bg-primary-navy/95 backdrop-blur-[10px] py-[14px] border-b border-accent-gold/15 shadow-md'
          : 'bg-transparent py-[24px]'
      }`}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 flex justify-between items-center">
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, '#home')}
          className="text-bg-light font-extrabold text-[1.5rem] tracking-[1px] font-montserrat"
          aria-label="Dhananjay Singh Home"
        >
          DS<span className="text-accent-gold">.</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-[32px]">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className={`text-bg-light font-medium text-[0.9rem] tracking-[0.5px] relative py-1.5 transition-all duration-[200ms] font-poppins hover:text-accent-gold-light after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-accent-gold after:transition-all after:duration-[200ms] ${
                activeSection === item.id ? 'after:w-full' : 'after:w-0 hover:after:w-full'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={(e) => handleLinkClick(e, '#booking')}
            className="border-2 border-accent-gold text-accent-gold px-5 py-2 rounded-full font-semibold text-[0.85rem] transition-all duration-[200ms] hover:bg-accent-gold hover:text-primary-navy-dark hover:shadow-[0_0_15px_rgba(197,160,89,0.3)] font-poppins"
          >
            Book Consultation
          </a>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          className="lg:hidden block cursor-pointer bg-none border-none p-1.5 z-[1001] focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="nav-menu"
        >
          <span
            className={`block w-[25px] h-[2px] bg-bg-light my-1.5 transition-all duration-[200ms] ${
              mobileMenuOpen ? 'translate-y-[8px] rotate-[45deg]' : ''
            }`}
          ></span>
          <span
            className={`block w-[25px] h-[2px] bg-bg-light my-1.5 transition-all duration-[200ms] ${
              mobileMenuOpen ? 'opacity-0' : ''
            }`}
          ></span>
          <span
            className={`block w-[25px] h-[2px] bg-bg-light my-1.5 transition-all duration-[200ms] ${
              mobileMenuOpen ? 'translate-y-[-8px] rotate-[-45deg]' : ''
            }`}
          ></span>
        </button>

        {/* Mobile Slide-in Drawer */}
        <nav
          id="nav-menu"
          className={`fixed top-0 right-0 w-[300px] h-screen bg-primary-navy-dark shadow-2xl border-l border-accent-gold/20 flex flex-col justify-center items-center gap-[30px] transition-all duration-[400ms] ease-premium lg:hidden ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="navigation"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className={`text-bg-light font-medium text-[1.1rem] tracking-[0.5px] transition-all duration-[200ms] font-poppins ${
                activeSection === item.id ? 'text-accent-gold font-semibold' : 'hover:text-accent-gold'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={(e) => handleLinkClick(e, '#booking')}
            className="border-2 border-accent-gold text-accent-gold px-6 py-2.5 rounded-full font-semibold text-[0.9rem] transition-all duration-[200ms] hover:bg-accent-gold hover:text-primary-navy-dark"
          >
            Book Consultation
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar

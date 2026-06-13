import { motion } from 'framer-motion'
import heroBg from '../../assets/images/hero-bg.png'
import profilePhoto from '../../assets/images/client_photo.jpeg'

const Hero = () => {
  const handleScrollTo = (e, targetId) => {
    e.preventDefault()
    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
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

  const graphicVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-[100px] text-text-primary overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
      aria-label="Introduction"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 hero-overlay z-[1]"></div>

      <div className="w-full max-w-[1200px] mx-auto px-6 z-[2]">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] lg:grid-cols-[1.2fr_0.8fr] gap-[40px] items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Content Left */}
          <div className="flex flex-col">
            <motion.p
              className="text-accent-gold font-poppins text-[1rem] font-semibold tracking-[3px] uppercase mb-5"
              variants={itemVariants}
            >
              Leadership & Policy Advisory
            </motion.p>

            <motion.h1
              className="text-[2.5rem] sm:text-[3rem] lg:text-[4rem] font-extrabold text-bg-white mb-3 tracking-[-1px] font-montserrat leading-[1.1]"
              variants={itemVariants}
            >
              Dhananjay Singh
            </motion.h1>

            <motion.p
              className="text-[1.15rem] md:text-[1.35rem] font-medium text-accent-gold-light mb-6 border-l-3 border-accent-gold pl-4 leading-[1.4] font-poppins"
              variants={itemVariants}
            >
              Independent Director Aspirant | MSME Export Mentor | Education Leader | Educationist | Economist | Numerologist
            </motion.p>

            <motion.p
              className="text-[1.05rem] text-text-secondary mb-10 max-w-[600px] leading-[1.6] font-poppins"
              variants={itemVariants}
            >
              Empowering MSMEs to scale internationally, strengthening elementary to higher education governance, and advocating social welfare with over 30 years of dedication in teacher welfare, policy reforms, and trade mentorship.
            </motion.p>

            <motion.div className="flex flex-wrap gap-4" variants={itemVariants}>
              <a
                href="#booking"
                onClick={(e) => handleScrollTo(e, '#booking')}
                className="bg-accent-gold text-primary-navy-dark hover:bg-accent-gold-dark hover:text-bg-light px-8 py-3.5 rounded-full font-semibold text-[0.95rem] transition-all duration-[400ms] ease-premium shadow-[0_4px_14px_rgba(197,160,89,0.3)] hover:shadow-[0_6px_20px_rgba(197,160,89,0.4)] flex items-center gap-2 hover:-translate-y-0.5 cursor-pointer font-poppins"
                aria-label="Book a consultation with Dhananjay Singh"
              >
                Book Consultation <i className="fa-solid fa-calendar-check text-[0.9rem]"></i>
              </a>
              <a
                href="#about"
                onClick={(e) => handleScrollTo(e, '#about')}
                className="border-2 border-accent-gold text-accent-gold hover:bg-accent-gold/8 hover:text-accent-gold px-8 py-3.5 rounded-full font-semibold text-[0.95rem] transition-all duration-[400ms] ease-premium flex items-center gap-2 hover:-translate-y-0.5 cursor-pointer font-poppins"
                aria-label="Learn more about Dhananjay Singh"
              >
                Learn More <i className="fa-solid fa-arrow-right text-[0.9rem]"></i>
              </a>
            </motion.div>
          </div>

          {/* Portrait Fallback Right */}
          <motion.div
            className="relative flex justify-center items-center order-first md:order-none"
            variants={graphicVariants}
          >
            {/* Decors */}
            <div className="relative w-[280px] h-[330px] md:w-[320px] md:h-[380px] rounded-2xl overflow-hidden border-2 border-accent-gold/40 shadow-premium z-[2]">
              <div className="w-full h-full bg-gradient-to-br from-primary-navy-light to-primary-navy-dark flex flex-col justify-center items-center text-center p-6 select-none font-poppins">
                <div className="w-[170px] h-[170px] rounded-full border-2 border-accent-gold overflow-hidden mb-4 bg-primary-navy-light">
                  <img
                    src={profilePhoto}
                    alt="Dhananjay Singh"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span className="font-montserrat font-bold text-[1.5rem] text-bg-light mb-1">
                  Dhananjay Singh
                </span>
                <p className="text-[0.8rem] text-accent-gold tracking-[1px] uppercase font-semibold">
                  Bihar, India
                </p>
              </div>
            </div>
            {/* Decor Frame Offset */}
            <div className="absolute h-[330px]w-[280px] md:w-[320px] md:h-[380px] border-2 border-accent-gold rounded-2xl top-4 left-4 md:top-5 md:left-5 z-[1]"></div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down mouse icon */}
      <div className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-secondary text-[0.75rem] font-medium tracking-[2px] uppercase select-none font-poppins z-10">
        <span>Scroll Down</span>
        <div className="w-[24px] h-[40px] border-2 border-text-secondary/50 rounded-full relative">
          <div className="w-[4px] h-[8px] bg-accent-gold rounded-full absolute left-1/2 -translate-x-1/2 scroll-indicator-wheel"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero

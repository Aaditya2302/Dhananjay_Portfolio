import { motion } from 'framer-motion'
import { aboutTimelineData } from '../../data/aboutTimeline'

const About = () => {
  const handleScrollTo = (e, targetId) => {
    e.preventDefault()
    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Animation configurations
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
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  const timelineItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  return (
    <section id="about" className="bg-bg-white py-[60px] md:py-[100px] font-poppins overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-[60px] items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Left Side: Visual / Portrait Graphic Placeholder */}
          <motion.div className="relative" variants={revealVariants}>
            <div className="relative border border-accent-gold/20 rounded-3xl overflow-hidden shadow-lg aspect-[4/5] max-w-[420px] mx-auto lg:mx-0">
              <div className="w-full h-full bg-gradient-to-br from-primary-navy-dark to-primary-navy-light flex flex-col justify-center items-center text-center p-10 text-bg-light select-none">
                <i className="fa-solid fa-shield-halved text-[5rem] text-accent-gold mb-6"></i>
                <h4 className="font-montserrat font-bold text-[1.5rem] text-bg-white mb-2">
                  Dhananjay Singh
                </h4>
                <p className="text-text-secondary text-[0.9rem] leading-[1.4]">
                  Bihar Teacher Association President, MSME Advisor, Policy Advocate
                </p>
              </div>
            </div>
            {/* Overlay Badge */}
            <div className="relative top-[10px] -right-2 sm:-right-[65px] bg-primary-navy border-2 border-accent-gold rounded-2xl p-4 sm:p-[16px_24px] shadow-lg flex items-center gap-[16px] max-w-[260px] text-bg-light z-10">
              <i className="fa-solid fa-award text-[2rem] text-accent-gold shrink-0"></i>
              <p className="text-[0.85rem] font-medium text-text-secondary leading-[1.3]">
                Recognized for <span className="block font-montserrat text-[1.1rem] font-bold text-bg-white mt-0.5">Social welfare & trade mentoring</span> in Bihar region
              </p>
            </div>
            <div className="relative top-[20px] -right-2 sm:-right-[65px] bg-primary-navy border-2 border-accent-gold rounded-2xl p-4 sm:p-[16px_24px] shadow-lg flex items-center gap-[16px] max-w-[260px] text-bg-light z-10">
              <i className="fa-solid fa-award text-[2rem] text-accent-gold shrink-0"></i>
              <p className="text-[0.85rem] font-medium text-text-secondary leading-[1.3]">
                Recognized for <span className="block font-montserrat text-[1.1rem] font-bold text-bg-white mt-0.5">Member, Distric education dialogue committee (R.T.E Gaya)</span>
              </p>
            </div>
          </motion.div>

          {/* Right Side: Bio, Mission Statement & Timeline */}
          <div className="flex flex-col">
            <motion.span className="text-accent-gold uppercase text-[0.875rem] font-semibold tracking-[2px] mb-3 block" variants={revealVariants}>
              Biography & Vision
            </motion.span>
            <motion.h2 className="text-[2.25rem] font-bold text-primary-navy mb-6 font-montserrat relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[60px] after:h-[3px] after:bg-accent-gold after:rounded-full" variants={revealVariants}>
              About Dhananjay Singh
            </motion.h2>
            <motion.p className="text-[1rem] text-text-secondary leading-[1.7] mb-6" variants={revealVariants}>
              Dhananjay Singh is an education administrator, trade mentor, and socio-economic reformer based in Gaya, Bihar. Serving as the <strong className="text-primary-navy font-semibold">State President of the Bihar Pradesh Teacher Association</strong>, he spearheads welfare advocacy and policies supporting secondary education. As an <strong className="text-primary-navy font-semibold">MSME Export Mentor</strong>, he drives economic growth by mentoring local handcraft, agricultural, and wellness business owners to expand into global markets. Dedicated to transparency and ethics, he is preparing for governance leadership as an <strong className="text-primary-navy font-semibold">Independent Director Aspirant</strong>.
            </motion.p>

            {/* Mission Statement Box */}
            <motion.div className="bg-bg-light border-l-4 border-accent-gold rounded-r-2xl p-[20px_24px] mb-8" variants={revealVariants}>
              <h5 className="font-montserrat font-bold text-[1rem] text-primary-navy mb-2">
                Mission Statement
              </h5>
              <p className="text-[0.9rem] italic text-text-secondary">
                "To bridge educational gaps, cultivate sustainable micro-export ecosystems in Bihar, and foster ethical corporate governance that values transparency and social responsibility."
              </p>
            </motion.div>

            {/* Leadership Timeline */}
            <motion.h3 className="font-montserrat font-bold text-[1.25rem] text-primary-navy mb-6" variants={revealVariants}>
              Leadership Timeline
            </motion.h3>
            
            <div className="relative border-l-2 border-accent-gold/20 pl-6 ml-2 flex flex-col gap-6">
              {aboutTimelineData.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="relative"
                  variants={timelineItemVariants}
                >
                  {/* Timeline Dot Indicator */}
                  <span className="absolute -left-[31px] top-1.5 w-4 h-4 bg-bg-white border-2 border-accent-gold rounded-full z-10"></span>
                  
                  <div className="text-accent-gold font-bold text-[0.875rem] tracking-wider uppercase mb-1">
                    {item.years}
                  </div>
                  <h6 className="font-montserrat font-bold text-[1.05rem] text-primary-navy mb-1.5">
                    {item.title}
                  </h6>
                  <p className="text-[0.9rem] text-text-secondary leading-[1.5]">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div className="mt-8" variants={revealVariants}>
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, '#contact')}
                className="bg-accent-gold text-primary-navy-dark hover:bg-accent-gold-dark hover:text-bg-light px-8 py-3.5 rounded-full font-semibold text-[0.95rem] transition-all duration-[400ms] ease-premium shadow-[0_4px_14px_rgba(197,160,89,0.3)] inline-flex items-center gap-2 hover:-translate-y-0.5 cursor-pointer"
              >
                Connect with Dhananjay
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About

import { motion } from 'framer-motion'
import { servicesData } from '../../data/services'

const Services = () => {
  const handleScrollTo = (e, targetId) => {
    e.preventDefault()
    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const cardVariants = {
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
    <section id="services" className="bg-bg-light py-[60px] md:py-[100px] font-poppins overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        {/* Section Heading */}
        <div className="mb-[60px] text-center">
          <span className="text-accent-gold uppercase text-[0.875rem] font-semibold tracking-[2px] mb-3 block">
            Consulting Services
          </span>
          <h2 className="text-[2.25rem] font-bold text-primary-navy font-montserrat relative pb-4 inline-block title-underline">
            Areas of Expertise
          </h2>
        </div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {servicesData.map((service, idx) => (
            <motion.div
              key={idx}
              className="bg-bg-white border border-primary-navy/5 rounded-2xl p-[40px] shadow-sm hover:shadow-lg transition-all duration-[400ms] ease-premium hover:-translate-y-2 hover:border-accent-gold group flex flex-col items-start"
              variants={cardVariants}
            >
              {/* Icon Container */}
              <div className="w-[60px] h-[60px] bg-primary-navy/5 rounded-xl flex justify-center items-center text-[1.5rem] text-primary-navy group-hover:bg-primary-navy group-hover:text-accent-gold transition-all duration-[300ms] mb-[24px]">
                <i className={service.icon}></i>
              </div>

              <h4 className="font-montserrat font-bold text-[1.3rem] text-primary-navy mb-[16px] leading-[1.3]">
                {service.title}
              </h4>
              
              <p className="text-text-secondary text-[0.95rem] leading-[1.6] mb-[24px] flex-grow">
                {service.description}
              </p>
              
              <a
                href={service.linkHref}
                onClick={(e) => handleScrollTo(e, service.linkHref)}
                className="text-primary-navy group-hover:text-accent-gold font-semibold text-[0.9rem] flex items-center gap-2 group-hover:gap-3 transition-all duration-[200ms]"
              >
                {service.linkText} <i className="fa-solid fa-arrow-right-long text-[0.8rem] transition-transform"></i>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Services

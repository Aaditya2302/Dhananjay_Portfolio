import { motion } from 'framer-motion'
import { researchData } from '../../data/research'

const Research = () => {
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
    <section id="research" className="bg-bg-light py-[60px] md:py-[100px] font-poppins overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        {/* Section Title */}
        <div className="mb-[60px] text-center">
          <span className="text-accent-gold uppercase text-[0.875rem] font-semibold tracking-[2px] mb-3 block">
            Academic Contributions
          </span>
          <h2 className="text-[2.25rem] font-bold text-primary-navy font-montserrat relative pb-4 inline-block title-underline">
            Research & Publications
          </h2>
        </div>

        {/* Research Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-[30px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {researchData.map((paper) => (
            <motion.div
              key={paper.id}
              className="bg-bg-white border border-primary-navy/5 rounded-2xl p-[30px] shadow-sm hover:shadow-lg transition-all duration-[400ms] ease-premium flex flex-col justify-between hover:border-accent-gold hover:-translate-y-1"
              variants={cardVariants}
            >
              <div>
                {/* Meta details */}
                <div className="flex items-center gap-4 text-[0.8rem] text-text-secondary mb-4 flex-wrap">
                  <span className="flex items-center gap-1.5 font-medium">
                    <i className="fa-regular fa-calendar text-accent-gold"></i> {paper.date}
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <i className="fa-regular fa-bookmark text-accent-gold"></i> {paper.category}
                  </span>
                </div>

                <h4 className="font-montserrat font-bold text-[1.2rem] text-primary-navy mb-4 leading-[1.4]">
                  {paper.title}
                </h4>
                
                <p className="text-text-secondary text-[0.95rem] leading-[1.6] mb-6">
                  {paper.desc}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-primary-navy/5 mt-auto">
                <a
                  href={paper.pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-navy text-accent-gold hover:bg-accent-gold hover:text-primary-navy-dark px-5 py-2.5 rounded-full font-semibold text-[0.8rem] transition-all duration-[200ms] flex items-center gap-1.5 cursor-pointer shadow-sm"
                  aria-label={`Download PDF copy of ${paper.title}`}
                >
                  <i className="fa-solid fa-file-pdf"></i> Download PDF
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleScrollTo(e, '#contact')}
                  className="border border-primary-navy/10 text-primary-navy hover:border-accent-gold hover:text-accent-gold px-5 py-2.5 rounded-full font-semibold text-[0.8rem] transition-all duration-[200ms] flex items-center gap-1.5 cursor-pointer"
                >
                  Request Hardcopy
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Research

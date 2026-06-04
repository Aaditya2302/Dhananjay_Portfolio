import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { achievementsCategories, achievementsData } from '../../data/achievements'

const Achievements = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredData = activeFilter === 'all'
    ? achievementsData
    : achievementsData.filter((item) => item.category === activeFilter)

  return (
    <section id="achievements" className="bg-bg-white py-[60px] md:py-[100px] font-poppins overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        {/* Section Title */}
        <div className="mb-[40px] text-center">
          <span className="text-accent-gold uppercase text-[0.875rem] font-semibold tracking-[2px] mb-3 block">
            Public Presence
          </span>
          <h2 className="text-[2.25rem] font-bold text-primary-navy font-montserrat relative pb-4 inline-block title-underline">
            Achievements & Media
          </h2>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center items-center gap-[10px] mb-[40px] max-w-[800px] mx-auto select-none">
          {achievementsCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-5 py-2.5 rounded-full text-[0.85rem] font-semibold border-2 cursor-pointer transition-all duration-[200ms] ease-premium focus:outline-none ${
                activeFilter === category.id
                  ? 'bg-accent-gold border-accent-gold text-primary-navy-dark shadow-[0_4px_12px_rgba(197,160,89,0.3)]'
                  : 'bg-transparent border-primary-navy/10 text-primary-navy hover:border-accent-gold hover:text-accent-gold'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredData.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="bg-bg-light border border-primary-navy/5 rounded-2xl relative overflow-hidden group aspect-[4/3] shadow-sm select-none cursor-default"
              >
                {/* Visual Placeholder Content inside card */}
                <div className="w-full h-full flex flex-col justify-center items-center text-center p-6 bg-gradient-to-br from-primary-navy-light to-primary-navy-dark text-bg-light transition-all duration-[400ms] group-hover:scale-[1.05]">
                  <i className={`${item.iconClass} text-[3rem] text-accent-gold mb-4`}></i>
                  <h5 className="font-montserrat font-bold text-[1.1rem] leading-[1.4] text-bg-white mb-2 max-w-[220px]">
                    {item.title}
                  </h5>
                  <p className="text-text-secondary text-[0.8rem] tracking-wider uppercase font-semibold">
                    {item.categoryLabel}
                  </p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary-navy/95 border border-accent-gold/50 flex flex-col justify-center items-center text-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-[450ms] ease-premium translate-y-3 group-hover:translate-y-0">
                  <i className="fa-solid fa-magnifying-glass-plus text-[1.5rem] text-accent-gold mb-3"></i>
                  <h5 className="font-montserrat font-bold text-[1.15rem] text-bg-white mb-1 leading-[1.3] max-w-[220px]">
                    {item.title}
                  </h5>
                  <p className="text-accent-gold text-[0.8rem] tracking-wider uppercase font-semibold">
                    {item.categoryLabel}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default Achievements

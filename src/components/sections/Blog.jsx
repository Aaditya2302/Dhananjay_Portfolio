import { motion } from 'framer-motion'
import { blogData } from '../../data/blog'

const Blog = () => {
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
        staggerChildren: 0.1,
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
    <section id="blog" className="bg-bg-white py-[60px] md:py-[100px] font-poppins overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        {/* Section Heading */}
        <div className="mb-[60px] text-center">
          <span className="text-accent-gold uppercase text-[0.875rem] font-semibold tracking-[2px] mb-3 block">
            Thought Leadership
          </span>
          <h2 className="text-[2.25rem] font-bold text-primary-navy font-montserrat relative pb-4 inline-block title-underline">
            Latest Articles & Insights
          </h2>
        </div>

        {/* Blog Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {blogData.map((post) => (
            <motion.article
              key={post.id}
              className="bg-bg-white border border-primary-navy/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-accent-gold/40 hover:-translate-y-1.5 transition-all duration-[400ms] ease-premium flex flex-col group"
              variants={cardVariants}
            >
              {/* Abstract Icon Block */}
              <div className="h-[180px] bg-gradient-to-br from-primary-navy-light to-primary-navy-dark flex justify-center items-center text-[3rem] text-accent-gold select-none group-hover:scale-[1.02] transition-transform duration-[300ms]">
                <i className={post.iconClass}></i>
              </div>

              {/* Text Content */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center justify-between text-[0.75rem] text-text-secondary mb-3 font-semibold">
                    <span className="text-accent-gold-dark uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span>{post.date}</span>
                  </div>

                  <h4 className="font-montserrat font-bold text-[1.1rem] text-primary-navy mb-3 leading-[1.4] group-hover:text-accent-gold transition-colors duration-[200ms]">
                    {post.title}
                  </h4>
                  
                  <p className="text-text-secondary text-[0.85rem] leading-[1.5] mb-5">
                    {post.desc}
                  </p>
                </div>

                <a
                  href="#contact"
                  onClick={(e) => handleScrollTo(e, '#contact')}
                  className="text-primary-navy hover:text-accent-gold font-semibold text-[0.85rem] flex items-center gap-1 mt-auto"
                >
                  Read Article <i className="fa-solid fa-chevron-right text-[0.7rem] ml-0.5"></i>
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Blog

import { useRef } from 'react'
import { statsData } from '../../data/stats'
import useCounter from '../../hooks/useCounter'

const StatCard = ({ icon, target, suffix, title }) => {
  const cardRef = useRef(null)
  const count = useCounter(cardRef, target, 1800)

  return (
    <div
      ref={cardRef}
      className="bg-primary-navy-light/40 border border-accent-gold/10 hover:border-accent-gold hover:shadow-2xl rounded-2xl px-4 py-6 text-center transition-all duration-[400ms] ease-premium hover:-translate-y-1.5 flex flex-col items-center justify-center"
    >
      <div className="text-[1.75rem] text-accent-gold mb-3 flex items-center justify-center">
        <i className={icon}></i>
      </div>
      <div className="text-[2.25rem] font-bold font-montserrat text-bg-white mb-1.5 leading-none">
        {count}
        <span className="text-accent-gold-light font-semibold text-[1.8rem] ml-[1px]">{suffix}</span>
      </div>
      <div className="text-[0.8rem] font-medium text-text-secondary tracking-[0.5px] leading-[1.3] font-poppins">
        {title}
      </div>
    </div>
  )
}

const Stats = () => {
  return (
    <section className="bg-primary-navy-dark py-[60px] border-b border-accent-gold/15" aria-label="Key Achievements Stats">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {statsData.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats

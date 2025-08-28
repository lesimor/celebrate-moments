import { motion } from 'framer-motion'
import type { WeddingData } from '../types/wedding'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'

dayjs.locale('ko')

interface HeroProps {
  data: WeddingData
}

export const Hero = ({ data }: HeroProps) => {
  const weddingDate = dayjs(data.wedding.date)
  const dDay = weddingDate.diff(dayjs(), 'day')
  
  return (
    <section className="hero-section">
      <motion.div 
        className="hero-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-image-wrapper">
          <img 
            src={data.gallery.mainImage} 
            alt={`${data.couple.groom.name} & ${data.couple.bride.name}`}
            className="hero-image"
          />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="hero-date"
          >
            {weddingDate.format('YYYY년 M월 D일')}
          </motion.div>
          
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {data.couple.groom.fullName} 
            <span className="hero-and">&</span>
            {data.couple.bride.fullName}
          </motion.h1>
          
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {data.message.title}
          </motion.p>
          
          {dDay >= 0 && (
            <motion.div
              className="hero-dday"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              D-{dDay}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  )
}
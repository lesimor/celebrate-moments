import { motion } from 'framer-motion';
import { Flower2 } from 'lucide-react';
import type { FuneralEvent } from '../../types/event';
import dayjs from 'dayjs';

interface FuneralHeroProps {
  data: FuneralEvent;
}

export function FuneralHero({ data }: FuneralHeroProps) {
  const deathDate = dayjs(data.deceased.deathDate);
  const funeralDate = dayjs(data.funeral.funeralDate);
  
  return (
    <section className="funeral-hero-section">
      <motion.div 
        className="funeral-hero-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="funeral-ribbon"></div>
        
        <motion.div 
          className="funeral-hero-content"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="funeral-icon">
            <Flower2 size={60} />
          </div>
          
          <h1 className="funeral-title">訃 告</h1>
          
          <div className="deceased-info">
            <h2 className="deceased-name">故 {data.deceased.name}</h2>
            <p className="deceased-dates">
              {dayjs(data.deceased.birthDate).format('YYYY년 M월 D일')} ~ 
              {' '}{deathDate.format('YYYY년 M월 D일')}
            </p>
            <p className="deceased-age">향년 {data.deceased.age}세</p>
          </div>
          
          <div className="funeral-schedule">
            <p className="schedule-item">
              <span className="schedule-label">발인</span>
              <span className="schedule-value">
                {funeralDate.format('YYYY년 M월 D일 (dd)')} {data.funeral.funeralTime}
              </span>
            </p>
            {data.funeral.burialLocation && (
              <p className="schedule-item">
                <span className="schedule-label">장지</span>
                <span className="schedule-value">{data.funeral.burialLocation}</span>
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
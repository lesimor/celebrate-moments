import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import type { FuneralEvent } from '../../types/event';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

interface FuneralInfoProps {
  data: FuneralEvent;
}

export function FuneralInfo({ data }: FuneralInfoProps) {
  const funeralDate = dayjs(data.funeral.funeralDate);
  const burialDate = data.funeral.burialDate ? dayjs(data.funeral.burialDate) : null;
  
  return (
    <section className="section-container funeral-info-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-header">
          <Calendar className="section-icon" />
          <h2 className="section-title">장례 일정</h2>
        </div>
        
        <div className="funeral-details">
          <div className="detail-card">
            <h3 className="detail-title">빈소</h3>
            <div className="detail-info">
              <p className="venue-name">{data.funeral.mortuary.name}</p>
              {data.funeral.mortuary.hall && (
                <p className="venue-hall">{data.funeral.mortuary.hall}</p>
              )}
              <p className="venue-address">{data.funeral.mortuary.address}</p>
              {data.funeral.mortuary.phone && (
                <p className="venue-phone">
                  <a href={`tel:${data.funeral.mortuary.phone}`}>
                    {data.funeral.mortuary.phone}
                  </a>
                </p>
              )}
            </div>
          </div>
          
          <div className="detail-card">
            <h3 className="detail-title">발인</h3>
            <div className="detail-info">
              <div className="datetime-row">
                <Calendar size={18} />
                <span>{funeralDate.format('YYYY년 M월 D일 (dddd)')}</span>
              </div>
              <div className="datetime-row">
                <Clock size={18} />
                <span>{data.funeral.funeralTime}</span>
              </div>
            </div>
          </div>
          
          {burialDate && data.funeral.burialLocation && (
            <div className="detail-card">
              <h3 className="detail-title">장지</h3>
              <div className="detail-info">
                <p className="burial-location">{data.funeral.burialLocation}</p>
                <div className="datetime-row">
                  <Calendar size={18} />
                  <span>{burialDate.format('YYYY년 M월 D일')}</span>
                </div>
                {data.funeral.burialTime && (
                  <div className="datetime-row">
                    <Clock size={18} />
                    <span>{data.funeral.burialTime}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
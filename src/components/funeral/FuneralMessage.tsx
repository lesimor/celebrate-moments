import { motion } from 'framer-motion';
import type { FuneralEvent } from '../../types/event';

interface FuneralMessageProps {
  data: FuneralEvent;
}

export function FuneralMessage({ data }: FuneralMessageProps) {
  return (
    <section className="section-container funeral-message-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-header">
          <h2 className="section-title">{data.message.title}</h2>
        </div>
        
        <div className="message-content">
          <p className="message-text">{data.message.content}</p>
        </div>
        
        <div className="mourners-info">
          <div className="chief-mourner">
            <span className="mourner-label">상주</span>
            <span className="mourner-name">{data.chiefMourner.name}</span>
            <span className="mourner-relation">({data.chiefMourner.relation})</span>
          </div>
          
          {data.mourners.length > 0 && (
            <div className="other-mourners">
              {data.mourners.map((mourner, index) => (
                <span key={index} className="mourner-item">
                  {mourner.name}({mourner.relation})
                  {index < data.mourners.length - 1 && ', '}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
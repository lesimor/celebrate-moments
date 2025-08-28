import { motion } from 'framer-motion'
import type { WeddingData } from '../types/wedding'
import { Heart } from 'lucide-react'

interface MessageProps {
  data: WeddingData
}

export const Message = ({ data }: MessageProps) => {
  return (
    <section className="message-section">
      <motion.div 
        className="section-container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-header">
          <Heart className="section-icon" />
          <h2 className="section-title">Invitation</h2>
        </div>
        
        <motion.div 
          className="message-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <p className="message-text">
            {data.message.content.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < data.message.content.split('\n').length - 1 && <br />}
              </span>
            ))}
          </p>
        </motion.div>
        
        <div className="parents-info">
          <div className="parents-group">
            <div className="parent-names">
              <span className="parent">{data.couple.groom.father}</span>
              <span className="separator">·</span>
              <span className="parent">{data.couple.groom.mother}</span>
              <span className="relation">의 {data.couple.groom.order}</span>
            </div>
            <span className="couple-name">{data.couple.groom.name}</span>
          </div>
          
          <div className="parents-group">
            <div className="parent-names">
              <span className="parent">{data.couple.bride.father}</span>
              <span className="separator">·</span>
              <span className="parent">{data.couple.bride.mother}</span>
              <span className="relation">의 {data.couple.bride.order}</span>
            </div>
            <span className="couple-name">{data.couple.bride.name}</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
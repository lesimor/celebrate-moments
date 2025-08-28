import { motion } from 'framer-motion'
import type { WeddingData } from '../types/wedding'
import dayjs from 'dayjs'
import { Calendar as CalendarIcon, Clock } from 'lucide-react'

interface CalendarProps {
  data: WeddingData
}

export const Calendar = ({ data }: CalendarProps) => {
  const weddingDate = dayjs(data.wedding.date)
  const year = weddingDate.year()
  const month = weddingDate.month()
  const date = weddingDate.date()
  const day = weddingDate.day()
  const dayNames = ['일', '월', '화', '수', '목', '금', '토']
  
  // 달력 생성
  const firstDay = dayjs(`${year}-${month + 1}-01`).day()
  const daysInMonth = weddingDate.daysInMonth()
  
  const calendarDays = []
  // 빈 칸 추가
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null)
  }
  // 날짜 추가
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i)
  }
  
  return (
    <section className="calendar-section">
      <motion.div 
        className="section-container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-header">
          <CalendarIcon className="section-icon" />
          <h2 className="section-title">Wedding Day</h2>
        </div>
        
        <div className="wedding-datetime">
          <div className="date-display">
            <span className="year">{year}</span>
            <span className="month">{month + 1}월</span>
            <span className="date">{date}일</span>
            <span className="day">{dayNames[day]}요일</span>
          </div>
          
          <div className="time-display">
            <Clock className="time-icon" />
            <span className="time">{data.wedding.time}</span>
          </div>
        </div>
        
        <div className="calendar-grid">
          <div className="calendar-header">
            {dayNames.map((name) => (
              <div key={name} className="calendar-day-name">
                {name}
              </div>
            ))}
          </div>
          
          <div className="calendar-body">
            {calendarDays.map((day, index) => (
              <div 
                key={index} 
                className={`calendar-day ${day === date ? 'wedding-day' : ''} ${day === null ? 'empty' : ''}`}
              >
                {day && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.01, duration: 0.3 }}
                  >
                    {day}
                  </motion.span>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
import { motion } from 'framer-motion'
import type { WeddingData } from '../types/wedding'
import { MapPin, Phone, Navigation } from 'lucide-react'

interface LocationProps {
  data: WeddingData
}

export const Location = ({ data }: LocationProps) => {
  const { venue } = data.wedding
  
  const handleNavigation = () => {
    if (venue.mapUrl) {
      window.open(venue.mapUrl, '_blank')
    }
  }
  
  const handleCall = () => {
    window.location.href = `tel:${venue.phone}`
  }
  
  return (
    <section className="location-section">
      <motion.div 
        className="section-container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-header">
          <MapPin className="section-icon" />
          <h2 className="section-title">Location</h2>
        </div>
        
        <div className="venue-info">
          <h3 className="venue-name">{venue.name}</h3>
          <p className="venue-hall">{venue.hall}</p>
          <p className="venue-address">{venue.address}</p>
        </div>
        
        <div className="location-actions">
          <motion.button
            className="action-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNavigation}
          >
            <Navigation className="button-icon" />
            <span>지도 보기</span>
          </motion.button>
          
          <motion.button
            className="action-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCall}
          >
            <Phone className="button-icon" />
            <span>전화하기</span>
          </motion.button>
        </div>
        
        <div className="map-container">
          {venue.coordinates && (
            <div className="map-placeholder">
              {/* 실제 프로젝트에서는 네이버맵 또는 카카오맵 API 사용 */}
              <div className="map-embed">
                <MapPin className="map-marker" />
                <p className="map-text">지도 영역</p>
                <p className="map-coords">
                  위도: {venue.coordinates.lat}<br />
                  경도: {venue.coordinates.lng}
                </p>
              </div>
            </div>
          )}
        </div>
        
        <div className="transport-info">
          <h4>오시는 길</h4>
          <div className="transport-item">
            <h5>🚇 지하철</h5>
            <p>2호선 강남역 3번 출구에서 도보 5분</p>
          </div>
          <div className="transport-item">
            <h5>🚌 버스</h5>
            <p>강남역 정류장 하차</p>
            <p>간선: 140, 144, 145</p>
          </div>
          <div className="transport-item">
            <h5>🚗 자가용</h5>
            <p>건물 내 주차장 2시간 무료</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
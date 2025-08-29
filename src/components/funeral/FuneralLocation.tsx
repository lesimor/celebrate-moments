import { motion } from 'framer-motion';
import { MapPin, Navigation, Phone } from 'lucide-react';
import type { FuneralEvent } from '../../types/event';

interface FuneralLocationProps {
  data: FuneralEvent;
}

export function FuneralLocation({ data }: FuneralLocationProps) {
  const handleMapClick = () => {
    if (data.funeral.mortuary.coordinates) {
      const { lat, lng } = data.funeral.mortuary.coordinates;
      window.open(`https://map.naver.com/v5/search/${encodeURIComponent(data.funeral.mortuary.name)}/@${lng},${lat},17z`);
    }
  };
  
  const handleCall = () => {
    if (data.funeral.mortuary.phone) {
      window.location.href = `tel:${data.funeral.mortuary.phone}`;
    }
  };
  
  return (
    <section className="section-container funeral-location-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-header">
          <MapPin className="section-icon" />
          <h2 className="section-title">오시는 길</h2>
        </div>
        
        <div className="venue-info">
          <h3 className="venue-name">{data.funeral.mortuary.name}</h3>
          {data.funeral.mortuary.hall && (
            <p className="venue-hall">{data.funeral.mortuary.hall}</p>
          )}
          <p className="venue-address">{data.funeral.mortuary.address}</p>
        </div>
        
        <div className="location-actions">
          <button className="action-button" onClick={handleMapClick}>
            <Navigation className="button-icon" />
            <span>지도 보기</span>
          </button>
          {data.funeral.mortuary.phone && (
            <button className="action-button" onClick={handleCall}>
              <Phone className="button-icon" />
              <span>전화하기</span>
            </button>
          )}
        </div>
        
        <div className="map-container">
          <div className="map-placeholder" onClick={handleMapClick}>
            <div className="map-embed">
              <MapPin className="map-marker" />
              <p className="map-text">지도를 보려면 클릭하세요</p>
              {data.funeral.mortuary.coordinates && (
                <p className="map-coords">
                  위도: {data.funeral.mortuary.coordinates.lat}<br />
                  경도: {data.funeral.mortuary.coordinates.lng}
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div className="transport-info">
          <h4>교통 안내</h4>
          <div className="transport-item">
            <h5>지하철</h5>
            <p>4호선 혜화역 3번 출구에서 도보 5분</p>
          </div>
          <div className="transport-item">
            <h5>버스</h5>
            <p>마을버스: 종로08<br />
               간선버스: 101, 102, 104, 106, 107</p>
          </div>
          <div className="transport-item">
            <h5>주차</h5>
            <p>병원 내 주차장 이용 가능 (유료)</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
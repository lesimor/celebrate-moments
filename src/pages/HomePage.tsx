import { motion } from 'framer-motion';
import { Heart, Flower2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

export function HomePage() {
  return (
    <div className="home-page">
      <motion.div 
        className="home-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="home-header">
          <motion.h1 
            className="home-title"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            마음전하기
          </motion.h1>
          <motion.p 
            className="home-subtitle"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            인생의 중요한 순간을 아름답고 편리하게 전달하세요
          </motion.p>
        </div>

        <div className="service-cards">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/wedding/new" className="service-card wedding-card">
              <div className="card-icon">
                <Heart size={48} />
              </div>
              <h2 className="card-title">청첩장</h2>
              <p className="card-description">
                사랑하는 두 사람의 결혼 소식을<br />
                아름답게 전달하세요
              </p>
              <ul className="card-features">
                <li>다양한 템플릿 제공</li>
                <li>갤러리 및 지도 연동</li>
                <li>참석 여부 확인</li>
                <li>축하 메시지 게시판</li>
              </ul>
              <button className="card-button">청첩장 만들기</button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/funeral/new" className="service-card funeral-card">
              <div className="card-icon">
                <Flower2 size={48} />
              </div>
              <h2 className="card-title">부고장</h2>
              <p className="card-description">
                故人을 추모하며<br />
                조문 안내를 정중히 전달하세요
              </p>
              <ul className="card-features">
                <li>격식있는 템플릿</li>
                <li>발인 일시 및 장소</li>
                <li>조문 안내</li>
                <li>추모 메시지</li>
              </ul>
              <button className="card-button">부고장 만들기</button>
            </Link>
          </motion.div>
        </div>

        <motion.div 
          className="home-features"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3>서비스 특징</h3>
          <div className="features-grid">
            <div className="feature-item">
              <span className="feature-emoji">⏱️</span>
              <h4>5분 완성</h4>
              <p>간편한 제작 과정</p>
            </div>
            <div className="feature-item">
              <span className="feature-emoji">📱</span>
              <h4>모바일 최적화</h4>
              <p>모든 기기에서 완벽 호환</p>
            </div>
            <div className="feature-item">
              <span className="feature-emoji">🔒</span>
              <h4>개인정보 보호</h4>
              <p>안전한 데이터 관리</p>
            </div>
            <div className="feature-item">
              <span className="feature-emoji">🎨</span>
              <h4>커스터마이징</h4>
              <p>나만의 디자인 가능</p>
            </div>
          </div>
        </motion.div>

        <div className="home-footer">
          <Link to="/login" className="login-link">로그인</Link>
          <span className="separator">|</span>
          <Link to="/my-events" className="my-events-link">내 초대장 관리</Link>
        </div>
      </motion.div>
    </div>
  );
}
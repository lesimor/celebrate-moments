import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Flower2, User, LogOut, Menu, X, Sparkles, Clock, Shield, Palette, Star, ChevronRight, ArrowUpRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/HomePageModern.css';

export function HomePageModern() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const { scrollY } = useScroll();
  
  // Parallax transforms
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const cardsY = useTransform(scrollY, [200, 700], [100, 0]);
  
  // Floating animation variants
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Testimonials data
  const testimonials = [
    { id: 1, name: "김민수", role: "신랑", text: "정말 간편하고 아름다운 청첩장을 만들 수 있었어요!", rating: 5 },
    { id: 2, name: "이서연", role: "신부", text: "친구들이 모두 청첩장이 예쁘다고 칭찬했어요.", rating: 5 },
    { id: 3, name: "박준호", role: "가족", text: "품격있는 부고장으로 마음을 전할 수 있었습니다.", rating: 5 }
  ];

  return (
    <div className="modern-home">
      {/* Navigation Header */}
      <motion.header 
        className="modern-nav"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <Sparkles className="logo-icon" />
            <span>마음전하기</span>
          </Link>
          
          <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/wedding/new" className="nav-link">청첩장</Link>
            <Link to="/funeral/new" className="nav-link">부고장</Link>
            <Link to="#features" className="nav-link">특징</Link>
            <Link to="#testimonials" className="nav-link">후기</Link>
          </nav>

          <div className="nav-actions">
            {isAuthenticated ? (
              <>
                <Link to="/my-events" className="nav-button primary">
                  내 초대장
                </Link>
                <button onClick={logout} className="nav-button secondary">
                  로그아웃
                </button>
                <div className="user-avatar">
                  <User size={20} />
                  <span>{user?.name}</span>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-button secondary">로그인</Link>
                <Link to="/login" className="nav-button primary">시작하기</Link>
              </>
            )}
            
            <button 
              className="mobile-menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="hero-section">
        <motion.div 
          className="hero-background"
          style={{ y: heroY }}
        >
          <div className="gradient-orb orb-1" />
          <div className="gradient-orb orb-2" />
          <div className="gradient-orb orb-3" />
        </motion.div>

        <motion.div 
          className="hero-content"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="hero-badge"
          >
            <Sparkles size={16} />
            <span>5분 만에 완성하는 특별한 초대</span>
          </motion.div>

          <motion.h1 
            className="hero-title"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            인생의 소중한 순간을
            <br />
            <span className="gradient-text">아름답게 전하세요</span>
          </motion.h1>

          <motion.p 
            className="hero-subtitle"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            모던하고 세련된 디자인의 청첩장과 부고장을
            <br />
            누구나 쉽고 빠르게 만들 수 있습니다
          </motion.p>

          <motion.div 
            className="hero-actions"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link to="/wedding/new" className="hero-btn primary">
              <Heart size={20} />
              청첩장 만들기
              <ArrowUpRight size={16} />
            </Link>
            <Link to="/funeral/new" className="hero-btn secondary">
              <Flower2 size={20} />
              부고장 만들기
              <ChevronRight size={16} />
            </Link>
          </motion.div>

          <motion.div 
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="stat-item">
              <span className="stat-number">10,000+</span>
              <span className="stat-label">만족한 고객</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">템플릿</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4.9</span>
              <span className="stat-label">평균 평점</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          animate={floatingAnimation}
        >
          <div className="floating-cards">
            <motion.div 
              className="preview-card wedding-preview"
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <Heart className="preview-icon" />
            </motion.div>
            <motion.div 
              className="preview-card funeral-preview"
              whileHover={{ scale: 1.05, rotate: -2 }}
            >
              <Flower2 className="preview-icon" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Service Cards Section */}
      <motion.section 
        className="services-section"
        style={{ y: cardsY }}
      >
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">선택하신 서비스</h2>
            <p className="section-subtitle">필요한 초대장을 선택하고 간편하게 제작하세요</p>
          </motion.div>

          <div className="modern-service-cards">
            <motion.div
              className={`modern-service-card wedding ${activeCard === 'wedding' ? 'active' : ''}`}
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onMouseEnter={() => setActiveCard('wedding')}
              onMouseLeave={() => setActiveCard(null)}
              whileHover={{ y: -10 }}
            >
              <div className="card-glow wedding-glow" />
              <div className="card-content">
                <div className="card-header">
                  <div className="card-icon-wrapper">
                    <Heart className="card-icon" />
                  </div>
                  <div className="card-badge">POPULAR</div>
                </div>
                
                <h3 className="card-title">청첩장</h3>
                <p className="card-description">
                  두 사람의 특별한 날을 
                  감동적으로 전하세요
                </p>

                <ul className="modern-features">
                  <li>
                    <CheckCircle size={16} />
                    <span>프리미엄 템플릿 50종</span>
                  </li>
                  <li>
                    <CheckCircle size={16} />
                    <span>갤러리 & 동영상 지원</span>
                  </li>
                  <li>
                    <CheckCircle size={16} />
                    <span>실시간 참석 확인</span>
                  </li>
                  <li>
                    <CheckCircle size={16} />
                    <span>축하 메시지 게시판</span>
                  </li>
                </ul>

                <Link to="/wedding/new" className="modern-card-btn">
                  <span>청첩장 만들기</span>
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </motion.div>

            <motion.div
              className={`modern-service-card funeral ${activeCard === 'funeral' ? 'active' : ''}`}
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onMouseEnter={() => setActiveCard('funeral')}
              onMouseLeave={() => setActiveCard(null)}
              whileHover={{ y: -10 }}
            >
              <div className="card-glow funeral-glow" />
              <div className="card-content">
                <div className="card-header">
                  <div className="card-icon-wrapper">
                    <Flower2 className="card-icon" />
                  </div>
                  <div className="card-badge">PREMIUM</div>
                </div>
                
                <h3 className="card-title">부고장</h3>
                <p className="card-description">
                  고인을 추모하며
                  정중하게 알려드립니다
                </p>

                <ul className="modern-features">
                  <li>
                    <CheckCircle size={16} />
                    <span>격식있는 템플릿</span>
                  </li>
                  <li>
                    <CheckCircle size={16} />
                    <span>장례식장 위치 안내</span>
                  </li>
                  <li>
                    <CheckCircle size={16} />
                    <span>조문 예절 안내</span>
                  </li>
                  <li>
                    <CheckCircle size={16} />
                    <span>추모 메시지 기능</span>
                  </li>
                </ul>

                <Link to="/funeral/new" className="modern-card-btn">
                  <span>부고장 만들기</span>
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="modern-features-section" id="features">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">왜 마음전하기인가요?</h2>
            <p className="section-subtitle">특별한 순간을 더욱 특별하게 만드는 이유</p>
          </motion.div>

          <div className="features-bento">
            <motion.div 
              className="bento-item large"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="bento-icon">
                <Clock />
              </div>
              <h4>5분 완성</h4>
              <p>템플릿 선택부터 발송까지 단 5분이면 충분합니다</p>
              <div className="bento-decoration" />
            </motion.div>

            <motion.div 
              className="bento-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="bento-icon">
                <Shield />
              </div>
              <h4>안전한 보안</h4>
              <p>개인정보는 철저히 보호됩니다</p>
            </motion.div>

            <motion.div 
              className="bento-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="bento-icon">
                <Palette />
              </div>
              <h4>맞춤 디자인</h4>
              <p>나만의 스타일로 커스터마이징</p>
            </motion.div>

            <motion.div 
              className="bento-item wide"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="bento-content">
                <div className="bento-icon">
                  <Sparkles />
                </div>
                <div>
                  <h4>프리미엄 퀄리티</h4>
                  <p>전문 디자이너가 만든 고품질 템플릿으로 품격있는 초대장을 만드세요</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" id="testimonials">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">고객님들의 이야기</h2>
            <p className="section-subtitle">실제 사용하신 분들의 생생한 후기</p>
          </motion.div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="testimonial-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="testimonial-stars">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="star-filled" />
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <User size={20} />
                  </div>
                  <div>
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-role">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <motion.div 
          className="cta-container"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="cta-title">지금 시작하세요</h2>
          <p className="cta-subtitle">
            특별한 날을 더욱 특별하게 만들어드립니다
          </p>
          <Link to="/login" className="cta-button">
            무료로 시작하기
            <ArrowUpRight size={20} />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="modern-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="footer-logo">
              <Sparkles size={24} />
              <span>마음전하기</span>
            </div>
            <p>인생의 소중한 순간을 아름답게</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>서비스</h4>
              <Link to="/wedding/new">청첩장</Link>
              <Link to="/funeral/new">부고장</Link>
            </div>
            <div className="footer-column">
              <h4>고객지원</h4>
              <Link to="/help">도움말</Link>
              <Link to="/contact">문의하기</Link>
            </div>
            <div className="footer-column">
              <h4>회사</h4>
              <Link to="/about">소개</Link>
              <Link to="/privacy">개인정보처리방침</Link>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 마음전하기. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
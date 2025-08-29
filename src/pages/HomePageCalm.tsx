import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle,
  Users,
  Calendar,
  Shield,
  Award,
  Globe,
  Heart,
  Sparkles,
  Star,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/HomePageCalm.css';

export function HomePageCalm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="calm-homepage">
      {/* Navigation */}
      <motion.nav 
        className={`navbar ${scrollY > 50 ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="nav-container">
          <div className="nav-brand">
            <span className="brand-text">마음전하기</span>
          </div>
          
          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <a href="#features" onClick={() => setIsMenuOpen(false)}>기능</a>
            <a href="#templates" onClick={() => setIsMenuOpen(false)}>템플릿</a>
            <a href="#pricing" onClick={() => setIsMenuOpen(false)}>요금</a>
            <a href="#testimonials" onClick={() => setIsMenuOpen(false)}>후기</a>
          </div>

          <div className="nav-actions">
            {user ? (
              <>
                <button 
                  className="nav-btn secondary"
                  onClick={() => navigate('/my-events')}
                >
                  내 초대장
                </button>
                <span className="user-name">{user.name}님</span>
              </>
            ) : (
              <>
                <button 
                  className="nav-btn ghost"
                  onClick={() => navigate('/login')}
                >
                  로그인
                </button>
                <button 
                  className="nav-btn primary"
                  onClick={() => navigate('/login')}
                >
                  시작하기
                </button>
              </>
            )}
          </div>

          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="gradient-orb orb-1" />
          <div className="gradient-orb orb-2" />
        </div>

        <motion.div 
          className="hero-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            소중한 순간을<br />
            <span className="text-gradient">아름답게</span> 전달하세요
          </motion.h1>

          <motion.p 
            className="hero-subtitle"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            결혼식과 장례식, 인생의 중요한 순간을 위한<br />
            프리미엄 디지털 초대장 서비스
          </motion.p>

          <motion.div 
            className="hero-actions"
            {...fadeInUp}
            transition={{ delay: 0.4 }}
          >
            <button 
              className="btn-hero primary"
              onClick={() => navigate('/login')}
            >
              무료로 시작하기
              <ArrowRight size={20} />
            </button>
            <button className="btn-hero secondary">
              템플릿 둘러보기
            </button>
          </motion.div>

          <motion.div 
            className="hero-stats"
            {...fadeInUp}
            transition={{ delay: 0.6 }}
          >
            <div className="stat-item">
              <span className="stat-number">50,000+</span>
              <span className="stat-label">누적 사용자</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">98%</span>
              <span className="stat-label">만족도</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">고객 지원</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">왜 마음전하기인가요?</h2>
            <p className="section-subtitle">
              디지털 시대에 맞는 스마트한 초대장 솔루션
            </p>
          </motion.div>

          <motion.div 
            className="features-grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div className="feature-card" variants={fadeInUp}>
              <div className="feature-icon">
                <Globe size={32} />
              </div>
              <h3>간편한 공유</h3>
              <p>카카오톡, 문자, SNS 등 다양한 채널로 한 번에 전달할 수 있습니다.</p>
            </motion.div>

            <motion.div className="feature-card" variants={fadeInUp}>
              <div className="feature-icon">
                <Shield size={32} />
              </div>
              <h3>개인정보 보호</h3>
              <p>안전한 서버와 암호화 기술로 소중한 정보를 보호합니다.</p>
            </motion.div>

            <motion.div className="feature-card" variants={fadeInUp}>
              <div className="feature-icon">
                <Sparkles size={32} />
              </div>
              <h3>세련된 디자인</h3>
              <p>전문 디자이너가 제작한 고품질 템플릿을 제공합니다.</p>
            </motion.div>

            <motion.div className="feature-card" variants={fadeInUp}>
              <div className="feature-icon">
                <Users size={32} />
              </div>
              <h3>참석 관리</h3>
              <p>실시간으로 참석 여부를 확인하고 관리할 수 있습니다.</p>
            </motion.div>

            <motion.div className="feature-card" variants={fadeInUp}>
              <div className="feature-icon">
                <Calendar size={32} />
              </div>
              <h3>일정 알림</h3>
              <p>캘린더 연동으로 중요한 일정을 놓치지 않도록 도와드립니다.</p>
            </motion.div>

            <motion.div className="feature-card" variants={fadeInUp}>
              <div className="feature-icon">
                <Award size={32} />
              </div>
              <h3>프리미엄 지원</h3>
              <p>전문 상담사가 초대장 제작을 도와드립니다.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="templates-section">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">다양한 템플릿</h2>
            <p className="section-subtitle">
              상황과 취향에 맞는 템플릿을 선택하세요
            </p>
          </motion.div>

          <div className="template-categories">
            <motion.div 
              className="category-card wedding"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="category-image">
                <div className="category-overlay">
                  <h3>결혼식 초대장</h3>
                  <p>30개 템플릿</p>
                  <button className="btn-explore">
                    둘러보기
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="category-card funeral"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="category-image">
                <div className="category-overlay">
                  <h3>부고 알림장</h3>
                  <p>26개 템플릿</p>
                  <button className="btn-explore">
                    둘러보기
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="template-features">
            <div className="template-feature">
              <CheckCircle size={20} />
              <span>모바일 최적화</span>
            </div>
            <div className="template-feature">
              <CheckCircle size={20} />
              <span>실시간 미리보기</span>
            </div>
            <div className="template-feature">
              <CheckCircle size={20} />
              <span>커스터마이징 가능</span>
            </div>
            <div className="template-feature">
              <CheckCircle size={20} />
              <span>다국어 지원</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing-section">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">합리적인 가격</h2>
            <p className="section-subtitle">
              필요에 맞는 플랜을 선택하세요
            </p>
          </motion.div>

          <div className="plan-toggle">
            <button 
              className={`toggle-btn ${selectedPlan === 'monthly' ? 'active' : ''}`}
              onClick={() => setSelectedPlan('monthly')}
            >
              월간
            </button>
            <button 
              className={`toggle-btn ${selectedPlan === 'yearly' ? 'active' : ''}`}
              onClick={() => setSelectedPlan('yearly')}
            >
              연간
              <span className="discount-badge">20% 할인</span>
            </button>
          </div>

          <div className="pricing-grid">
            <motion.div 
              className="pricing-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="plan-header">
                <h3>무료</h3>
                <div className="price">
                  <span className="amount">₩0</span>
                  <span className="period">/ 월</span>
                </div>
              </div>
              <ul className="plan-features">
                <li>
                  <CheckCircle size={16} />
                  기본 템플릿 5개
                </li>
                <li>
                  <CheckCircle size={16} />
                  초대장 1개 생성
                </li>
                <li>
                  <CheckCircle size={16} />
                  기본 커스터마이징
                </li>
                <li>
                  <CheckCircle size={16} />
                  이메일 지원
                </li>
              </ul>
              <button className="plan-btn secondary">
                무료로 시작
              </button>
            </motion.div>

            <motion.div 
              className="pricing-card featured"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="popular-badge">인기</div>
              <div className="plan-header">
                <h3>프리미엄</h3>
                <div className="price">
                  <span className="amount">
                    {selectedPlan === 'monthly' ? '₩29,000' : '₩278,400'}
                  </span>
                  <span className="period">
                    / {selectedPlan === 'monthly' ? '월' : '년'}
                  </span>
                </div>
              </div>
              <ul className="plan-features">
                <li>
                  <CheckCircle size={16} />
                  모든 템플릿 이용
                </li>
                <li>
                  <CheckCircle size={16} />
                  무제한 초대장 생성
                </li>
                <li>
                  <CheckCircle size={16} />
                  고급 커스터마이징
                </li>
                <li>
                  <CheckCircle size={16} />
                  참석자 관리 시스템
                </li>
                <li>
                  <CheckCircle size={16} />
                  통계 및 분석
                </li>
                <li>
                  <CheckCircle size={16} />
                  우선 고객 지원
                </li>
              </ul>
              <button className="plan-btn primary">
                프리미엄 시작
              </button>
            </motion.div>

            <motion.div 
              className="pricing-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="plan-header">
                <h3>기업</h3>
                <div className="price">
                  <span className="amount">맞춤 견적</span>
                </div>
              </div>
              <ul className="plan-features">
                <li>
                  <CheckCircle size={16} />
                  모든 프리미엄 기능
                </li>
                <li>
                  <CheckCircle size={16} />
                  맞춤형 템플릿 제작
                </li>
                <li>
                  <CheckCircle size={16} />
                  API 연동
                </li>
                <li>
                  <CheckCircle size={16} />
                  전담 매니저
                </li>
                <li>
                  <CheckCircle size={16} />
                  SLA 보장
                </li>
                <li>
                  <CheckCircle size={16} />
                  온사이트 교육
                </li>
              </ul>
              <button className="plan-btn secondary">
                문의하기
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">고객 후기</h2>
            <p className="section-subtitle">
              실제 사용자들의 생생한 경험
            </p>
          </motion.div>

          <div className="testimonials-grid">
            <motion.div 
              className="testimonial-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="stars">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p className="testimonial-text">
                "결혼 준비로 바쁜 와중에 초대장을 간편하게 만들 수 있어서 정말 좋았습니다. 
                하객분들도 모바일로 편하게 확인할 수 있다고 칭찬해주셨어요."
              </p>
              <div className="testimonial-author">
                <span className="author-name">김지현</span>
                <span className="author-role">2024년 결혼</span>
              </div>
            </motion.div>

            <motion.div 
              className="testimonial-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="stars">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p className="testimonial-text">
                "급작스러운 상황에서 부고를 알려야 했는데, 깔끔하고 정중한 디자인으로 
                예를 갖춰 전달할 수 있었습니다. 감사합니다."
              </p>
              <div className="testimonial-author">
                <span className="author-name">박성준</span>
                <span className="author-role">부고 알림 사용</span>
              </div>
            </motion.div>

            <motion.div 
              className="testimonial-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="stars">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p className="testimonial-text">
                "참석 여부를 실시간으로 확인할 수 있어서 예식 준비가 훨씬 수월했습니다. 
                디자인도 고급스럽고 만족스러워요."
              </p>
              <div className="testimonial-author">
                <span className="author-name">이수민</span>
                <span className="author-role">2024년 결혼</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <motion.div 
          className="cta-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="cta-title">
            지금 시작하세요
          </h2>
          <p className="cta-subtitle">
            소중한 순간을 아름답게 전달하는 가장 쉬운 방법
          </p>
          <div className="cta-actions">
            <button 
              className="btn-cta primary"
              onClick={() => navigate('/login')}
            >
              무료로 시작하기
              <ArrowRight size={20} />
            </button>
            <button className="btn-cta secondary">
              문의하기
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-column">
              <h4>마음전하기</h4>
              <p className="footer-description">
                인생의 소중한 순간을 아름답게 전달하는<br />
                프리미엄 디지털 초대장 서비스
              </p>
              <div className="footer-social">
                <Heart size={20} />
              </div>
            </div>

            <div className="footer-column">
              <h5>서비스</h5>
              <ul>
                <li><a href="#">결혼식 초대장</a></li>
                <li><a href="#">부고 알림장</a></li>
                <li><a href="#">템플릿 갤러리</a></li>
                <li><a href="#">요금제</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h5>지원</h5>
              <ul>
                <li><a href="#">도움말 센터</a></li>
                <li><a href="#">사용 가이드</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">문의하기</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h5>회사</h5>
              <ul>
                <li><a href="#">회사 소개</a></li>
                <li><a href="#">이용약관</a></li>
                <li><a href="#">개인정보처리방침</a></li>
                <li><a href="#">제휴 문의</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 마음전하기. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
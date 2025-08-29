import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Heart, Flower2, User, Menu, X, Sparkles, Palette, 
  Star, ChevronRight, ArrowUpRight, CheckCircle, MapPin, Users,
  BarChart3, Gift, Smartphone, Crown, Lock, Eye, Zap, Award, Sun,
  Coffee, Rainbow
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/HomePageBright.css';

export function HomePageBright() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const { scrollY } = useScroll();
  
  // Parallax transforms for bright design
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);
  
  // Bouncy animation for bright design
  const bounceAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut" as any
    }
  };

  // Statistics data with bright icons
  const stats = [
    { number: "15,000+", label: "행복한 고객", icon: Users, color: "text-rose-500" },
    { number: "56+", label: "아름다운 템플릿", icon: Palette, color: "text-amber-500" },
    { number: "4.9", label: "완벽한 평점", icon: Star, color: "text-yellow-500" },
    { number: "99%", label: "만족도", icon: Award, color: "text-emerald-500" }
  ];

  // Bright testimonials
  const testimonials = [
    { 
      id: 1, 
      name: "김민수 & 박지연", 
      role: "💕 신랑신부", 
      text: "정말 예쁘고 쉽게 만들 수 있어서 너무 만족해요! 친구들이 모두 부러워했답니다 ✨", 
      rating: 5,
      template: "🌸 봄 벚꽃 테마",
      gradient: "from-pink-400 to-rose-400"
    },
    { 
      id: 2, 
      name: "이서연", 
      role: "👰 신부", 
      text: "미니멀하고 깔끔한 디자인이 정말 마음에 들어요! 모바일에서도 완벽해요 💖", 
      rating: 5,
      template: "☁️ 구름 미니멀",
      gradient: "from-blue-400 to-cyan-400"
    },
    { 
      id: 3, 
      name: "박준호", 
      role: "👨‍👩‍👧‍👦 가족", 
      text: "품격있고 따뜻한 부고장을 빠르게 만들 수 있어서 정말 도움이 되었습니다 🙏", 
      rating: 5,
      template: "🕊️ 평안한 추모",
      gradient: "from-indigo-400 to-purple-400"
    }
  ];

  // Bright template categories
  const templateCategories = [
    { 
      name: "계절별 테마", 
      description: "봄의 벚꽃, 여름의 바다, 가을의 단풍, 겨울의 눈꽃",
      icon: Rainbow,
      count: "16종",
      gradient: "from-pink-400 via-yellow-400 to-green-400"
    },
    { 
      name: "감성 컨셉", 
      description: "로맨틱, 모던, 빈티지, 보태니컬 스타일",
      icon: Coffee,
      count: "20종",
      gradient: "from-amber-400 to-orange-400"
    },
    { 
      name: "종교별 맞춤", 
      description: "불교, 기독교, 천주교의 신성한 디자인",
      icon: Sun,
      count: "12종",
      gradient: "from-blue-400 to-indigo-400"
    },
    { 
      name: "문화 융합", 
      description: "한국 전통미와 현대적 감각의 조화",
      icon: Gift,
      count: "18종",
      gradient: "from-purple-400 to-pink-400"
    }
  ];

  // Bright features
  const features = [
    {
      title: "⚡ 5분 완성",
      description: "직관적인 인터페이스로 누구나 쉽게!",
      icon: Zap,
      color: "from-yellow-400 to-orange-400",
      bgColor: "bg-yellow-50"
    },
    {
      title: "👁️ 실시간 미리보기",
      description: "수정하는 순간 바로바로 확인",
      icon: Eye,
      color: "from-green-400 to-emerald-400",
      bgColor: "bg-green-50"
    },
    {
      title: "📱 모바일 친화적",
      description: "스마트폰으로도 완벽하게 제작",
      icon: Smartphone,
      color: "from-blue-400 to-cyan-400",
      bgColor: "bg-blue-50"
    },
    {
      title: "📊 실시간 통계",
      description: "방문자와 참석 현황을 한눈에",
      icon: BarChart3,
      color: "from-purple-400 to-pink-400",
      bgColor: "bg-purple-50"
    },
    {
      title: "📍 스마트 지도",
      description: "네이버·카카오맵 자동 연결",
      icon: MapPin,
      color: "from-red-400 to-rose-400",
      bgColor: "bg-red-50"
    },
    {
      title: "🔐 안전 보장",
      description: "개인정보 완벽 보호 시스템",
      icon: Lock,
      color: "from-indigo-400 to-purple-400",
      bgColor: "bg-indigo-50"
    }
  ];

  return (
    <div className="bright-home">
      {/* Navigation Header */}
      <motion.header 
        className="bright-nav"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
      >
        <div className="nav-container">
          <Link to="/" className="bright-nav-logo">
            <Sparkles className="logo-icon animate-pulse" />
            <span className="logo-text">마음전하기</span>
            <div className="logo-sparkle">✨</div>
          </Link>
          
          <nav className={`bright-nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link to="#templates" className="bright-nav-link">🎨 템플릿</Link>
            <Link to="#features" className="bright-nav-link">⚡ 기능</Link>
            <Link to="#pricing" className="bright-nav-link">💎 요금제</Link>
            <Link to="#testimonials" className="bright-nav-link">⭐ 후기</Link>
          </nav>

          <div className="bright-nav-actions">
            {isAuthenticated ? (
              <>
                <Link to="/my-events" className="bright-btn primary">
                  💝 내 초대장
                </Link>
                <div className="bright-user-badge">
                  <User size={18} />
                  <span>{user?.name}님</span>
                  <span className="user-emoji">😊</span>
                </div>
                <button onClick={logout} className="bright-btn secondary">
                  👋 로그아웃
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="bright-btn secondary">🔐 로그인</Link>
                <Link to="/login" className="bright-btn primary">🚀 무료 시작</Link>
              </>
            )}
            
            <button 
              className="mobile-menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="메뉴 토글"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="bright-hero">
        <div className="bright-hero-bg">
          <div className="floating-shape shape-1">🌸</div>
          <div className="floating-shape shape-2">💖</div>
          <div className="floating-shape shape-3">✨</div>
          <div className="floating-shape shape-4">🌟</div>
          <div className="floating-shape shape-5">💫</div>
          <div className="floating-shape shape-6">🦋</div>
        </div>

        <motion.div 
          className="bright-hero-content"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="bright-hero-badge"
          >
            <Crown size={20} className="text-yellow-500" />
            <span>🇰🇷 한국 1위 디지털 초대장 플랫폼</span>
            <div className="badge-glow"></div>
          </motion.div>

          <motion.h1 
            className="bright-hero-title"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            소중한 순간을 💝
            <br />
            <span className="bright-gradient-text">더욱 아름답게</span> ✨
          </motion.h1>

          <motion.p 
            className="bright-hero-subtitle"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            🌸 한국의 따뜻한 정서를 담은 전문 템플릿으로 <br />
            <strong>단 5분만에 완성하는 특별한 초대장</strong> 🎉
          </motion.p>

          <motion.div 
            className="bright-hero-actions"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Link to="/wedding/new" className="bright-hero-btn primary">
              <Heart size={22} />
              💒 청첩장 만들기
              <ArrowUpRight size={18} />
            </Link>
            <Link to="/funeral/new" className="bright-hero-btn secondary">
              <Flower2 size={22} />
              🕊️부고장 만들기
              <ChevronRight size={18} />
            </Link>
          </motion.div>

          <motion.div 
            className="bright-hero-stats"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div 
                  key={index}
                  className="bright-stat-card"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", bounce: 0.4 }}
                >
                  <div className={`stat-icon-wrapper ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                  <div className="stat-content">
                    <span className="stat-number">{stat.number}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                  <div className="stat-sparkle">✨</div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div 
          className="bright-hero-visual"
          animate={bounceAnimation}
        >
          <div className="bright-preview-cards">
            <motion.div 
              className="bright-preview-card wedding"
              whileHover={{ scale: 1.05, rotate: 3 }}
            >
              <div className="preview-gradient bg-gradient-to-br from-pink-200 to-rose-200"></div>
              <Heart className="preview-icon text-rose-500" size={32} />
              <div className="preview-label">💒 청첩장</div>
              <div className="preview-emoji">💖</div>
            </motion.div>
            <motion.div 
              className="bright-preview-card funeral"
              whileHover={{ scale: 1.05, rotate: -3 }}
            >
              <div className="preview-gradient bg-gradient-to-br from-blue-200 to-indigo-200"></div>
              <Flower2 className="preview-icon text-indigo-500" size={32} />
              <div className="preview-label">🕊️ 부고장</div>
              <div className="preview-emoji">🤍</div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Templates Section */}
      <section className="bright-templates-section" id="templates">
        <div className="bright-container">
          <motion.div 
            className="bright-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="bright-section-title">🎨 다양한 템플릿</h2>
            <p className="bright-section-subtitle">
              ✨ 상황과 취향에 딱 맞는 전문 디자이너 제작 템플릿 <br />
              총 <strong className="text-gradient">66종의 프리미엄 템플릿</strong> 보유 🏆
            </p>
          </motion.div>

          <div className="bright-template-grid">
            {templateCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={index}
                  className="bright-template-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className={`template-card-bg bg-gradient-to-br ${category.gradient} opacity-10`}></div>
                  <div className={`template-icon-wrapper bg-gradient-to-br ${category.gradient}`}>
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="template-card-title">{category.name}</h3>
                  <p className="template-card-description">{category.description}</p>
                  <div className={`template-count bg-gradient-to-r ${category.gradient} text-white`}>
                    {category.count}
                  </div>
                  <div className="template-sparkle">⭐</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Cards Section */}
      <section className="bright-services">
        <div className="bright-container">
          <motion.div 
            className="bright-section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="bright-section-title">💝 서비스 선택</h2>
            <p className="bright-section-subtitle">
              🌈 인생의 소중한 순간을 위한 맞춤 서비스
            </p>
          </motion.div>

          <div className="bright-service-cards">
            <motion.div
              className={`bright-service-card wedding ${activeCard === 'wedding' ? 'active' : ''}`}
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setActiveCard('wedding')}
              onMouseLeave={() => setActiveCard(null)}
              whileHover={{ y: -12, scale: 1.02 }}
            >
              <div className="service-card-glow glow-wedding"></div>
              <div className="service-card-content">
                <div className="service-header">
                  <div className="service-icon-wrapper bg-gradient-to-br from-pink-400 to-rose-400">
                    <Heart className="text-white" size={32} />
                  </div>
                  <div className="service-badge popular">🔥 인기</div>
                  <div className="service-emoji">💕</div>
                </div>
                
                <h3 className="service-title">청첩장</h3>
                <p className="service-description">
                  💑 20-30대 신혼부부를 위한
                  <br />📱 모바일 최적화된 청첩장
                </p>

                <ul className="bright-service-features">
                  <li><CheckCircle size={16} className="text-emerald-500" /><span>👫 양가 부모님 정보</span></li>
                  <li><CheckCircle size={16} className="text-emerald-500" /><span>📸 웨딩 갤러리 & 영상</span></li>
                  <li><CheckCircle size={16} className="text-emerald-500" /><span>✅ 실시간 참석 확인</span></li>
                  <li><CheckCircle size={16} className="text-emerald-500" /><span>💬 축하 메시지 게시판</span></li>
                  <li><CheckCircle size={16} className="text-emerald-500" /><span>💰 계좌번호 안내</span></li>
                </ul>

                <Link to="/wedding/new" className="bright-service-btn">
                  <span>💒 청첩장 만들기</span>
                  <ArrowUpRight size={18} />
                  <div className="btn-sparkle">✨</div>
                </Link>
              </div>
            </motion.div>

            <motion.div
              className={`bright-service-card funeral ${activeCard === 'funeral' ? 'active' : ''}`}
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setActiveCard('funeral')}
              onMouseLeave={() => setActiveCard(null)}
              whileHover={{ y: -12, scale: 1.02 }}
            >
              <div className="service-card-glow glow-funeral"></div>
              <div className="service-card-content">
                <div className="service-header">
                  <div className="service-icon-wrapper bg-gradient-to-br from-indigo-400 to-purple-400">
                    <Flower2 className="text-white" size={32} />
                  </div>
                  <div className="service-badge premium">💎 프리미엄</div>
                  <div className="service-emoji">🤍</div>
                </div>
                
                <h3 className="service-title">부고장</h3>
                <p className="service-description">
                  👨‍👩‍👧‍👦 40-60대 가족을 위한
                  <br />🕊️ 품격있고 정중한 부고장
                </p>

                <ul className="bright-service-features">
                  <li><CheckCircle size={16} className="text-emerald-500" /><span>👤 고인 & 상주 정보</span></li>
                  <li><CheckCircle size={16} className="text-emerald-500" /><span>⏰ 발인 일시 및 장소</span></li>
                  <li><CheckCircle size={16} className="text-emerald-500" /><span>🙏 조문 예절 안내</span></li>
                  <li><CheckCircle size={16} className="text-emerald-500" /><span>💐 추모 메시지</span></li>
                  <li><CheckCircle size={16} className="text-emerald-500" /><span>💳 부의금 계좌</span></li>
                </ul>

                <Link to="/funeral/new" className="bright-service-btn">
                  <span>🕊️ 부고장 만들기</span>
                  <ArrowUpRight size={18} />
                  <div className="btn-sparkle">✨</div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bright-features" id="features">
        <div className="bright-container">
          <motion.div 
            className="bright-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="bright-section-title">⚡ 스마트 기능</h2>
            <p className="bright-section-subtitle">
              🚀 전문가 수준의 기능을 누구나 쉽게!
            </p>
          </motion.div>

          <div className="bright-features-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  key={index}
                  className={`bright-feature-card ${feature.bgColor}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                >
                  <div className={`feature-icon-bg bg-gradient-to-br ${feature.color}`}>
                    <Icon size={28} className="text-white" />
                  </div>
                  <h4 className="feature-title">{feature.title}</h4>
                  <p className="feature-description">{feature.description}</p>
                  <div className="feature-shine"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bright Testimonials */}
      <section className="bright-testimonials" id="testimonials">
        <div className="bright-container">
          <motion.div 
            className="bright-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="bright-section-title">⭐ 고객 후기</h2>
            <p className="bright-section-subtitle">
              😊 실제 이용하신 분들의 따뜻한 경험담
            </p>
          </motion.div>

          <div className="bright-testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="bright-testimonial-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className={`testimonial-gradient bg-gradient-to-br ${testimonial.gradient} opacity-10`}></div>
                <div className="testimonial-template-tag">
                  <span className={`template-badge bg-gradient-to-r ${testimonial.gradient} text-white`}>
                    {testimonial.template}
                  </span>
                </div>
                <div className="testimonial-stars">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <div className={`author-avatar bg-gradient-to-br ${testimonial.gradient}`}>
                    <User size={20} className="text-white" />
                  </div>
                  <div className="author-info">
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-role">{testimonial.role}</div>
                  </div>
                </div>
                <div className="testimonial-sparkle">⭐</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bright CTA */}
      <section className="bright-cta">
        <div className="bright-cta-bg">
          <div className="cta-shape cta-shape-1">🌟</div>
          <div className="cta-shape cta-shape-2">💎</div>
          <div className="cta-shape cta-shape-3">✨</div>
        </div>
        <motion.div 
          className="bright-cta-content"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="cta-title">✨ 지금 시작하세요!</h2>
          <p className="cta-subtitle">
            🌈 특별한 날을 더욱 특별하게 만들어드립니다
            <br />
            <strong>월 1,000명이 선택하는 마음전하기</strong> 🏆
          </p>
          <div className="bright-cta-actions">
            <Link to="/login" className="bright-cta-btn primary">
              🚀 무료로 시작하기
              <ArrowUpRight size={20} />
            </Link>
            <Link to="#templates" className="bright-cta-btn secondary">
              👀 템플릿 구경하기
              <Eye size={20} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Bright Footer */}
      <footer className="bright-footer">
        <div className="bright-footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <Sparkles size={28} className="text-pink-500" />
              <span>마음전하기</span>
              <span className="logo-heart">💖</span>
            </div>
            <p>🌸 인생의 소중한 순간을 더욱 아름답게</p>
            <div className="footer-achievements">
              <span>🏆 고객 만족도 99%</span>
              <span>⭐ 평균 평점 4.9/5</span>
              <span>👥 행복한 고객 15,000+</span>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>🎨 서비스</h4>
              <Link to="/wedding/new">💒 청첩장</Link>
              <Link to="/funeral/new">🕊️ 부고장</Link>
              <Link to="#templates">📝 템플릿</Link>
            </div>
            <div className="footer-column">
              <h4>⚡ 기능</h4>
              <Link to="#features">🚀 스마트 기능</Link>
              <Link to="/my-events">📊 통계 분석</Link>
              <a href="#">📱 모바일 앱</a>
            </div>
            <div className="footer-column">
              <h4>💎 지원</h4>
              <a href="#">❓ 도움말</a>
              <a href="#">💌 문의하기</a>
              <a href="#">🛡️ 개인정보보호</a>
            </div>
          </div>
        </div>
        
        <div className="bright-footer-bottom">
          <p>&copy; 2025 마음전하기. Made with 💖</p>
          <p className="footer-tagline">✨ 한국의 따뜻한 정서를 담은 디지털 초대장 플랫폼</p>
        </div>
      </footer>
    </div>
  );
}
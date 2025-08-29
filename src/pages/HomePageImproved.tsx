import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Heart, Flower2, User, Menu, X, Sparkles, Palette, 
  Star, ChevronRight, ArrowUpRight, CheckCircle, Calendar, MapPin, Users,
  BarChart3, Gift, Smartphone, Crown,
  Lock, Eye, Zap, Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/HomePageImproved.css';

export function HomePageImproved() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium'>('premium');
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
      ease: "easeInOut" as any
    }
  };

  // Statistics data
  const stats = [
    { number: "15,000+", label: "만족한 고객", icon: Users },
    { number: "50+", label: "프리미엄 템플릿", icon: Palette },
    { number: "4.9", label: "평균 평점", icon: Star },
    { number: "99%", label: "고객 만족도", icon: Award }
  ];

  // Testimonials data with real cultural context
  const testimonials = [
    { 
      id: 1, 
      name: "김민수 & 박지연", 
      role: "신랑신부", 
      text: "5분 만에 완성된 청첩장이 이렇게 아름다울 줄 몰랐어요! 양가 어르신들도 모두 만족하셨습니다.", 
      rating: 5,
      template: "클래식 한국 전통"
    },
    { 
      id: 2, 
      name: "이서연", 
      role: "신부", 
      text: "미니멀한 디자인과 깔끔한 정보 구성이 정말 마음에 들었어요. 친구들 반응도 너무 좋았습니다.", 
      rating: 5,
      template: "모던 미니멀"
    },
    { 
      id: 3, 
      name: "박준호", 
      role: "상주", 
      text: "급하게 필요했던 부고장을 품격있게 만들 수 있었고, 문자 발송까지 한번에 해결됐습니다.", 
      rating: 5,
      template: "정중한 부고"
    }
  ];

  // Template categories
  const templateCategories = [
    { 
      name: "계절별 템플릿", 
      description: "봄, 여름, 가을, 겨울 시즌에 맞는 디자인",
      icon: Calendar,
      count: "12종"
    },
    { 
      name: "컨셉별 템플릿", 
      description: "클래식, 모던, 미니멀, 일러스트 스타일",
      icon: Palette,
      count: "20종"
    },
    { 
      name: "종교별 템플릿", 
      description: "불교, 기독교, 천주교 맞춤 디자인",
      icon: Heart,
      count: "9종"
    },
    { 
      name: "문화별 템플릿", 
      description: "한국 전통, 서양식, 퓨전 스타일",
      icon: Gift,
      count: "15종"
    }
  ];

  // Features data
  const features = [
    {
      title: "5분 완성",
      description: "간편한 3단계로 전문가급 초대장 완성",
      icon: Zap,
      color: "from-yellow-400 to-orange-500"
    },
    {
      title: "실시간 미리보기",
      description: "수정 즉시 결과 확인 가능",
      icon: Eye,
      color: "from-blue-400 to-cyan-500"
    },
    {
      title: "모바일 최적화",
      description: "언제 어디서나 스마트폰으로 제작",
      icon: Smartphone,
      color: "from-green-400 to-emerald-500"
    },
    {
      title: "방문자 통계",
      description: "실시간 조회수와 참석 응답 현황",
      icon: BarChart3,
      color: "from-purple-400 to-pink-500"
    },
    {
      title: "지도 연동",
      description: "네이버/카카오맵 자동 연결",
      icon: MapPin,
      color: "from-red-400 to-rose-500"
    },
    {
      title: "개인정보 보호",
      description: "비밀번호 설정 및 자동 삭제",
      icon: Lock,
      color: "from-indigo-400 to-blue-500"
    }
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
            <Link to="#templates" className="nav-link">템플릿</Link>
            <Link to="#features" className="nav-link">기능</Link>
            <Link to="#pricing" className="nav-link">요금제</Link>
            <Link to="#testimonials" className="nav-link">후기</Link>
          </nav>

          <div className="nav-actions">
            {isAuthenticated ? (
              <>
                <Link to="/my-events" className="nav-button primary">
                  내 초대장
                </Link>
                <div className="user-avatar">
                  <User size={20} />
                  <span>{user?.name}님</span>
                </div>
                <button onClick={logout} className="nav-button secondary">
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-button secondary">로그인</Link>
                <Link to="/login" className="nav-button primary">무료 시작</Link>
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
            <Crown size={16} />
            <span>한국 No.1 디지털 초대장 플랫폼</span>
          </motion.div>

          <motion.h1 
            className="hero-title"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            인생의 소중한 순간을
            <br />
            <span className="gradient-text">품격있게 전하세요</span>
          </motion.h1>

          <motion.p 
            className="hero-subtitle"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            한국의 예법과 문화를 담은 전문 템플릿으로
            <br />
            <strong>5분 만에 완성하는 특별한 초대장</strong>
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
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div 
                  key={index}
                  className="stat-item"
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon size={20} className="stat-icon" />
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              );
            })}
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
              <div className="preview-label">청첩장</div>
            </motion.div>
            <motion.div 
              className="preview-card funeral-preview"
              whileHover={{ scale: 1.05, rotate: -2 }}
            >
              <Flower2 className="preview-icon" />
              <div className="preview-label">부고장</div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Templates Section */}
      <section className="templates-section" id="templates">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">다양한 템플릿</h2>
            <p className="section-subtitle">
              상황과 취향에 맞는 전문 디자이너 제작 템플릿
              <br />총 <strong>56종의 프리미엄 템플릿</strong> 보유
            </p>
          </motion.div>

          <div className="template-categories">
            {templateCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={index}
                  className="template-category-card"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="category-icon">
                    <Icon size={32} />
                  </div>
                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-description">{category.description}</p>
                  <div className="category-count">{category.count}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
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
            <h2 className="section-title">서비스 선택</h2>
            <p className="section-subtitle">
              생애 중요한 순간을 위한 맞춤 서비스
            </p>
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
                  <div className="card-badge popular">인기</div>
                </div>
                
                <h3 className="card-title">청첩장</h3>
                <p className="card-description">
                  20-30대 신혼부부를 위한
                  <br />모바일 최적화된 청첩장
                </p>

                <ul className="modern-features">
                  <li>
                    <CheckCircle size={16} />
                    <span>양가 부모님 정보 입력</span>
                  </li>
                  <li>
                    <CheckCircle size={16} />
                    <span>웨딩 갤러리 & 동영상</span>
                  </li>
                  <li>
                    <CheckCircle size={16} />
                    <span>참석 여부 실시간 확인</span>
                  </li>
                  <li>
                    <CheckCircle size={16} />
                    <span>축하 메시지 게시판</span>
                  </li>
                  <li>
                    <CheckCircle size={16} />
                    <span>계좌번호 안내</span>
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
                  <div className="card-badge premium">프리미엄</div>
                </div>
                
                <h3 className="card-title">부고장</h3>
                <p className="card-description">
                  40-60대 가족을 위한
                  <br />격식있고 정중한 부고장
                </p>

                <ul className="modern-features">
                  <li>
                    <CheckCircle size={16} />
                    <span>고인 & 상주 정보</span>
                  </li>
                  <li>
                    <CheckCircle size={16} />
                    <span>발인 일시 및 장소</span>
                  </li>
                  <li>
                    <CheckCircle size={16} />
                    <span>조문 예절 안내</span>
                  </li>
                  <li>
                    <CheckCircle size={16} />
                    <span>추모 메시지 기능</span>
                  </li>
                  <li>
                    <CheckCircle size={16} />
                    <span>부의금 계좌 안내</span>
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

      {/* Features Grid */}
      <section className="modern-features-section" id="features">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">스마트 기능</h2>
            <p className="section-subtitle">
              전문가 수준의 기능을 누구나 쉽게
            </p>
          </motion.div>

          <div className="features-grid-modern">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  key={index}
                  className="feature-card-modern"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`feature-icon-wrapper bg-gradient-to-r ${feature.color}`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h4 className="feature-title">{feature.title}</h4>
                  <p className="feature-description">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section" id="pricing">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">요금제</h2>
            <p className="section-subtitle">
              필요에 맞는 플랜을 선택하세요
            </p>
            
            <div className="plan-toggle">
              <button 
                className={`toggle-btn ${selectedPlan === 'free' ? 'active' : ''}`}
                onClick={() => setSelectedPlan('free')}
              >
                무료
              </button>
              <button 
                className={`toggle-btn ${selectedPlan === 'premium' ? 'active' : ''}`}
                onClick={() => setSelectedPlan('premium')}
              >
                프리미엄
              </button>
            </div>
          </motion.div>

          <div className="pricing-cards">
            <motion.div 
              className={`pricing-card ${selectedPlan === 'free' ? 'active' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="pricing-header">
                <h3>무료 플랜</h3>
                <div className="price">
                  <span className="currency">₩</span>
                  <span className="amount">0</span>
                  <span className="period">/월</span>
                </div>
              </div>
              
              <ul className="pricing-features">
                <li><CheckCircle size={16} /> 기본 템플릿 5종</li>
                <li><CheckCircle size={16} /> 30일 호스팅</li>
                <li><CheckCircle size={16} /> 기본 기능</li>
                <li><CheckCircle size={16} /> 이메일 지원</li>
              </ul>
              
              <Link to="/login" className="pricing-btn secondary">
                무료로 시작
              </Link>
            </motion.div>

            <motion.div 
              className={`pricing-card premium ${selectedPlan === 'premium' ? 'active' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="popular-badge">추천</div>
              <div className="pricing-header">
                <h3>프리미엄 플랜</h3>
                <div className="price">
                  <span className="currency">₩</span>
                  <span className="amount">29,000</span>
                  <span className="period">/월</span>
                </div>
              </div>
              
              <ul className="pricing-features">
                <li><CheckCircle size={16} /> 모든 프리미엄 템플릿</li>
                <li><CheckCircle size={16} /> 1년 호스팅</li>
                <li><CheckCircle size={16} /> 무제한 수정</li>
                <li><CheckCircle size={16} /> 광고 제거</li>
                <li><CheckCircle size={16} /> 커스텀 도메인</li>
                <li><CheckCircle size={16} /> 우선 지원</li>
                <li><CheckCircle size={16} /> 문자 발송 (100건)</li>
                <li><CheckCircle size={16} /> 통계 분석</li>
              </ul>
              
              <Link to="/login" className="pricing-btn primary">
                프리미엄 시작
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cultural Values Section */}
      <section className="cultural-section">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">한국의 정서를 담다</h2>
            <p className="section-subtitle">
              전통과 현대를 아우르는 문화적 세심함
            </p>
          </motion.div>

          <div className="cultural-features">
            <motion.div 
              className="cultural-card"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="cultural-icon">📜</div>
              <h4>한국 예법 가이드</h4>
              <p>상황별 적절한 인사말과 격식에 맞는 문구를 제안해드립니다</p>
            </motion.div>

            <motion.div 
              className="cultural-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="cultural-icon">🙏</div>
              <h4>종교별 맞춤</h4>
              <p>불교, 기독교, 천주교 각 종교의 예식에 맞는 전용 템플릿</p>
            </motion.div>

            <motion.div 
              className="cultural-card"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="cultural-icon">🔒</div>
              <h4>개인정보 보호</h4>
              <p>비밀번호 설정, 열람 기간 제한, 자동 삭제로 개인정보를 안전하게</p>
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
            <h2 className="section-title">고객 후기</h2>
            <p className="section-subtitle">
              실제 이용하신 분들의 생생한 경험담
            </p>
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
                <div className="testimonial-template">
                  <span className="template-tag">{testimonial.template}</span>
                </div>
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
            <br />
            <strong>월 1,000명이 선택하는 마음전하기</strong>
          </p>
          <div className="cta-actions">
            <Link to="/login" className="cta-button primary">
              무료로 시작하기
              <ArrowUpRight size={20} />
            </Link>
            <Link to="#templates" className="cta-button secondary">
              템플릿 보기
              <Eye size={20} />
            </Link>
          </div>
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
            <p>인생의 소중한 순간을 품격있게</p>
            <div className="footer-stats">
              <span>🏆 고객 만족도 99%</span>
              <span>⭐ 평균 평점 4.9/5</span>
              <span>👥 누적 고객 15,000+</span>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>서비스</h4>
              <Link to="/wedding/new">청첩장</Link>
              <Link to="/funeral/new">부고장</Link>
              <Link to="#templates">템플릿</Link>
              <Link to="#pricing">요금제</Link>
            </div>
            <div className="footer-column">
              <h4>기능</h4>
              <Link to="#features">스마트 기능</Link>
              <Link to="/my-events">통계 분석</Link>
              <a href="#">문자 발송</a>
              <a href="#">지도 연동</a>
            </div>
            <div className="footer-column">
              <h4>고객지원</h4>
              <a href="#">도움말</a>
              <a href="#">문의하기</a>
              <a href="#">자주 묻는 질문</a>
              <a href="#">개인정보처리방침</a>
            </div>
            <div className="footer-column">
              <h4>회사</h4>
              <a href="#">소개</a>
              <a href="#">이용약관</a>
              <a href="#">개인정보처리방침</a>
              <a href="#">사업자정보</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 마음전하기. All rights reserved.</p>
          <p className="footer-tagline">한국의 정서를 담은 디지털 초대장 플랫폼</p>
        </div>
      </footer>
    </div>
  );
}
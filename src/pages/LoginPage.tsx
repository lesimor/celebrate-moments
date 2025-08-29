import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/LoginPage.css';

export function LoginPage() {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      if (isLogin) {
        await login({
          email: formData.email,
          password: formData.password
        });
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('비밀번호가 일치하지 않습니다.');
          setLoading(false);
          return;
        }
        
        if (formData.password.length < 6) {
          setError('비밀번호는 최소 6자 이상이어야 합니다.');
          setLoading(false);
          return;
        }
        
        await register({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phone: formData.phone
        });
      }
    } catch (err: any) {
      setError(err.message || '오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <motion.div
          className="login-box"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="login-header">
            <Link to="/" className="logo">마음전하기</Link>
            <p className="tagline">인생의 중요한 순간을 아름답게</p>
          </div>

          <div className="auth-tabs">
            <button
              className={`tab ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              로그인
            </button>
            <button
              className={`tab ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              회원가입
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && (
              <motion.div
                className="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  backgroundColor: '#fee',
                  border: '1px solid #fcc',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#c00'
                }}
              >
                <AlertCircle size={20} />
                <span>{error}</span>
              </motion.div>
            )}
            {!isLogin && (
              <motion.div
                className="form-field"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="input-group">
                  <User className="input-icon" />
                  <input
                    type="text"
                    placeholder="이름"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required={!isLogin}
                  />
                </div>
              </motion.div>
            )}

            <div className="form-field">
              <div className="input-group">
                <Mail className="input-icon" />
                <input
                  type="email"
                  placeholder="이메일"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <motion.div
                className="form-field"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="input-group">
                  <Phone className="input-icon" />
                  <input
                    type="tel"
                    placeholder="휴대폰 번호"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required={!isLogin}
                  />
                </div>
              </motion.div>
            )}

            <div className="form-field">
              <div className="input-group">
                <Lock className="input-icon" />
                <input
                  type="password"
                  placeholder="비밀번호"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <motion.div
                className="form-field"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="input-group">
                  <Lock className="input-icon" />
                  <input
                    type="password"
                    placeholder="비밀번호 확인"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required={!isLogin}
                  />
                </div>
              </motion.div>
            )}

            {isLogin && (
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>로그인 상태 유지</span>
                </label>
                <a href="#" className="forgot-password">비밀번호 찾기</a>
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? '처리 중...' : (isLogin ? '로그인' : '회원가입')}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>

          <div className="social-login">
            <p className="divider">또는</p>
            <div className="social-buttons">
              <button className="social-btn kakao" type="button" disabled>
                카카오로 시작하기 (준비중)
              </button>
              <button className="social-btn naver" type="button" disabled>
                네이버로 시작하기 (준비중)
              </button>
            </div>
          </div>

          <div className="auth-footer">
            {isLogin ? (
              <p>
                아직 회원이 아니신가요?{' '}
                <button onClick={() => setIsLogin(false)} className="link-btn">
                  회원가입
                </button>
              </p>
            ) : (
              <p>
                이미 계정이 있으신가요?{' '}
                <button onClick={() => setIsLogin(true)} className="link-btn">
                  로그인
                </button>
              </p>
            )}
          </div>
        </motion.div>
      </div>

      <div className="login-side">
        <motion.div
          className="side-content"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2>서비스 특징</h2>
          <ul className="features-list">
            <li>
              <span className="feature-icon">💌</span>
              <div>
                <h3>다양한 템플릿</h3>
                <p>청첩장과 부고장을 위한 아름다운 템플릿</p>
              </div>
            </li>
            <li>
              <span className="feature-icon">⏱️</span>
              <div>
                <h3>5분 완성</h3>
                <p>간편한 제작 과정으로 빠르게 완성</p>
              </div>
            </li>
            <li>
              <span className="feature-icon">📱</span>
              <div>
                <h3>모바일 최적화</h3>
                <p>모든 기기에서 완벽하게 표시</p>
              </div>
            </li>
            <li>
              <span className="feature-icon">🔒</span>
              <div>
                <h3>개인정보 보호</h3>
                <p>안전한 데이터 관리 시스템</p>
              </div>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
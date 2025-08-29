import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Save, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { EventService } from '../services/event.service';
import '../styles/EventForm.css';

export function WeddingForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    template: 'modern',
    groom: {
      name: '',
      fullName: '',
      father: '',
      mother: '',
      order: '장남'
    },
    bride: {
      name: '',
      fullName: '',
      father: '',
      mother: '',
      order: '장녀'
    },
    wedding: {
      date: '',
      time: '',
      venue: {
        name: '',
        hall: '',
        address: '',
        phone: ''
      }
    },
    message: {
      title: '우리 결혼합니다',
      content: ''
    },
    gallery: {
      mainImage: '',
      images: []
    },
    rsvp: {
      enabled: true,
      deadline: ''
    },
    bank: {
      groom: [],
      bride: []
    },
    contact: {
      groom: [],
      bride: []
    }
  });

  const handleInputChange = (path: string, value: any) => {
    const keys = path.split('.');
    const newFormData = { ...formData };
    let current: any = newFormData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setFormData(newFormData);
  };

  const handleNext = () => {
    if (step < 6) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handlePreview = () => {
    // TODO: Save to local storage or state management
    navigate('/wedding/preview');
  };

  const handleSave = async () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    setSaving(true);
    try {
      const title = `${formData.groom.name} ♥ ${formData.bride.name}`;
      
      if (id) {
        // Update existing event
        await EventService.updateEvent(id, {
          title,
          date: formData.wedding.date,
          data: formData,
          status: 'published'
        });
      } else {
        // Create new event
        await EventService.createEvent(user.id, {
          type: 'wedding',
          title,
          date: formData.wedding.date,
          data: formData,
          status: 'published'
        });
      }
      
      alert('청첩장이 저장되었습니다!');
      navigate('/my-events');
    } catch (error) {
      console.error('Failed to save event:', error);
      alert('저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="form-step">
            <h2>템플릿 선택</h2>
            <div className="template-grid">
              {['classic', 'modern', 'minimal', 'illustration'].map((style) => (
                <div
                  key={style}
                  className={`template-card ${formData.template === style ? 'selected' : ''}`}
                  onClick={() => handleInputChange('template', style)}
                >
                  <div className="template-preview">
                    <div className={`template-sample template-${style}`}></div>
                  </div>
                  <h3>{style === 'classic' ? '클래식' : 
                       style === 'modern' ? '모던' :
                       style === 'minimal' ? '미니멀' : '일러스트'}</h3>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="form-step">
            <h2>신랑 정보</h2>
            <div className="form-group">
              <label>이름 (한글)</label>
              <input
                type="text"
                value={formData.groom.name}
                onChange={(e) => handleInputChange('groom.name', e.target.value)}
                placeholder="예: 훈희"
              />
            </div>
            <div className="form-group">
              <label>성함 (전체)</label>
              <input
                type="text"
                value={formData.groom.fullName}
                onChange={(e) => handleInputChange('groom.fullName', e.target.value)}
                placeholder="예: 이훈희"
              />
            </div>
            <div className="form-group">
              <label>아버지 성함</label>
              <input
                type="text"
                value={formData.groom.father}
                onChange={(e) => handleInputChange('groom.father', e.target.value)}
                placeholder="예: 이재성"
              />
            </div>
            <div className="form-group">
              <label>어머니 성함</label>
              <input
                type="text"
                value={formData.groom.mother}
                onChange={(e) => handleInputChange('groom.mother', e.target.value)}
                placeholder="예: 김미영"
              />
            </div>
            <div className="form-group">
              <label>서열</label>
              <select
                value={formData.groom.order}
                onChange={(e) => handleInputChange('groom.order', e.target.value)}
              >
                <option value="장남">장남</option>
                <option value="차남">차남</option>
                <option value="삼남">삼남</option>
                <option value="독자">독자</option>
              </select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-step">
            <h2>신부 정보</h2>
            <div className="form-group">
              <label>이름 (한글)</label>
              <input
                type="text"
                value={formData.bride.name}
                onChange={(e) => handleInputChange('bride.name', e.target.value)}
                placeholder="예: 유리"
              />
            </div>
            <div className="form-group">
              <label>성함 (전체)</label>
              <input
                type="text"
                value={formData.bride.fullName}
                onChange={(e) => handleInputChange('bride.fullName', e.target.value)}
                placeholder="예: 박유리"
              />
            </div>
            <div className="form-group">
              <label>아버지 성함</label>
              <input
                type="text"
                value={formData.bride.father}
                onChange={(e) => handleInputChange('bride.father', e.target.value)}
                placeholder="예: 박상준"
              />
            </div>
            <div className="form-group">
              <label>어머니 성함</label>
              <input
                type="text"
                value={formData.bride.mother}
                onChange={(e) => handleInputChange('bride.mother', e.target.value)}
                placeholder="예: 최은정"
              />
            </div>
            <div className="form-group">
              <label>서열</label>
              <select
                value={formData.bride.order}
                onChange={(e) => handleInputChange('bride.order', e.target.value)}
              >
                <option value="장녀">장녀</option>
                <option value="차녀">차녀</option>
                <option value="삼녀">삼녀</option>
                <option value="독녀">독녀</option>
              </select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="form-step">
            <h2>결혼식 정보</h2>
            <div className="form-group">
              <label>날짜</label>
              <input
                type="date"
                value={formData.wedding.date}
                onChange={(e) => handleInputChange('wedding.date', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>시간</label>
              <input
                type="time"
                value={formData.wedding.time}
                onChange={(e) => handleInputChange('wedding.time', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>예식장 이름</label>
              <input
                type="text"
                value={formData.wedding.venue.name}
                onChange={(e) => handleInputChange('wedding.venue.name', e.target.value)}
                placeholder="예: 더베뉴G"
              />
            </div>
            <div className="form-group">
              <label>홀 이름</label>
              <input
                type="text"
                value={formData.wedding.venue.hall}
                onChange={(e) => handleInputChange('wedding.venue.hall', e.target.value)}
                placeholder="예: 그랜드볼룸"
              />
            </div>
            <div className="form-group">
              <label>주소</label>
              <input
                type="text"
                value={formData.wedding.venue.address}
                onChange={(e) => handleInputChange('wedding.venue.address', e.target.value)}
                placeholder="예: 서울특별시 강남구 테헤란로 87길 36"
              />
            </div>
            <div className="form-group">
              <label>전화번호</label>
              <input
                type="tel"
                value={formData.wedding.venue.phone}
                onChange={(e) => handleInputChange('wedding.venue.phone', e.target.value)}
                placeholder="예: 02-1234-5678"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="form-step">
            <h2>인사말</h2>
            <div className="form-group">
              <label>제목</label>
              <input
                type="text"
                value={formData.message.title}
                onChange={(e) => handleInputChange('message.title', e.target.value)}
                placeholder="예: 우리 결혼합니다"
              />
            </div>
            <div className="form-group">
              <label>내용</label>
              <textarea
                value={formData.message.content}
                onChange={(e) => handleInputChange('message.content', e.target.value)}
                placeholder="인사말을 입력하세요"
                rows={6}
              />
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.rsvp.enabled}
                  onChange={(e) => handleInputChange('rsvp.enabled', e.target.checked)}
                />
                참석 여부 확인 기능 사용
              </label>
            </div>
            {formData.rsvp.enabled && (
              <div className="form-group">
                <label>참석 확인 마감일</label>
                <input
                  type="date"
                  value={formData.rsvp.deadline}
                  onChange={(e) => handleInputChange('rsvp.deadline', e.target.value)}
                />
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <div className="form-step">
            <h2>갤러리</h2>
            <div className="form-group">
              <label>메인 이미지</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  // TODO: Handle file upload
                  console.log('Main image upload', e.target.files);
                }}
              />
            </div>
            <div className="form-group">
              <label>갤러리 이미지 (최대 10장)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  // TODO: Handle multiple file upload
                  console.log('Gallery images upload', e.target.files);
                }}
              />
            </div>
            <div className="image-preview-grid">
              {/* TODO: Show uploaded image previews */}
              <div className="image-placeholder">+</div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="event-form-page">
      <div className="form-container">
        <motion.div
          className="form-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>청첩장 만들기</h1>
          <div className="step-indicator">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <div
                key={s}
                className={`step-dot ${s === step ? 'active' : ''} ${s < step ? 'completed' : ''}`}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          key={step}
          className="form-content"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>

        <div className="form-actions">
          <button
            className="btn-secondary"
            onClick={handlePrev}
            disabled={step === 1}
          >
            <ArrowLeft size={20} />
            이전
          </button>
          
          <div className="action-group">
            <button className="btn-preview" onClick={handlePreview}>
              <Eye size={20} />
              미리보기
            </button>
            
            {step === 6 ? (
              <button className="btn-primary" onClick={handleSave} disabled={saving}>
                <Save size={20} />
                {saving ? '저장 중...' : '저장하기'}
              </button>
            ) : (
              <button className="btn-primary" onClick={handleNext}>
                다음
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
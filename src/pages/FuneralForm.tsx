import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Save, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { EventService } from '../services/event.service';
import '../styles/EventForm.css';

export function FuneralForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    template: 'traditional',
    deceased: {
      name: '',
      birthDate: '',
      deathDate: '',
      age: 0,
      religion: 'none' as 'buddhist' | 'christian' | 'catholic' | 'none'
    },
    chiefMourner: {
      name: '',
      relation: '',
      phone: ''
    },
    mourners: [] as Array<{
      name: string;
      relation: string;
      phone: string;
    }>,
    funeral: {
      mortuary: {
        name: '',
        hall: '',
        address: '',
        phone: ''
      },
      funeralDate: '',
      funeralTime: '',
      burialDate: '',
      burialTime: '',
      burialLocation: ''
    },
    message: {
      title: '삼가 고인의 명복을 빕니다',
      content: ''
    },
    bank: [] as Array<{
      bank: string;
      account: string;
      holder: string;
    }>
  });

  const handleInputChange = (path: string, value: any) => {
    const keys = path.split('.');
    const newFormData = { ...formData };
    let current: any = newFormData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    
    // Calculate age if birth and death dates are set
    if (path === 'deceased.birthDate' || path === 'deceased.deathDate') {
      if (newFormData.deceased.birthDate && newFormData.deceased.deathDate) {
        const birth = new Date(newFormData.deceased.birthDate);
        const death = new Date(newFormData.deceased.deathDate);
        const age = Math.floor((death.getTime() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
        newFormData.deceased.age = age;
      }
    }
    
    setFormData(newFormData);
  };

  const addMourner = () => {
    setFormData({
      ...formData,
      mourners: [...formData.mourners, { name: '', relation: '', phone: '' }]
    });
  };

  const updateMourner = (index: number, field: string, value: string) => {
    const newMourners = [...formData.mourners];
    newMourners[index] = { ...newMourners[index], [field]: value };
    setFormData({ ...formData, mourners: newMourners });
  };

  const removeMourner = (index: number) => {
    setFormData({
      ...formData,
      mourners: formData.mourners.filter((_, i) => i !== index)
    });
  };

  const addBankAccount = () => {
    setFormData({
      ...formData,
      bank: [...formData.bank, { bank: '', account: '', holder: '' }]
    });
  };

  const updateBankAccount = (index: number, field: string, value: string) => {
    const newBank = [...formData.bank];
    newBank[index] = { ...newBank[index], [field]: value };
    setFormData({ ...formData, bank: newBank });
  };

  const removeBankAccount = (index: number) => {
    setFormData({
      ...formData,
      bank: formData.bank.filter((_, i) => i !== index)
    });
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handlePreview = () => {
    // TODO: Save to local storage or state management
    navigate('/funeral/preview');
  };

  const handleSave = async () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    setSaving(true);
    try {
      const title = `故 ${formData.deceased.name}`;
      
      if (id) {
        // Update existing event
        await EventService.updateEvent(id, {
          title,
          date: formData.funeral.date,
          data: formData,
          status: 'published'
        });
      } else {
        // Create new event
        await EventService.createEvent(user.id, {
          type: 'funeral',
          title,
          date: formData.funeral.date,
          data: formData,
          status: 'published'
        });
      }
      
      alert('부고장이 저장되었습니다.');
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
            <h2>故人 정보</h2>
            <div className="form-group">
              <label>성함</label>
              <input
                type="text"
                value={formData.deceased.name}
                onChange={(e) => handleInputChange('deceased.name', e.target.value)}
                placeholder="예: 홍길동"
              />
            </div>
            <div className="form-group">
              <label>생년월일</label>
              <input
                type="date"
                value={formData.deceased.birthDate}
                onChange={(e) => handleInputChange('deceased.birthDate', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>별세일</label>
              <input
                type="date"
                value={formData.deceased.deathDate}
                onChange={(e) => handleInputChange('deceased.deathDate', e.target.value)}
              />
            </div>
            {formData.deceased.age > 0 && (
              <div className="form-group">
                <label>향년</label>
                <input
                  type="text"
                  value={`${formData.deceased.age}세`}
                  disabled
                />
              </div>
            )}
            <div className="form-group">
              <label>종교</label>
              <select
                value={formData.deceased.religion}
                onChange={(e) => handleInputChange('deceased.religion', e.target.value)}
              >
                <option value="none">무교</option>
                <option value="buddhist">불교</option>
                <option value="christian">기독교</option>
                <option value="catholic">천주교</option>
              </select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="form-step">
            <h2>상주 정보</h2>
            <div className="form-group">
              <label>상주 성함</label>
              <input
                type="text"
                value={formData.chiefMourner.name}
                onChange={(e) => handleInputChange('chiefMourner.name', e.target.value)}
                placeholder="예: 홍철수"
              />
            </div>
            <div className="form-group">
              <label>故人과의 관계</label>
              <input
                type="text"
                value={formData.chiefMourner.relation}
                onChange={(e) => handleInputChange('chiefMourner.relation', e.target.value)}
                placeholder="예: 장남"
              />
            </div>
            <div className="form-group">
              <label>연락처</label>
              <input
                type="tel"
                value={formData.chiefMourner.phone}
                onChange={(e) => handleInputChange('chiefMourner.phone', e.target.value)}
                placeholder="예: 010-1234-5678"
              />
            </div>
            
            <div className="form-section">
              <h3>기타 상주</h3>
              {formData.mourners.map((mourner, index) => (
                <div key={index} className="sub-form-group">
                  <input
                    type="text"
                    placeholder="성함"
                    value={mourner.name}
                    onChange={(e) => updateMourner(index, 'name', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="관계"
                    value={mourner.relation}
                    onChange={(e) => updateMourner(index, 'relation', e.target.value)}
                  />
                  <input
                    type="tel"
                    placeholder="연락처"
                    value={mourner.phone}
                    onChange={(e) => updateMourner(index, 'phone', e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeMourner(index)}
                  >
                    삭제
                  </button>
                </div>
              ))}
              <button type="button" className="btn-add" onClick={addMourner}>
                + 상주 추가
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-step">
            <h2>장례 정보</h2>
            <div className="form-group">
              <label>장례식장</label>
              <input
                type="text"
                value={formData.funeral.mortuary.name}
                onChange={(e) => handleInputChange('funeral.mortuary.name', e.target.value)}
                placeholder="예: 서울대학교병원 장례식장"
              />
            </div>
            <div className="form-group">
              <label>빈소</label>
              <input
                type="text"
                value={formData.funeral.mortuary.hall}
                onChange={(e) => handleInputChange('funeral.mortuary.hall', e.target.value)}
                placeholder="예: 특1호실"
              />
            </div>
            <div className="form-group">
              <label>주소</label>
              <input
                type="text"
                value={formData.funeral.mortuary.address}
                onChange={(e) => handleInputChange('funeral.mortuary.address', e.target.value)}
                placeholder="예: 서울특별시 종로구 대학로 101"
              />
            </div>
            <div className="form-group">
              <label>전화번호</label>
              <input
                type="tel"
                value={formData.funeral.mortuary.phone}
                onChange={(e) => handleInputChange('funeral.mortuary.phone', e.target.value)}
                placeholder="예: 02-1234-5678"
              />
            </div>
            <div className="form-group">
              <label>발인 날짜</label>
              <input
                type="date"
                value={formData.funeral.funeralDate}
                onChange={(e) => handleInputChange('funeral.funeralDate', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>발인 시간</label>
              <input
                type="time"
                value={formData.funeral.funeralTime}
                onChange={(e) => handleInputChange('funeral.funeralTime', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>장지</label>
              <input
                type="text"
                value={formData.funeral.burialLocation}
                onChange={(e) => handleInputChange('funeral.burialLocation', e.target.value)}
                placeholder="예: 서울 추모공원"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="form-step">
            <h2>부고 메시지</h2>
            <div className="form-group">
              <label>제목</label>
              <input
                type="text"
                value={formData.message.title}
                onChange={(e) => handleInputChange('message.title', e.target.value)}
                placeholder="예: 삼가 고인의 명복을 빕니다"
              />
            </div>
            <div className="form-group">
              <label>내용</label>
              <textarea
                value={formData.message.content}
                onChange={(e) => handleInputChange('message.content', e.target.value)}
                placeholder="부고 메시지를 입력하세요"
                rows={8}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="form-step">
            <h2>부의금 계좌</h2>
            <div className="form-section">
              {formData.bank.map((account, index) => (
                <div key={index} className="sub-form-group">
                  <input
                    type="text"
                    placeholder="은행명"
                    value={account.bank}
                    onChange={(e) => updateBankAccount(index, 'bank', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="계좌번호"
                    value={account.account}
                    onChange={(e) => updateBankAccount(index, 'account', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="예금주"
                    value={account.holder}
                    onChange={(e) => updateBankAccount(index, 'holder', e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeBankAccount(index)}
                  >
                    삭제
                  </button>
                </div>
              ))}
              <button type="button" className="btn-add" onClick={addBankAccount}>
                + 계좌 추가
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="event-form-page funeral-form">
      <div className="form-container">
        <motion.div
          className="form-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>부고장 만들기</h1>
          <div className="step-indicator">
            {[1, 2, 3, 4, 5].map((s) => (
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
            
            {step === 5 ? (
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
import { motion } from 'framer-motion';
import { MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';
import type { FuneralEvent } from '../../types/event';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

interface FuneralCondolencesProps {
  data: FuneralEvent;
}

export function FuneralCondolences({ data }: FuneralCondolencesProps) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [condolences, setCondolences] = useState(data.condolences || []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) {
      alert('이름과 메시지를 입력해주세요.');
      return;
    }
    
    const newCondolence = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString()
    };
    
    setCondolences([newCondolence, ...condolences]);
    setName('');
    setMessage('');
    
    // TODO: Save to backend
    alert('조문 메시지가 등록되었습니다.');
  };
  
  return (
    <section className="section-container funeral-condolences-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-header">
          <MessageSquare className="section-icon" />
          <h2 className="section-title">추모 메시지</h2>
        </div>
        
        <div className="condolence-form-container">
          <form className="condolence-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="condolence-input"
              placeholder="성함"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
            />
            <textarea
              className="condolence-textarea"
              placeholder="고인의 명복을 빌며 조문의 말씀을 남겨주세요."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={200}
              rows={3}
            />
            <button type="submit" className="condolence-submit">
              <Send size={16} />
              <span>메시지 남기기</span>
            </button>
          </form>
        </div>
        
        {condolences.length > 0 && (
          <div className="condolences-list">
            {condolences.map((condolence) => (
              <motion.div
                key={condolence.id}
                className="condolence-item"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="condolence-header">
                  <span className="condolence-name">{condolence.name}</span>
                  <span className="condolence-time">
                    {dayjs(condolence.createdAt).fromNow()}
                  </span>
                </div>
                <p className="condolence-message">{condolence.message}</p>
              </motion.div>
            ))}
          </div>
        )}
        
        {condolences.length === 0 && (
          <div className="no-condolences">
            <p>아직 추모 메시지가 없습니다.</p>
            <p>첫 번째로 따뜻한 메시지를 남겨주세요.</p>
          </div>
        )}
      </motion.div>
    </section>
  );
}
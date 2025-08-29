import { motion } from 'framer-motion';
import { Phone, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import type { FuneralEvent } from '../../types/event';

interface FuneralContactProps {
  data: FuneralEvent;
}

export function FuneralContact({ data }: FuneralContactProps) {
  const [isContactOpen, setIsContactOpen] = useState(true);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  
  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };
  
  const handleCopyAccount = async (account: string) => {
    try {
      await navigator.clipboard.writeText(account);
      alert('계좌번호가 복사되었습니다.');
    } catch (err) {
      alert('복사에 실패했습니다.');
    }
  };
  
  return (
    <section className="section-container funeral-contact-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-header">
          <Phone className="section-icon" />
          <h2 className="section-title">연락처</h2>
        </div>
        
        <div className="contact-groups">
          <div className="contact-group">
            <button 
              className="contact-header"
              onClick={() => setIsContactOpen(!isContactOpen)}
            >
              <span>상주 연락처</span>
              {isContactOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            {isContactOpen && (
              <motion.div 
                className="contact-content"
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <div className="contact-list">
                  <div className="contact-item">
                    <div className="contact-info">
                      <span className="contact-name">{data.chiefMourner.name}</span>
                      <span className="contact-relation">({data.chiefMourner.relation})</span>
                    </div>
                    <button 
                      className="contact-button"
                      onClick={() => handleCall(data.chiefMourner.phone)}
                    >
                      <Phone size={14} />
                      전화
                    </button>
                  </div>
                  
                  {data.mourners.map((mourner, index) => (
                    <div key={index} className="contact-item">
                      <div className="contact-info">
                        <span className="contact-name">{mourner.name}</span>
                        <span className="contact-relation">({mourner.relation})</span>
                      </div>
                      <button 
                        className="contact-button"
                        onClick={() => handleCall(mourner.phone)}
                      >
                        <Phone size={14} />
                        전화
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
          
          {data.bank && data.bank.length > 0 && (
            <div className="contact-group">
              <button 
                className="contact-header"
                onClick={() => setIsAccountOpen(!isAccountOpen)}
              >
                <span>부의금 계좌</span>
                {isAccountOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {isAccountOpen && (
                <motion.div 
                  className="contact-content"
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="account-list">
                    {data.bank.map((account, index) => (
                      <div key={index} className="account-item">
                        <div className="account-info">
                          <span className="account-bank">{account.bank}</span>
                          <span className="account-number">{account.account}</span>
                          <span className="account-holder">{account.holder}</span>
                        </div>
                        <button 
                          className="copy-button"
                          onClick={() => handleCopyAccount(account.account)}
                        >
                          <Copy size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
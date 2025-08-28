import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { WeddingData } from '../types/wedding'
import { Phone, ChevronDown, Copy, Check } from 'lucide-react'

interface ContactProps {
  data: WeddingData
}

export const Contact = ({ data }: ContactProps) => {
  const [activeSection, setActiveSection] = useState<'groom' | 'bride' | null>(null)
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null)
  
  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`
  }
  
  const handleCopyAccount = async (account: string) => {
    try {
      await navigator.clipboard.writeText(account.replace(/-/g, ''))
      setCopiedAccount(account)
      setTimeout(() => setCopiedAccount(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }
  
  const toggleSection = (section: 'groom' | 'bride') => {
    setActiveSection(activeSection === section ? null : section)
  }
  
  return (
    <section className="contact-section">
      <motion.div 
        className="section-container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-header">
          <Phone className="section-icon" />
          <h2 className="section-title">Contact & Account</h2>
        </div>
        
        {/* 신랑측 */}
        <div className="contact-group">
          <motion.button
            className="contact-header"
            onClick={() => toggleSection('groom')}
            whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
            whileTap={{ scale: 0.98 }}
          >
            <span>신랑측</span>
            <motion.div
              animate={{ rotate: activeSection === 'groom' ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown />
            </motion.div>
          </motion.button>
          
          <AnimatePresence>
            {activeSection === 'groom' && (
              <motion.div
                className="contact-content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="contact-list">
                  <h4>연락처</h4>
                  {data.contact.groom.map((contact, index) => (
                    <div key={index} className="contact-item">
                      <span className="contact-name">
                        {contact.name} ({contact.relation})
                      </span>
                      <button
                        className="contact-button"
                        onClick={() => handleCall(contact.phone)}
                      >
                        <Phone size={16} />
                        전화
                      </button>
                    </div>
                  ))}
                </div>
                
                {data.bank?.groom && (
                  <div className="account-list">
                    <h4>계좌번호</h4>
                    {data.bank.groom.map((account, index) => (
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
                          {copiedAccount === account.account ? (
                            <Check size={16} />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* 신부측 */}
        <div className="contact-group">
          <motion.button
            className="contact-header"
            onClick={() => toggleSection('bride')}
            whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
            whileTap={{ scale: 0.98 }}
          >
            <span>신부측</span>
            <motion.div
              animate={{ rotate: activeSection === 'bride' ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown />
            </motion.div>
          </motion.button>
          
          <AnimatePresence>
            {activeSection === 'bride' && (
              <motion.div
                className="contact-content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="contact-list">
                  <h4>연락처</h4>
                  {data.contact.bride.map((contact, index) => (
                    <div key={index} className="contact-item">
                      <span className="contact-name">
                        {contact.name} ({contact.relation})
                      </span>
                      <button
                        className="contact-button"
                        onClick={() => handleCall(contact.phone)}
                      >
                        <Phone size={16} />
                        전화
                      </button>
                    </div>
                  ))}
                </div>
                
                {data.bank?.bride && (
                  <div className="account-list">
                    <h4>계좌번호</h4>
                    {data.bank.bride.map((account, index) => (
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
                          {copiedAccount === account.account ? (
                            <Check size={16} />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  )
}
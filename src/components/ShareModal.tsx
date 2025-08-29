import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Download, MessageCircle } from 'lucide-react';
import QRCode from 'qrcode';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LineShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LineIcon
} from 'react-share';
import '../styles/ShareModal.css';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  type: 'wedding' | 'funeral';
}

export function ShareModal({ isOpen, onClose, title, url, type }: ShareModalProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const fullUrl = `${window.location.origin}${url}`;
  
  useEffect(() => {
    if (isOpen) {
      // Generate QR Code
      QRCode.toDataURL(fullUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: type === 'wedding' ? '#ff6b6b' : '#2c3e50',
          light: '#ffffff'
        }
      }).then(setQrCodeUrl);
    }
  }, [isOpen, fullUrl, type]);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert('URL 복사에 실패했습니다.');
    }
  };

  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.download = `qr-code-${type}.png`;
    link.href = qrCodeUrl;
    link.click();
  };

  const handleKakaoShare = () => {
    // @ts-ignore
    if (window.Kakao) {
      // @ts-ignore
      window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: title,
          description: type === 'wedding' ? 
            '저희 결혼식에 초대합니다' : 
            '삼가 고인의 명복을 빕니다',
          imageUrl: qrCodeUrl,
          link: {
            mobileWebUrl: fullUrl,
            webUrl: fullUrl,
          },
        },
        buttons: [
          {
            title: '자세히 보기',
            link: {
              mobileWebUrl: fullUrl,
              webUrl: fullUrl,
            },
          },
        ],
      });
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="share-modal-overlay" onClick={onClose}>
        <motion.div
          className="share-modal"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="share-header">
            <h2>공유하기</h2>
            <button className="close-btn" onClick={onClose}>
              <X size={24} />
            </button>
          </div>

          <div className="share-content">
            <div className="qr-section">
              <h3>QR 코드</h3>
              {qrCodeUrl && (
                <>
                  <img src={qrCodeUrl} alt="QR Code" className="qr-code" />
                  <button className="download-btn" onClick={handleDownloadQR}>
                    <Download size={16} />
                    QR 코드 저장
                  </button>
                </>
              )}
            </div>

            <div className="url-section">
              <h3>링크 복사</h3>
              <div className="url-input-group">
                <input
                  type="text"
                  value={fullUrl}
                  readOnly
                  className="url-input"
                />
                <button
                  className={`copy-btn ${copied ? 'copied' : ''}`}
                  onClick={handleCopyUrl}
                >
                  <Copy size={16} />
                  {copied ? '복사됨!' : '복사'}
                </button>
              </div>
            </div>

            <div className="social-section">
              <h3>SNS 공유</h3>
              <div className="social-buttons">
                <button className="social-share-btn kakao" onClick={handleKakaoShare}>
                  <MessageCircle size={24} />
                  <span>카카오톡</span>
                </button>
                
                <FacebookShareButton url={fullUrl}>
                  <div className="social-share-btn facebook">
                    <FacebookIcon size={24} round />
                    <span>페이스북</span>
                  </div>
                </FacebookShareButton>

                <TwitterShareButton url={fullUrl} title={title}>
                  <div className="social-share-btn twitter">
                    <TwitterIcon size={24} round />
                    <span>트위터</span>
                  </div>
                </TwitterShareButton>

                <WhatsappShareButton url={fullUrl} title={title}>
                  <div className="social-share-btn whatsapp">
                    <WhatsappIcon size={24} round />
                    <span>왓츠앱</span>
                  </div>
                </WhatsappShareButton>

                <LineShareButton url={fullUrl} title={title}>
                  <div className="social-share-btn line">
                    <LineIcon size={24} round />
                    <span>라인</span>
                  </div>
                </LineShareButton>
              </div>
            </div>

            <div className="sms-section">
              <h3>문자 메시지</h3>
              <div className="sms-template">
                <textarea
                  readOnly
                  value={
                    type === 'wedding'
                      ? `💌 결혼식 초대\n\n${title}\n\n일시: [날짜 시간]\n장소: [예식장 정보]\n\n자세한 내용은 아래 링크를 확인해주세요.\n${fullUrl}`
                      : `🕊️ 부고 안내\n\n${title}\n\n발인: [날짜 시간]\n장소: [장례식장 정보]\n\n자세한 내용은 아래 링크를 확인해주세요.\n${fullUrl}`
                  }
                  className="sms-text"
                />
                <button
                  className="sms-copy-btn"
                  onClick={() => {
                    const text = type === 'wedding'
                      ? `💌 결혼식 초대\n\n${title}\n\n일시: [날짜 시간]\n장소: [예식장 정보]\n\n자세한 내용은 아래 링크를 확인해주세요.\n${fullUrl}`
                      : `🕊️ 부고 안내\n\n${title}\n\n발인: [날짜 시간]\n장소: [장례식장 정보]\n\n자세한 내용은 아래 링크를 확인해주세요.\n${fullUrl}`;
                    navigator.clipboard.writeText(text);
                    alert('문자 메시지가 복사되었습니다.');
                  }}
                >
                  <Copy size={16} />
                  메시지 복사
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
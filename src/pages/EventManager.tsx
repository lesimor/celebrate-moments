import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Eye, Edit, Trash2, Copy, Share2, BarChart, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { EventService } from '../services/event.service';
import type { UserEvent } from '../types';
import '../styles/EventManager.css';


export function EventManager() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [events, setEvents] = useState<UserEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserEvents();
  }, [user]);

  const loadUserEvents = async () => {
    if (!user) return;
    
    try {
      const userEvents = await EventService.getUserEvents(user.id);
      setEvents(userEvents);
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (event: UserEvent) => {
    navigate(`/${event.type}/${event.url}`);
  };

  const handleEdit = (event: UserEvent) => {
    navigate(`/${event.type}/edit/${event.id}`);
  };

  const handleDelete = async (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      try {
        await EventService.deleteEvent(id);
        setEvents(events.filter(e => e.id !== id));
      } catch (error) {
        console.error('Failed to delete event:', error);
        alert('삭제에 실패했습니다.');
      }
    }
  };

  const handleCopyUrl = (url: string) => {
    const fullUrl = `${window.location.origin}/${url}`;
    navigator.clipboard.writeText(fullUrl);
    alert('URL이 복사되었습니다.');
  };

  const handleShare = (event: UserEvent) => {
    const fullUrl = `${window.location.origin}/${event.type}/${event.url}`;
    if (navigator.share) {
      navigator.share({
        title: event.title,
        url: fullUrl
      });
    } else {
      handleCopyUrl(`${event.type}/${event.url}`);
    }
  };

  return (
    <div className="event-manager-page">
      <div className="manager-container">
        <motion.div
          className="manager-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>내 초대장 관리</h1>
          <div className="header-actions">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '16px' }}>
              <User size={18} />
              <span>{user?.name}님</span>
            </div>
            <Link to="/" className="btn-home">홈으로</Link>
            <button className="btn-logout" onClick={logout}>
              <LogOut size={18} style={{ marginRight: '4px' }} />
              로그아웃</button>
          </div>
        </motion.div>

        <div className="create-actions">
          <Link to="/wedding/new" className="create-card wedding">
            <Plus size={32} />
            <span>청첩장 만들기</span>
          </Link>
          <Link to="/funeral/new" className="create-card funeral">
            <Plus size={32} />
            <span>부고장 만들기</span>
          </Link>
        </div>

        <div className="events-section">
          <h2>내 초대장 목록</h2>
          
          {loading ? (
            <div className="no-events">
              <p>로딩 중...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="no-events">
              <p>아직 만든 초대장이 없습니다.</p>
              <p>위의 버튼을 클릭하여 첫 초대장을 만들어보세요!</p>
            </div>
          ) : (
            <div className="events-grid">
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  className={`event-card ${event.type}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="event-header">
                    <span className={`event-type ${event.type}`}>
                      {event.type === 'wedding' ? '청첩장' : '부고장'}
                    </span>
                    <span className={`event-status ${event.status}`}>
                      {event.status === 'published' ? '발행됨' : '임시저장'}
                    </span>
                  </div>
                  
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-date">{event.date || '날짜 미정'}</p>
                  
                  <div className="event-stats">
                    <div className="stat-item">
                      <BarChart size={16} />
                      <span>조회수 {event.views}</span>
                    </div>
                    <div className="stat-item">
                      <span>생성일: {new Date(event.createdAt).toLocaleDateString('ko-KR')}</span>
                    </div>
                  </div>
                  
                  <div className="event-actions">
                    <button
                      className="action-btn"
                      onClick={() => handleView(event)}
                      title="보기"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => handleEdit(event)}
                      title="수정"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => handleCopyUrl(event.url)}
                      title="URL 복사"
                    >
                      <Copy size={18} />
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => handleShare(event)}
                      title="공유"
                    >
                      <Share2 size={18} />
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDelete(event.id)}
                      title="삭제"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="subscription-info">
          <div className="subscription-card">
            <h3>현재 플랜: 무료</h3>
            <ul>
              <li>기본 템플릿</li>
              <li>30일 호스팅</li>
              <li>기본 기능</li>
            </ul>
            <button className="upgrade-btn">프리미엄 업그레이드</button>
          </div>
        </div>
      </div>
    </div>
  );
}